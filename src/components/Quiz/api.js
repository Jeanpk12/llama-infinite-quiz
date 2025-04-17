import Groq from "groq-sdk";

// Acesse a chave da API definida no .env (por exemplo: VITE_GROQ_API_KEY=your_key)
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getGroqChatCompletion(questao) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: questao,
      },
    ],
    model: "llama3-8b-8192",
  });
}
