class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleJavascriptList = () => {
    // Step 1: Show typing indicator first
    const typingIndicator = this.createChatBotMessage("Typing...", { loading: true });
    this.updateChatbotState(typingIndicator);

    // Step 2: Simulate a delay (typing effect)
    setTimeout(() => {
      // Step 3: Remove typing indicator and add the real message with resources
      const message = this.createChatBotMessage(
        "📚 Fantastic! Here are some great resources for learning JavaScript:",
        {
          widget: "javascriptLinks", // Show JavaScript links widget
        }
      );

      // Step 4: Update state by replacing the typing indicator with the actual message
      this.updateChatbotState(message);
      // Step 5:Remove the typing indicator
      this.setState((prevState) => ({
        ...prevState,
        messages: prevState.messages.filter((msg) => msg.id !== typingIndicator.id),
      }));
    }, 1000); // 1 second delay to simulate typing
  };

  handleDataVisualizationList = () => {
    // Step 1: Show typing indicator first
    const typingIndicator = this.createChatBotMessage("Typing...", { loading: true });
    this.updateChatbotState(typingIndicator);

    // Step 2: Simulate a delay (typing effect)
    setTimeout(() => {
      // Step 3: Remove typing indicator and add the real message with resources
      const message = this.createChatBotMessage(
        "📊 Great choice! Check out these resources for Data Visualization:",
        {
          widget: "dataVisualizationLinks", // Show Data Visualization links widget
        }
      );

      // Step 4: Update state by replacing the typing indicator with the actual message
      this.updateChatbotState(message);
      // Step 5:Remove the typing indicator
      this.setState((prevState) => ({
        ...prevState,
        messages: prevState.messages.filter((msg) => msg.id !== typingIndicator.id),
      }));
    }, 1000); // 1 second delay to simulate typing
  };

  updateChatbotState(message) {
    try {
      // Step 5: Update chatbot state with the new message
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    } catch (error) {
      console.error("Error updating chatbot state:", error);
    }
  }
}

export default ActionProvider;
