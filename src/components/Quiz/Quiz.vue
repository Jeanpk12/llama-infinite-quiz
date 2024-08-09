<template>
  <div class="quiz-container">
    <div class="input-container">
      <input v-model="tema" class="theme-input" placeholder="Insira o tema para a questão" />
      <button @click="carregarQuestao" class="load-button">Carregar Questão</button>
    </div>
    <div v-if="questao" class="question-container">
      <p class="question-text">{{ questao.enunciado }}</p>
      <ul class="options-list">
        <li v-for="(opcao, key) in questao.opcoes" :key="key" class="option-item">
          <input type="radio" :id="'opcao-' + key" :value="key" v-model="respostaSelecionada" class="option-radio" />
          <label :for="'opcao-' + key" class="option-label">
            {{ opcao }}
          </label>
        </li>
      </ul>
      <button @click="verificarResposta" class="submit-button">Submit</button>
    </div>
    <p v-if="resultado" class="result-text">{{ resultado }}</p>
  </div>
</template>

<script>
import { getGroqChatCompletion } from './api'; // Importa a função da API
import confetti from 'canvas-confetti';

export default {
  data() {
    return {
      tema: '', // Tema inserido pelo usuário
      questao: null,
      ultimasQuestoes: [],
      respostaSelecionada: '',
      resultado: ''
    };
  },
  methods: {
    async carregarQuestao() {
      try {
        if (!this.tema) {
          alert("Por favor, insira um tema.");
          return;
        }

        // Adiciona as últimas questões ao prompt
        const perguntasAnteriores = this.ultimasQuestoes.length
          ? `As últimas questões foram:\n${this.ultimasQuestoes.map(q => `- ${q}`).join('\n')}\n`
          : '';

        const prompt = `Gere uma questão de quiz como um objeto JSON no seguinte formato exato:

{
  "enunciado": "Qual é a capital da França?",
  "opcoes": {
      "a": "Berlim",
      "b": "Madri",
      "c": "Paris",
      "d": "Lisboa"
  },
  "gabarito": "c"
}

O "enunciado" deve ser uma string contendo a pergunta.
"opcoes" deve ser um objeto contendo quatro alternativas identificadas por "a", "b", "c", e "d".
O "gabarito" deve ser uma string contendo a chave da alternativa correta.

A questão gerada deve estar relacionada ao tema "${this.tema}". e ser deferente das questões anteriores. : perguntas Anteriores
${perguntasAnteriores}

Apenas retorne o objeto JSON, sem adicionar qualquer texto explicativo ou formatação adicional. Certifique-se de que a saída seja exatamente no formato JSON mostrado acima.`;

        const response = await getGroqChatCompletion(prompt);
        const respostaTexto = response.choices[0]?.message?.content || '';

        // Tente extrair e parsear o conteúdo como JSON
        try {
          const jsonMatch = respostaTexto.match(/{.*}/s); // Encontra o primeiro objeto JSON
          if (jsonMatch) {
            const novaQuestao = JSON.parse(jsonMatch[0]);
            this.ultimasQuestoes.push(novaQuestao.enunciado); // Adiciona a nova questão ao array
            if (this.ultimasQuestoes.length > 30) { // Limita o número de questões salvas
              this.ultimasQuestoes.shift(); // Remove a questão mais antiga se o limite for atingido
            }
            this.questao = novaQuestao;
          } else {
            throw new Error("Nenhum JSON válido encontrado na resposta.");
          }
        } catch (jsonError) {
          console.error("Erro ao tentar parsear JSON:", jsonError);
          console.log("Resposta recebida:", respostaTexto);
          this.questao = null;
        }

        this.resultado = '';
        this.respostaSelecionada = '';
      } catch (error) {
        console.error("Erro ao carregar a questão:", error);
      }
    },
    verificarResposta() {
      if (this.respostaSelecionada === this.questao.gabarito) {
        this.resultado = "Correto!";
        this.exibirConfete();
      } else {
        this.resultado = `Incorreto. A resposta correta é: ${this.questao.gabarito}`;
      }
      setTimeout(() => {
        this.carregarQuestao();
      }, 2500); // Carrega uma nova questão após 2 segundos
    },
    exibirConfete() {
      confetti({
        particleCount: 1500, // Quantidade de Confetes
        spread: 1500, // Dispersão dos confetes
        colors: ['#007bff', '#fff'], // Cores
        origin: { y: 0.5 }
      });
    }
  },
  created() {
    // Carrega a primeira questão automaticamente se desejar
    // this.carregarQuestao();
  }
};
</script>
