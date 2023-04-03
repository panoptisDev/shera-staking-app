import { useEffect, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  Avatar,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

// import cross from "../public/assets/cross.png";
// import messageIcon from "../public/assets/message-icon.png";

// import plus from "../public/assets/plus.png";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

// Import the Firebase SDK
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const API_KEY = "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";
// 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
// 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
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

function ChatBot() {
  const address = useAddress();

  const [count, setcount] = useState();

  const [boolcount, setboolcount] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Shera AI Bot! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
      avatar: "https://avatars.dicebear.com/api/avataaars/chatgpt.svg",
    },
  ]);

  function newChat() {
    // setboolcount((prevState) => !prevState);

    const newMessages = messages;
    setcount(count + 1);
    database
      .ref("users/" + walletAddress + "/" + "chats" + "/" + "chat" + count)
      .set(newMessages);
    setMessages([
      {
        message: "Hello, I'm Shera AI Bot! Ask me anything!",
        sentTime: "just now",
        sender: "ChatGPT",
        avatar: "https://avatars.dicebear.com/api/avataaars/chatgpt.svg",
      },
    ]);

    database
      .ref("users/" + walletAddress + "/" + "chats" + "/" + "chat" + count)
      .once("value")
      .then((snapshot) => {
        const messages = snapshot.val();
        {
          messages[1].message ? setcount(count + 1) : setcount(count);
          console.log(
            "count is " + count + "message is " + messages[1].message
          );
        }
      });
    setOpenMenu(false);
    // window.location.reload(false);
  }

  function recoverMessageState(index) {
    setOpenMenu(false);
    const messageArray = [];
    console.log("value of index is " + index);
    database
      .ref("users/" + walletAddress + "/" + "chats" + "/" + "chat" + index)
      .once("value")
      .then((snapshot) => {
        const messages = snapshot.val();
        setMessages(messages);
      });
  }

  useEffect(() => {
    var numOfcount;
    database
      .ref("users/" + walletAddress + "/" + "chats" + "/")
      .once("value")
      .then((snapshot) => {
        numOfcount = snapshot.numChildren();
        setcount(numOfcount);
        console.log("val is :" + numOfcount);
      });
  }, [address, boolcount]);

  useEffect(() => {
    const messageArray = [];
    database
      .ref("users/" + walletAddress + "/" + "chats")
      .once("value")
      .then((snapshot) => {
        console.log("chat messages are for snap");
        snapshot.forEach((chatSnapshot) => {
          console.log("chat messages are for each");
          // const chatId = chatSnapshot.key;
          const chatData = chatSnapshot.val();
          // Get the first message in the chat
          for (const messageId in chatData) {
            if (chatData[1].message) {
              const chatMessage = chatData[1].message;
              // messageArray.unshift(chatMessage);
              messageArray.push(chatMessage);
              console.log("chat messages are " + chatMessage);
              break;
            }
            break;
          }
          // chatMessages.push({ chatId, chatMessage });
        });
      });
    setfetchmessages(messageArray);
    console.log("chat messages are ");
    console.log("chat messages are out for each");
  }, [address, boolcount]);

  // useEffect(() => {
  //   console.log("value of count is " + count);
  //   var flag = false;
  //   for (var l = 0; l < 100; l++) {
  //     database
  //       .ref("users/" + walletAddress + "/" + "chats" + "/" + "chat" + l)
  //       .once("value")
  //       .then((snapshot) => {
  //         const messages = snapshot.val();

  //         const messageArray = [];

  //         const message = messages[1].message;
  //         if (message) {
  //           console.log("Extracted Message is " + message);
  //           messageArray.push(message);
  //           setfetchmessages((oldArray) => [...oldArray, message]);
  //           console.log("fetch messages is " + fetchmessages);
  //           console.log("run");
  //         } else {
  //           flag = true;
  //           console.log("run1");
  //         }
  //       });
  //     if (flag == true) {
  //       console.log("loop stop");
  //       break;
  //     }
  //     console.log("loop run");
  //   }
  // }, [address]);

  // useEffect(() => {
  //   database.ref("users/" + walletAddress + "/" + "chat" + count).set(messages);
  //   console.log("in use effect " + messages);
  // }, [messages, setMessages]);

  const [fetchmessages, setfetchmessages] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyC2o7VqIAyI52uje0ep-BAavFom1qBDRyA",
    authDomain: "sheraai.firebaseapp.com",
    projectId: "sheraai",
    storageBucket: "sheraai.appspot.com",
    messagingSenderId: "72831637303",
    appId: "1:72831637303:web:3382285096d6c42fda2cb2",
    measurementId: "G-82L1BZ4J7K",
  };
  firebase.initializeApp(firebaseConfig);

  // Get the wallet address of the user
  const walletAddress = address;

  // Get a reference to the Firebase Realtime Database
  const database = firebase.database();

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    console.log("old message is : " + message);
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      avatar: "https://avatars.dicebear.com/api/avataaars/chatgpt.svg",
    };

    const newMessages = [...messages, newMessage];

    database
      .ref("users/" + walletAddress + "/" + "chats" + "/" + "chat" + count)
      .set(newMessages);

    console.log("new message is " + newMessages);

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformatq

    let apiMessages = chatMessages.map((messageObject) => {
      var role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  const [openMenu, setOpenMenu] = useState(false);
  console.log(openMenu);
  return (
    <>
      {address ? (
        <>
          <img
            className="Hamburger"
            src={
              !openMenu
                ? "https://icons.veryicon.com/png/o/miscellaneous/godserver/expand-sidebar.png"
                : "https://freenotez.com/asserts/cross.png"
            }
            onClick={() => {
              setOpenMenu((openMenu) => !openMenu);
            }}
          />
          <div className={!openMenu ? "NewChat" : "NewChat NewChatForMob"}>
            <div className="user">
              <span>
                {" "}
                <img
                  src="https://freenotez.com/asserts/plus.png"
                  height={20}
                  width={20}
                />{" "}
              </span>{" "}
              <p onClick={newChat}> New Chat </p>
            </div>
          </div>
        </>
      ) : (
        console.log("wallet is not connected")
      )}
      <code
        className={
          !openMenu ? "fetchmessages" : "fetchmessages fetchmessagesForMob"
        }
      >
        {fetchmessages.map((user, key) =>
          address ? (
            <code className="user fet" key={key}>
              <span>
                {" "}
                <img
                  src="https://freenotez.com/asserts/message-icon.png"
                  height={20}
                  width={20}
                />{" "}
              </span>{" "}
              <p onClick={() => recoverMessageState(key)}>
                {" "}
                {user.slice(0, 20) + "..."}{" "}
              </p>
            </code>
          ) : (
            console.log("wallet is not cannected")
          )
        )}
      </code>

      {!address ? (
        <>
          <div className="connect-wallet">
            <ConnectWallet />
          </div>
        </>
      ) : (
        <>
          <div className="App">
            <div
              className="Chat_Container"
              style={{ position: "relative", height: "95vh", width: "76%" }}
            >
              <MainContainer>
                <ChatContainer>
                  <MessageList
                    scrollBehavior="smooth"
                    typingIndicator={
                      isTyping ? (
                        <TypingIndicator content="Shera AI Bot is typing" />
                      ) : null
                    }
                  >
                    {messages.map((message, i) => {
                      console.log(message);

                      return (
                        <>
                          <Message key={i} model={message}>
                            {" "}
                            <Avatar
                              src="https://sheratokens.com/wp-content/uploads/2022/04/shera-logo.svg"
                              name="Joe"
                            />
                          </Message>
                        </>
                      );
                    })}
                  </MessageList>
                  <MessageInput
                    placeholder="Type message here"
                    onSend={handleSend}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChatBot;
