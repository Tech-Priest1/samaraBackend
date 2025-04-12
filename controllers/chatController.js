import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

export async function chatWithGemini(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    // Prompt base com instruções específicas
    const prompt = `
Você é um assistente virtual chamado MobiBot, especializado em suporte para a loja online de celulares MobiExpress. 
A MobiExpress vende celulares. 
A MobiExpress possui um aplicativo com as seguintes funções:
- Lista de celulares disponíveis para compra
- Adição de produtos ao carrinho
- Ver as ordens realizadas
- Suporte ao cliente via chat
- Busca por produto


Você deve sempre responder em português do Brasil, de forma educada, clara e útil.

Pergunta do cliente: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.status(200).json({ response });
  } catch (error) {
    console.error('Erro no chat:', error);
    res.status(500).json({ error: 'Erro ao processar a mensagem com Gemini' });
  }
}
