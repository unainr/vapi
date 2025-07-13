import { z } from "zod";

export const formSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	subject: z.string().min(1, { message: "Subject is required" }),
	teaching_subject: z
		.string()
		.min(1, { message: "Teaching Subject is required" }),
	voice_type: z.string().min(1, { message: "Voice Type is required" }),
	speaking_style: z.string().min(1, { message: "Speaking Style is required" }),
duration: z.coerce.number().min(1, { message: 'Duration is required.'}),
});
