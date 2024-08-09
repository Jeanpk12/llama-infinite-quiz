import Groq from "groq-sdk";

// Use a API key diretamente com a opção de permitir o uso no navegador
const groq = new Groq({
  apiKey: "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",
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
