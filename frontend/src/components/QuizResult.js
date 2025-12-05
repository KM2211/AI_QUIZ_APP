import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

const QuizResult = ({ quiz, answers, onBack }) => {
  const totalCorrect = quiz.questions.reduce((acc, q, idx) => {
    const userKey = answers[idx]?.answer;
    return acc + (userKey === q.answer ? 1 : 0);
  }, 0);

  return (
    <div style={{ maxWidth: 500, margin: "60px auto", textAlign: "center" }}>
      <Card>
        <Title level={3}>Quiz Completed!</Title>

        <Text strong style={{ fontSize: "18px" }}>
          You got {totalCorrect} out of {quiz.questions.length} correct 🎉
        </Text>

        <div style={{ marginTop: 30 }}>
          <Button type="primary" onClick={onBack}>
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizResult;
