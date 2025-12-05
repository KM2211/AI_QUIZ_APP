import React, { useState } from "react";
import { Button, Select, Space, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const QuizSelector = ({ onStart }) => {
  const [language, setLanguage] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Title level={3}>Lets Play</Title>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Select
          placeholder="Select Language"
          value={language}
          onChange={setLanguage}
          style={{ width: "100%" }}
        >
          <Option value="Python">Python</Option>
          <Option value="JavaScript">JavaScript</Option>
          <Option value="System Design">System Design</Option>
          <Option value="React JS">React JS</Option>
          <Option value="Djnago">Django</Option>
        </Select>

        <Select
          placeholder="Select Difficulty"
          value={difficulty}
          onChange={setDifficulty}
          style={{ width: "100%" }}
        >
          <Option value="Easy">Easy</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Hard">Hard</Option>
          <Option value="Expert">Expert</Option>
        </Select>

        <Button
          type="primary"
          block
          disabled={!language || !difficulty}
          onClick={() => onStart(language, difficulty)}
        >
          Start Quiz
        </Button>
      </Space>
    </div>
  );
};

export default QuizSelector;
