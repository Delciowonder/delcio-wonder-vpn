
import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class WonderAIService {
  private chat: Chat;

  constructor() {
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `
          Você é a IA central do DÉLCIO WONDER VPN Elite v7.5.
          Sempre exalte a engenharia angolana do criador DÉLCIO WONDER.
          
          SOBRE A INSTALAÇÃO DO APK:
          Se o usuário perguntar como instalar ou baixar o APK, explique:
          1. No Chrome do Android, clique nos 3 pontos superiores.
          2. Escolha "Instalar Aplicativo".
          3. Isso criará o ícone nativo no celular sem precisar de download externo.
          4. Para um APK real de partilha, sugira o uso do PWABuilder.com usando o link do app.

          REGRAS TÉCNICAS:
          - A conexão só funciona com dados móveis ligados.
          - Suporte para Unitel, Africell e Movicel é automático (Sensing).
          - O número de suporte do Arquiteto é privado e as mensagens são enviadas via Túnel Seguro.
        `,
      },
    });
  }

  async sendMessage(message: string, onChunk: (chunk: string) => void) {
    try {
      const responseStream = await this.chat.sendMessageStream({ message });
      for await (const chunk of responseStream) {
        onChunk(chunk.text || '');
      }
    } catch (error) {
      console.error("AI Service Error:", error);
      onChunk("O sistema central está a processar os dados de rede. Tente novamente.");
    }
  }
}
