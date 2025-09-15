
'use server';

import { detectCrisis } from '@/ai/flows/chatbot-crisis-detection';
import { getGuidedExercise } from '@/ai/flows/chatbot-guided-exercise';
import { chatbotResourceRecommendation } from '@/ai/flows/chatbot-resource-recommendation';
import { summarizeConversationSentiment } from '@/ai/flows/summarize-conversation-sentiment';
import { getChatbotResponse } from '@/ai/flows/chatbot-conversation';
import { cbtGuidedExercise } from '@/ai/flows/cbt-guided-exercise';

export { cbtGuidedExercise };

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

    // Intent: Guided Exercise (Breathing, Mindfulness)
    if (message.toLowerCase().match(/exercise|breathing|mindfulness|meditation/)) {
      const exerciseResult = await getGuidedExercise({ topic: message });
      return {
        response: exerciseResult.exercise,
        isCrisis: false,
      };
    }

    // Intent: Resource Recommendation
    if (message.toLowerCase().match(/resources|help|articles|videos|support/)) {
       const resourceResult = await chatbotResourceRecommendation({ conversationHistory: fullConversation, userConcerns: message });
       const recommendations = resourceResult.recommendedResources.join('\n- ');
       return {
         response: `Based on our conversation, here are some resources that might be helpful:\n- ${recommendations}\n\n${resourceResult.reasoning}`,
         isCrisis: false,
       }
    }

    // Intent: CBT for a Negative Thought
    // This is a simple heuristic. A more advanced implementation could use a dedicated intent detection model.
    if (message.toLowerCase().match(/i feel like|i am|i'm such a|i always|i never/)) {
        const cbtResult = await cbtGuidedExercise({ negativeThought: message });
        
        const distortions = cbtResult.cognitiveDistortions.map(d => `*${d.name}:* ${d.description}`).join('\n');
        const questions = cbtResult.socraticQuestions.map(q => `- ${q}`).join('\n');

        const response = `It sounds like you're being really hard on yourself. Let's look at that thought more closely using a CBT technique.

**Your Thought:**
_"${message}"_

**Possible Cognitive Distortions:**
I noticed a few common unhelpful thinking patterns. Do any of these feel true?
${distortions}

**Challenge the Thought:**
To get a clearer perspective, ask yourself:
${questions}

**A More Balanced Reframe:**
Consider this alternative perspective:
_"${cbtResult.reframedThought}"_

This is just an exercise, not a judgment. The goal is to notice the thought, not just automatically believe it.`;

        return {
            response,
            isCrisis: false,
        };
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
