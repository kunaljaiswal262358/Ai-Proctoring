export const getAccuracy = (exams) => {
  let correctCount = 0;
  let attemptedCount = 0;

  for (let exam of exams) {
    const correctAnswers = exam.correctAnswerSheet || {};
    const attemptAnswers = exam.userAnswerSheet || {};

    for (const key in correctAnswers) {
      const correct = correctAnswers[key];
      const attempt = attemptAnswers[key];

      if (attempt !== null && attempt !== undefined) {
        attemptedCount++;
        if (correct === attempt) correctCount++;
      }
    }
  }

  const accuracy = attemptedCount
    ? Math.round((correctCount / attemptedCount) * 100)
    : 0;
  return accuracy;
};

export const getScore = (exams) => {
  let correctCount = 0;
  let total = 0;

  for (let exam of exams) {
    const correctAnswers = exam.correctAnswerSheet || {};
    const attemptAnswers = exam.userAnswerSheet || {};

    for (const key in correctAnswers) {
      const correct = correctAnswers[key];
      const attempt = attemptAnswers[key];

      total++;
      if (attempt !== null && attempt !== undefined) {
        if (correct === attempt) correctCount++;
      }
    }
  }

  const score = Math.round((correctCount / total) * 100);
  return score || 0;
};
