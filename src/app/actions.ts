'use server';

import { detectCrisis } from '@/ai/flows/chatbot-crisis-detection';

// In a real application, this would call a more sophisticated generative AI model.
// For now, we simulate responses and crisis detection.
const genericResponses = [
  "I understand. Could you tell me more about that?",
  "Thank you for sharing. How did that make you feel?",
  "That sounds challenging. I'm here to listen.",
  "I see. Let's explore that a bit more.",
  "It takes courage to talk about this. I appreciate you trusting me."
];

export async function handleChatMessage(message: string): Promise<{ response: string, isCrisis: boolean }> {
  try {
    const crisisResult = await detectCrisis({ conversationText: message });
    
    if (crisisResult.isCrisis) {
      return {
        response: crisisResult.suggestedResponse,
        isCrisis: true,
      };
    }
    
    // If not a crisis, return a generic, supportive response for this simulation.
    // In a real app, you would use another AI flow for conversational responses.
    const randomResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    
    return {
      response: randomResponse,
      isCrisis: false,
    };

  } catch (error) {
    console.error("Error handling chat message:", error);
    // Return a generic error message to the user
    return {
      response: "I'm sorry, I encountered an error. Please try again or contact support if the problem persists.",
      isCrisis: false,
    };
  }
}
