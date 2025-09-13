'use server';

import { detectCrisis } from '@/ai/flows/chatbot-crisis-detection';
import { getGuidedExercise } from '@/ai/flows/chatbot-guided-exercise';
import { chatbotResourceRecommendation } from '@/ai/flows/chatbot-resource-recommendation';
import { summarizeConversationSentiment } from '@/ai/flows/summarize-conversation-sentiment';

const genericResponses = [
  "I understand. Could you tell me more about that?",
  "Thank you for sharing. How did that make you feel?",
  "That sounds challenging. I'm here to listen.",
  "I see. Let's explore that a bit more.",
  "It takes courage to talk about this. I appreciate you trusting me."
];

export async function handleChatMessage(message: string, conversationHistory: string): Promise<{ response: string, isCrisis: boolean }> {
  try {
    const fullConversation = `${conversationHistory}\nUser: ${message}`;
    const crisisResult = await detectCrisis({ conversationText: fullConversation });
    
    if (crisisResult.isCrisis) {
      return {
        response: crisisResult.suggestedResponse,
        isCrisis: true,
      };
    }
    
    // Check if the user is asking for an exercise
    if (message.toLowerCase().includes('exercise') || message.toLowerCase().includes('breathing') || message.toLowerCase().includes('mindfulness')) {
      const exerciseResult = await getGuidedExercise({ topic: message });
      return {
        response: exerciseResult.exercise,
        isCrisis: false,
      };
    }

    // Check if user is asking for resources
    if (message.toLowerCase().includes('resources') || message.toLowerCase().includes('help') || message.toLowerCase().includes('articles')) {
       const resourceResult = await chatbotResourceRecommendation({ conversationHistory: fullConversation, userConcerns: message });
       const recommendations = resourceResult.recommendedResources.join('\n- ');
       return {
         response: `Here are some resources that might be helpful:\n- ${recommendations}\n\n${resourceResult.reasoning}`,
         isCrisis: false,
       }
    }
    
    // If not a crisis or specific request, return a generic, supportive response for this simulation.
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
