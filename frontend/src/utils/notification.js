const notification = (msg) => {
  const notification = document.getElementsByClassName("notification")[0];

  notification.style.display = "block";
  notification.getElementsByClassName("notification-text")[0].innerHTML = msg
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
};

export default notification;
