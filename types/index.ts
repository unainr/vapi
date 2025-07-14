export interface LayoutProps {
	children: React.ReactNode;
}

// server action type

export interface LearningPartner {
	name: string;
	subject: string;
	teaching_subject: string;
	voice_type: string;
	speaking_style: string;
	duration: number;
}

export interface getLearningPartner {
	limit?: number;
	page?: number;
	subject?: string | string[];
	teaching_subject?: string | string[];
}

// search params type

export interface SearchParams {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface CompanionCardProps {
	id: string;
	name: string | null;
	subject: string | null;
	teaching_subject: string | null;
	duration: number | null;
	speaking_style: string | null;
	color?: string;
}


export interface CompanionProps {
	companionId: string;
	name: string | null;
	subject: string | null;
	teaching_subject: string | null;
	voice_type: string | null;
	speaking_style: string | null;
	userName: string;
	userImage: string;
}


export interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}