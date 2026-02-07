import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// Lazy-load OpenAI client to avoid initialization errors
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ VITE_OPENAI_API_KEY is not set. AI chat will use fallback responses.");
      throw new Error("OpenAI API key not configured");
    }

    console.log("✅ Initializing OpenAI client");
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Only for development!
    });
  }

  return openai;
}

const SYSTEM_PROMPT_YOU_LATE = `You are a Singaporean NUS Hall student. Use heavy Singlish (lor, lah, leh, meh, sia, shag, can, siao).
You are currently being chased by someone to collect your clothes from the communal washing machine or dryer.
You are always late. Give typical student excuses: you're playing Valorant, you're napping after a long lecture
at LT19, or you're 'on the way' (but actually still in your room). Be lazy and slightly defensive.
Keep responses short and casual (1-3 sentences max). Act annoyed but eventually agreeable.`;

const SYSTEM_PROMPT_THEM_LATE = `You are a Singaporean NUS Hall student. Use heavy Singlish (lor, lah, leh, meh, sia, shag, can, siao).
Someone is late collecting their clothes from the communal washing machine or dryer, and you need to use it.
You are frustrated and impatient. Chase them to collect their clothes quickly. Be persistent but still friendly.
Keep responses short and casual (1-3 sentences max). Show urgency and slight annoyance.`;

// Use OpenAI's native type for better compatibility
type ChatMessage = ChatCompletionMessageParam;

/**
 * Get a response from the hall student AI
 * @param userMessage - The message from the user
 * @param conversationHistory - Previous messages in the conversation
 * @param isYouLate - If true, you are late. If false, they are late.
 * @returns AI-generated response
 */
export async function getChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  isYouLate: boolean = false
): Promise<string> {
  console.log("🤖 getChatResponse called with message:", userMessage);
  console.log("📝 Conversation history length:", conversationHistory.length);
  console.log("⏰ Who's late?", isYouLate ? "YOU are late" : "THEY are late");

  try {
    // Get or initialize the OpenAI client
    const client = getOpenAIClient();

    const systemPrompt = isYouLate ? SYSTEM_PROMPT_THEM_LATE : SYSTEM_PROMPT_YOU_LATE;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    console.log("📤 Sending request to OpenAI...");
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 1.3, // Higher temperature for more creative/casual responses
      max_tokens: 150,
    });

    const aiResponse = response.choices[0]?.message?.content || "Eh sorry lah, my brain hang already 😅";
    console.log("✅ Got AI response:", aiResponse);
    return aiResponse;
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);

    // Fallback responses if API fails
    const fallbacks = [
      "Aiyo sorry ah, wait lah! Still doing something...",
      "Eh give me 5 min can? Almost done already...",
      "Walao so rush for what sia 😅",
      "Ok ok coming lah! Don't nag...",
      "Aiya sorry leh, I'm otw!",
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

/**
 * Check if OpenAI is properly configured
 */
export function isOpenAIConfigured(): boolean {
  const isConfigured = !!import.meta.env.VITE_OPENAI_API_KEY;
  console.log("🔑 OpenAI configured:", isConfigured);
  return isConfigured;
}
