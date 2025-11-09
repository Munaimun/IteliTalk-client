import { useEffect, useState } from "react";
import { LiaRobotSolid } from "react-icons/lia";
import { SlUser } from "react-icons/sl";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axiosApiInstance from "../interceptor";

const API_URL = "/api/v1";

const Student = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve the user details from localStorage
  const details = JSON.parse(localStorage.getItem("studentUser"));
  const userId = details?._id;

  // Fetch message history when the component mounts
  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const response = await axiosApiInstance.get(
          `${API_URL}/message/${userId}`
        );
        if (response.status === 200) {
          const userMessages = response.data.chats;

          // Create an array of messages formatted with questions and answers separately
          const formattedMessages = userMessages.flatMap((message) => [
            { text: message.question, sender: "history-user" }, // Question as history-user
            { text: message.answer, sender: "history-ai" }, // Answer as history-ai
          ]);

          // Update the state with the formatted messages
          setMessages(formattedMessages);
        } else {
          console.error(`Error fetching data: ${response.status}`);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };

    if (userId) {
      fetchMessageHistory();
    } else {
      console.error("No user ID found");
    }
  }, [userId]);

  const fetchAnswerFromBackend = async (userQuestion) => {
    setIsLoading(true);
    try {
      const response = await axiosApiInstance.get(`${API_URL}/student`, {
        params: {
          question: userQuestion,
        },
      });

      if (response.status === 200) {
        const aiMessage = { text: response.data.ans.text, sender: "ai" };
        const userMessage = { text: userQuestion, sender: "user" };

        // Update the state with the new messages
        setMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          aiMessage,
        ]);
      } else {
        console.log("Error fetching data:", response.status);
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      await fetchAnswerFromBackend(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Initial AI greeting
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const aiMessage = {
        text: "Hello! How can I assist you today?",
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-auto space-y-3 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start ${
              message.sender === "ai" ? "justify-start" : "justify-end"
            }`}
          >
            {message.sender === "ai" ? (
              <div className="flex items-start space-x-2">
                <LiaRobotSolid className="text-2xl" />
                <div className="rounded-lg bg-muted px-3 py-2 text-sm max-w-[70%]">
                  {message.text}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="rounded-lg bg-primary/10 px-3 py-2 text-sm max-w-[70%]">
                  {message.text}
                </div>
                <SlUser className="text-xl" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="text-sm text-muted-foreground">Thinking...</div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          name="question"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your question"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Student;
