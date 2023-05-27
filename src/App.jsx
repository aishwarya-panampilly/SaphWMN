import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-28gCQiWYhlAZyyy7rp2P5aAG",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chat = async (e, message) => {
    e.preventDefault();
    if (!message) return;
    setIsTyping(true);
    scrollTo(0,1e10)
    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");
    await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps with the mental health needs of users. The assistant is helpful, empathic, and friendly. Its objective is to make the user feel better by feeling heard. With each response, the AI assisstant prompts the user to continue the conversation in a natural way.",
        },
        ...chats,
      ],
    })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
    <main>
      <h1>SAPPHIRE</h1>
      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>
      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>
      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

    </main>
        );
}
export default App;


