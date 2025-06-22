import { useEffect, useState } from "react";
import notification from "../utils/notification.js";
import { ExamsList } from "../components/ExamsList";
import { ExamForm } from "../components/ExamForm";
import { QuestionsList } from "../components/QuestionList";
import { QuestionFormModal } from "../components/QuestionFormModel";
import axiosInstance from "../api/axiosInstance";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";

const AdminDashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("exams");
  const [update, setUpdate] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    category: "",
    difficulty: "Medium",
  });
  const [newExam, setNewExam] = useState({
    title: "",
    description: "",
    duration: 60,
    questions: [],
    passingScore: 50,
  });
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  const handleAddQuestion = async (question) => {
    if (!validateQuestion(question)) return null;
    resetQuestionForm();

    const addedQuestion = {
      ...question,
      _id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const questionsClone = questions;
    try {
      setQuestions([...questions, addedQuestion]);
      const { data: savedQuestion } = await axiosInstance.post(
        process.env.REACT_APP_BACKEND_API + "/questions",
        question
      );

      replaceQuestion(
        [...questions, addedQuestion],
        addedQuestion,
        savedQuestion
      );
      return savedQuestion;
    } catch (err) {
      setQuestions(questionsClone);
      console.log(err);
      notification(err.response.data);
    }

    return null;
  };

  const handleAddAndIncludeQuestion = async (question) => {
    const addedQuestion = await handleAddQuestion(question);
    if (addedQuestion) {
      handleAddQuestionToExam(addedQuestion._id);
    }
  };

  const handleAddQuestionToExam = (questionId) => {
    if (!newExam.questions.includes(questionId)) {
      setNewExam({
        ...newExam,
        questions: [...newExam.questions, questionId],
      });
    }
  };

  const handleUpdateQuestion = async (id, question) => {
    if (!validateQuestion(question)) return null;
    resetQuestionForm();

    const questionsClone = questions;
    try {
      const updatedQuestion = questionsClone.map((q) => {
        if (q._id === id) return { ...q, ...question };

        return q;
      });
      setQuestions(updatedQuestion);

      await axiosInstance.put("/questions/" + id,
        question
      );
    } catch (err) {
      setQuestions(questionsClone);
      console.log(err);
      notification(err.response.data);
    }
  };

  const handleRemoveQuestionFromExam = (questionId) => {
    setNewExam({
      ...newExam,
      questions: newExam.questions.filter((id) => id !== questionId),
    });
  };

  const handleDeleteQuestion = async (question) => {
    const questionsClone = questions;
    const filtered = questions.filter((q) => q._id !== question._id);
    setQuestions(filtered);

    try {
      await axiosInstance.delete("/questions/" + question._id
      );
      fetchQuestions();
      fetchExams();
    } catch (err) {
      setQuestions(questionsClone);
      console.log(err);
      notification(err.response.data);
    }
  };

  function replaceQuestion(questions, oldQ, newQ) {
    const index = questions.findIndex((q) => q._id === oldQ._id);
    if (index !== -1) {
      const copy = [...questions];
      copy[index] = newQ;
      setQuestions(copy);
    }
  }

  function validateQuestion(question) {
    if (question.text.trim() && question.options.every((opt) => opt.trim()))
      return true;

    return false;
  }

  function resetQuestionForm() {
    setShowAddQuestionModal(false);
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      category: "",
      difficulty: "Medium",
    });
    setUpdate(false);
  }

  const handleCreateExam = async (exam) => {
    if (!validateExam(exam)) return null;
    resetExamForm();

    const copy = [...exams];
    try {
      setExams([
        ...exams,
        {
          ...exam,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ]);
      const { data: newExam } = await axiosInstance.post("/exams", exam);
      setExams([...copy, newExam]);
    } catch (err) {
      setExams(copy);
      console.log(err);
      notification(err.response.data);
    }
  };

  const handleEditExam = async (id, exam) => {
    if (!validateExam(exam)) return null;
    resetExamForm();

    const copy = [...exams];
    try {
      const updated = copy.map((e) => {
        if (e._id === id) return { ...e, ...exam };

        return e;
      });
      setExams(updated);

      await axiosInstance.put("/exams/" + id, exam);
    } catch (err) {
      setExams(copy);
      console.log(err);
      notification(err.response.data);
    }
  };

  const handleDeleteExam = async (exam) => {
    const copy = exams;
    try {
      const filtered = exams.filter((e) => e._id !== exam._id);
      setExams(filtered);
      await axiosInstance.delete("/exams/" + exam._id
      );
    } catch (err) {
      setExams(copy);
      console.log(err);
      notification(err.response.data);
    }
  };

  function validateExam(exam) {
    return exam.title.trim() && exam.questions.length > 0;
  }

  function resetExamForm() {
    setNewExam({
      title: "",
      description: "",
      duration: 60,
      questions: [],
      passingScore: 50,
    });
    setActiveTab("exams");
    setUpdate(false);
  }

  const getQuestionById = (id) => {
    return questions.find((q) => q._id === id);
  };

  const fetchQuestions = () => {
    axiosInstance
      .get(process.env.REACT_APP_BACKEND_API + "/questions")
      .then(({ data: questions }) => {
        setQuestions(questions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchExams = async () => {
    try {
      const { data: exams } = await axiosInstance.get(
        process.env.REACT_APP_BACKEND_API + "/exams"
      );
      setExams(exams);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchExams();
  }, []);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileSidebarOpen]);

  return (
    <>
      <Routes>
        <Route element={<AdminLayout exams={exams} questions={questions} />}>
          <Route
            path="exams"
            element={
              <ExamsList
                exams={exams}
                handleDeleteExam={handleDeleteExam}
                setNewExam={setNewExam}
                setUpdate={setUpdate}
              />
            }
          />
          <Route
            path="create-exam"
            element={
              <ExamForm
                newExam={newExam}
                setNewExam={setNewExam}
                questions={questions}
                handleCreateExam={handleCreateExam}
                handleEditExam={handleEditExam}
                setShowAddQuestionModal={setShowAddQuestionModal}
                handleAddQuestionToExam={handleAddQuestionToExam}
                handleRemoveQuestionFromExam={handleRemoveQuestionFromExam}
                getQuestionById={getQuestionById}
                update={update}
                resetExamForm={resetExamForm}
              />
            }
          />

          <Route
            path="questions"
            element={
              <QuestionsList
                questions={questions}
                setShowAddQuestionModal={setShowAddQuestionModal}
                setNewQuestion={setNewQuestion}
                setUpdate={setUpdate}
                handleDeleteQuestion={handleDeleteQuestion}
              />
            }
          />
        </Route>
      </Routes>
      <QuestionFormModal
        showAddQuestionModal={showAddQuestionModal}
        setShowAddQuestionModal={setShowAddQuestionModal}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        handleAddQuestion={handleAddQuestion}
        handleAddAndIncludeQuestion={handleAddAndIncludeQuestion}
        handleUpdateQuestion={handleUpdateQuestion}
        activeTab={activeTab}
        update={update}
        resetQuestionForm={resetQuestionForm}
      />
    </>
  );
};

export default AdminDashboard;
