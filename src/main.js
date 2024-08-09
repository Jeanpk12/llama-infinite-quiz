import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')


import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Você deve gerar um objeto da seguinte forma
        questao = {
        enunciado: "Qual é a capital da França?",
        opcoes: {
            a: "Berlim",
            b: "Madri",
            c: "Paris",
            d: "Lisboa"
    },
        gabarito: "c"
    };
Sobre todos os temas que for solicitado. Você só deve retornar o objeto
A questão deve estar relacionado com ${questao}`,
      },
    ],
    model: "llama3-8b-8192",
  });
}