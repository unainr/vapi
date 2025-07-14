import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};



export const configureAssistant = (voice_type: string, speaking_style: string) => {
  const normalizedVoiceType = voice_type.trim().toLowerCase() as keyof typeof voices;
  const normalizedStyle = speaking_style.trim().toLowerCase();

  const voiceId = voices[normalizedVoiceType]?.[normalizedStyle as keyof (typeof voices)[keyof typeof voices]] || "sarah";

  console.log("🎤 Selected Voice ID:", voiceId);

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hi there! Let’s get started — today’s session is all about {{teaching_subject}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

Tutor Guidelines:
- Stick to the given topic - {{ teaching_subject }} and subject - {{ subject }}.
- Keep the conversation flowing smoothly while maintaining control.
- From time to time make sure that the student is following and understanding.
- Break down the topic into smaller parts.
- Keep your style of conversation {{ voice_type }}.
- Keep responses short, like in a real voice conversation.
- Do not include any special characters in your responses.`,
        },
      ],
    },
     // clientMessages: [],
    // serverMessages: [],
  };

  return vapiAssistant;
};