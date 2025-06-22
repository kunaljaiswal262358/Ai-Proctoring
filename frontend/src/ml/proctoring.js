let animationId = null;
let stream = null;

export const loadModelAndCamera = async (stopExam) => {
  const notification = document.getElementsByClassName("notification")[0];
  //Model loading
  try {
    const tf = window.tf;
    const faceDetection = window.faceDetection;

    await tf.setBackend("webgl");
    await tf.ready();

    const detector = await faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      {
        runtime: "tfjs",
        maxFaces: 5,
        modelType: "full",
      }
    );

    let stopped = false;
    let notOneFaceTime = 0;

    // For stopping test
    const stopTest = (stopExam) => {
      if (stopped) return;

      if (stopExam) stopExam();
      notOneFaceTime = 0;
      alert("You are eliminated now!");

      stopCameraAndProctoring();
      window.location.href = "/exams";
      stopped = true;
    };

    // Media stream loading
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
      console.error("Camera access denied:", err);
      notification.getElementsByClassName("notification-text")[0].innerHTML =
        "Camera access is required for proctoring. Please enable camera permissions.";
      notification.style.display = "block";
      setTimeout(() => {
        notification.style.display = "none";
      }, 3000);
      stopTest(stopExam);
      return false;
    }

    const video = document.createElement("video");
    video.srcObject = stream;
    video.width = 640;
    video.height = 480;

    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
    });

    //Algo for proctoring
    let lookAwayTimer = null;
    let startTime = null;
    let awayTime = 0;
    let lookAwayResetTimer = null;
    let warningIssued = false;
    let multipleFacesWarningIssued = false;
    

    const detect = async () => {
      const faces = await detector.estimateFaces(video);

      if (faces.length > 1) {
        if (!multipleFacesWarningIssued) {
          notOneFaceTime++;
          startTime = Date.now();
          multipleFacesWarningIssued = true;
          if (notOneFaceTime > 4) stopTest(stopExam);
          else
            console.log(
              `${notOneFaceTime}"- Warning: Only one student should be in the frame during the exam!"`
            );
          notification.getElementsByClassName(
            "notification-text"
          )[0].innerHTML =
            "Only one student should be in the frame during the exam!";
          notification.style.display = "block";
          setTimeout(() => {
            notification.style.display = "none";
          }, 3000);
        } else {
          console.log((Date.now() - startTime) / 1000);
          if ((Date.now() - startTime) / 1000 > 10) {
            stopTest(stopExam);
            clearTimeout(lookAwayTimer);
            lookAwayTimer = null;
            startTime = null;
          }
        }
      } else {
        multipleFacesWarningIssued = false;
      }

      if (faces.length === 0) {
        if (!lookAwayTimer) {
          startTime = Date.now();
          lookAwayTimer = setTimeout(() => {
            if (!warningIssued) {
              notOneFaceTime++;
              warningIssued = true;
              if (notOneFaceTime > 4) stopTest(stopExam);
              else {
                console.log(
                  `${notOneFaceTime}"- Warning: Please keep your face visible during the exam!"`
                );

                notification.getElementsByClassName(
                  "notification-text"
                )[0].innerHTML =
                  "Please keep your face visible during the exam!";
                notification.style.display = "block";
                setTimeout(() => {
                  notification.style.display = "none";
                }, 1000);
              }
            }
          }, 3000);
        } else {
          console.log((Date.now() - startTime) / 1000);
          if ((Date.now() - startTime) / 1000 > 10) {
            stopTest();
            clearTimeout(lookAwayTimer);
            lookAwayTimer = null;
            startTime = null;
          }
        }
      } else {
        if (lookAwayTimer) {
          clearTimeout(lookAwayTimer);
          lookAwayTimer = null;
        }

        if (lookAwayResetTimer) {
          clearTimeout(lookAwayResetTimer);
          lookAwayResetTimer = null;
        }

        warningIssued = false;
        checkHeadPose(faces[0]);
      }
    };

    let startAwayTime;
    function checkHeadPose(face) {
      if (!face.keypoints) return;

      const nose = face.keypoints.find((kp) => kp.name === "noseTip");
      if (nose) {
        const boxWidth = face.box.width;
        const noseXRelative = (nose.x - face.box.xMin) / boxWidth;

        if (noseXRelative < 0.4 || noseXRelative > 0.6) {
          notification.getElementsByClassName(
            "notification-text"
          )[0].innerHTML =
            "You are looking away, chances are you can be eliminate!";
          notification.style.display = "block";
          if (!startAwayTime) startAwayTime = Date.now();
          if (startAwayTime) {
            if ((Date.now() - startAwayTime) / 1000 > 15) {
              stopTest();
              console.log("djkd");
            }
          }
        } else if (startAwayTime) {
          notification.style.display = "none";
          awayTime = awayTime + (Date.now() - startAwayTime) / 1000;
          startAwayTime = null;
          console.log(awayTime);
          if (awayTime > 15) {
            stopTest();
          }
        }
      }
    }

    //Start Proctoring
    function processVideo() {
      console.log("Proctoring Started");
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        detect();
      }
      animationId = requestAnimationFrame(processVideo);
    }

    processVideo();
    return true;
  } catch (err) {
    console.log("Error loading model or camera: ", err);
    return false;
  }
};

export function stopCameraAndProctoring() {
  console.log("Proctoring Stopped.");
  cancelAnimationFrame(animationId);
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
}
