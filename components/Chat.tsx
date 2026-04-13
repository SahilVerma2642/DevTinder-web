import { useCallback, useEffect, useState } from "react";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState<Record<string, string>[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const { targetUserId } = useParams();

  const user = useSelector((store: RootState) => store.user);
  const userId = user?.data?._id;
  const firstName = user?.data?.firstName;

  useEffect(() => {
    if (!targetUserId) {
      return;
    }

    axios.get(BASE_URL + `/chat/${targetUserId}`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response?.data?.status) {
        const chatHistory = response?.data?.data;

        const chat = chatHistory?.messages?.map((msg : any) =>  {
          return {
            message : msg.text,
            uId : msg.senderId._id,
            firstName : msg.senderId.firstName
          }
        });
        console.log("Chat history fetched:", chat);
        setMessages(chat || []);
      }
    })
    .catch((err: unknown) => {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      }
    });

  }, [targetUserId]);

  useEffect(() => {
    if (!userId) {
      console.log("it is not possible to join room without userId");
      return;
    }

    socket.emit("joinRoom", { firstName, userId, targetUserId });

    socket.on("messageReceived", (data) => {
      console.log("Message received:", data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.emit("leaveRoom", { firstName, userId, targetUserId });
      socket.off("messageReceived");
    };
  }, [firstName, userId, targetUserId]);

  const sendMessage = (msg: string) => {
    setInputValue("");
    console.log("Sending message:", { userId, targetUserId, msg, firstName });
    socket
      .timeout(5000)
      .emit(
        "sendMessage",
        { userId, targetUserId, message: msg, firstName },
        (err: Error | null, response: Record<string, unknown>) => {
          if (err) {
            console.error("Error", err);
          } else {
            console.log("response", response);
          }
        },
      );
  };

  const ChatHistory = useCallback(() => {
    return messages.map((data, index) => {
      const { message, firstName, uId } = data;

      return (
        <>
          <div
            key={index}
            className={`chat ${uId === userId ? "chat-end" : "chat-start"}`}
          >
            {/* <div className="chat-image avatar"></div> */}
            <div className="chat-header">
              {firstName}
              {/* <time className="text-xs opacity-50">12:45</time> */}
            </div>
            <div className="chat-bubble">{message}</div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
          {/* <div className="chat chat-end">
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div> */}
        </>
      );
    });
  }, [messages, userId]);

  return (
    <div className="mx-auto my-8 mockup-window border border-base-300 w-1/2">
      <div className="p-5">{ChatHistory()}</div>

      <div className="mt-2 border rounded bg-blue-100 border-blue-100 p-2">
        <div className="flex flex-col-2 justify-center">
          <input
            type="text"
            placeholder="Type your message here ..."
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
          />
          <button
            className="btn btn-square ml-3"
            onClick={() => sendMessage(inputValue)}
          >
            <img src="/send-1-svgrepo-com.svg" alt="Send" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
