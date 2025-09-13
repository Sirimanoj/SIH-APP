'use server';

import { detectCrisis } from '@/ai/flows/chatbot-crisis-detection';
import { getGuidedExercise } from '@/ai/flows/chatbot-guided-exercise';
import { chatbotResourceRecommendation } from '@/ai/flows/chatbot-resource-recommendation';
import { summarizeConversationSentiment } from '@/ai/flows/summarize-conversation-sentiment';
import { getChatbotResponse } from '@/ai/flows/chatbot-conversation';

export async function handleChatMessage(message: string, conversationHistory: string): Promise<{ response: string, isCrisis: boolean }> {
  try {
    const fullConversation = `${conversationHistory}\nUser: ${message}`;
    
    // 1. Always check for crisis first
    const crisisResult = await detectCrisis({ conversationText: fullConversation });
    if (crisisResult.isCrisis) {
      return {
        response: crisisResult.suggestedResponse,
        isCrisis: true,
      };
    }
    
    // 2. Determine user intent
    if (message.toLowerCase().match(/exercise|breathing|mindfulness|meditation/)) {
      const exerciseResult = await getGuidedExercise({ topic: message });
      return {
        response: exerciseResult.exercise,
        isCrisis: false,
      };
    }

    if (message.toLowerCase().match(/resources|help|articles|videos|support/)) {
       const resourceResult = await chatbotResourceRecommendation({ conversationHistory: fullConversation, userConcerns: message });
       const recommendations = resourceResult.recommendedResources.join('\n- ');
       return {
         response: `Based on our conversation, here are some resources that might be helpful:\n- ${recommendations}\n\n${resourceResult.reasoning}`,
         isCrisis: false,
       }
    }
    
    // 3. If no specific intent, have a natural conversation
    const conversationalResult = await getChatbotResponse({ conversationHistory: fullConversation });

    // 4. In the background, check sentiment for potential escalation
    summarizeConversationSentiment({ conversationText: fullConversation }).then(sentimentResult => {
        if(sentimentResult.escalationNeeded) {
            // In a real app, you might trigger a notification to a counselor here.
            console.log("Escalation needed for this conversation.");
        }
    });
    
    return {
      response: conversationalResult.response,
      isCrisis: false,
    };

  } catch (error) {
    console.error("Error handling chat message:", error);
    return {
      response: "I'm sorry, I encountered an error. Please try again or contact a counselor if you need immediate help.",
      isCrisis: false,
    };
  }
}
