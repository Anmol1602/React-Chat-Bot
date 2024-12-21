import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import LearningOption from "../Component/LearningOption";
import LinkList from "../Component/LinkList";

const config = {
  botName: "ReactBot",
  initialMessages: [
    createChatBotMessage(`These are the topics on which I can provide you with resources?`, {
      widget: "learningOptions",
    }),
  ],
  customComponents: {
    botMessageBox: (props) => <div className="bot-message-box">{props.children}</div>,
    userInput: () => null, // Disable input box if needed
    header: () => (
      <div style={{ fontSize: "20px", fontWeight: "bold", padding: "10px", backgroundColor: "#376B7E", color: "#fff" }}>
        Chat with Our AI Bot
      </div>
    ),
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOption {...props} />,
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Introduction to JS",
            url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Mozilla JS Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },
    {
      widgetName: "dataVisualizationLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Introduction to Data Visualization",
            url: "https://www.ibm.com/topics/data-visualization",
            id: 1,
          },
          {
            text: "Data Preprocessing, Analysis & Visualization",
            url: "https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_data_preprocessing_analysis_visualization.htm",
            id: 2,
          },
          {
            text: "Data Visualization Tools",
            url: "https://www.javatpoint.com/data-visualization-tools",
            id: 3,
          },
        ],
      },
    },
  ],
};

export default config;

