import React from "react";
import { Card, Radio, Space, Typography } from "antd";

const { Title } = Typography;

const Question = ({ question, selectedAnswer, onSelect }) => {
  return (
    <Card style={{ marginBottom: 40 , display: "flex",}}>
      <Title level={5}>{question.question}</Title>
      <Radio.Group onChange={(e) => onSelect(e.target.value)} value={selectedAnswer}>
        <Space orientation="vertical">
          {question.options.map((opt, idx) => (
            <Radio key={idx} value={opt}>
               {opt}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  );
};

export default Question;
