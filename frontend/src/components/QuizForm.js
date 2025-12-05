import React, { useState } from "react";
import { Card, Typography, Button, Space } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const QuizForm = ({ quiz, setAnswers, answers, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const options = currentQuestion.options;

  const handleSelect = (key) => {
    setSelectedKey(key);
    setShowFeedback(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = { answer: key };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setSelectedKey(null);
    setShowFeedback(false);

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish(); // go to results page
    }
  };

  const isCorrect = selectedKey === currentQuestion.answer;
  const correctKey = currentQuestion.answer;
  const correctValue = currentQuestion.options[correctKey];
  const selectedValue = currentQuestion.options[selectedKey];

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <Card>
        <Title level={4}>{currentQuestion.question}</Title>

        <Space direction="vertical" style={{ width: "100%" }}>
          {Object.entries(options).map(([key, value]) => (
            <Button
              key={key}
              block
              disabled={showFeedback}
              type={
                selectedKey === key
                  ? isCorrect
                    ? "primary"
                    : "dashed"
                  : "default"
              }
              onClick={() => handleSelect(key)}
            >
              {key}. {value}
            </Button>
          ))}

          {/* FEEDBACK BLOCK */}
          {showFeedback && (
            <div style={{ marginTop: 20 }}>
              {isCorrect ? (
                <Text type="success">
                  <CheckCircleOutlined /> Correct!
                </Text>
              ) : (
                <Text type="danger">
                  <CloseCircleOutlined /> Wrong!
                </Text>
              )}

              {/* Show user's selected answer */}
              <Paragraph style={{ marginTop: 8 }}>
                <Text strong>Your answer:</Text>{" "}
                {selectedKey ? `${selectedKey}. ${selectedValue}` : "Not answered"}
              </Paragraph>

              {/* Always show correct answer */}
              <Paragraph>
                <Text strong>Correct answer:</Text>{" "}
                {correctKey}. {correctValue}
              </Paragraph>

              {/* Explanation follows Results component style */}
              {currentQuestion.explanation && (
                <Paragraph>
                  <Text strong>Explanation:</Text>{" "}
                  {`${correctKey}. ${currentQuestion.explanation}`}
                </Paragraph>
              )}

              <Button
                type="primary"
                style={{ marginTop: 10 }}
                onClick={handleNext}
              >
                {currentIndex + 1 === quiz.questions.length ? "Finish Quiz" : "Next"}
              </Button>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default QuizForm;