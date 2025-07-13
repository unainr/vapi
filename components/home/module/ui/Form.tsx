"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	speakingStyleOptions,
	subjectOptions,
	voiceTypeOptions,
} from "@/constants";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/lib/validation";
import { createLearningPartner } from "@/lib/actions/create.learning";
import { useState } from "react";
import { Circle, SplineIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const FormBuild = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema) as any,
		defaultValues: {
			name: "",
			subject: "",
			teaching_subject: "",
			voice_type: "",
			speaking_style: "",
			duration: 15,
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);

			const res = await createLearningPartner(values);
			if (res.success && res.data) {
				router.push(`/learning-ai/${res.data[0].id}`);
				console.log("Inserted partner:", res.data);
			} else {
				router.push("/");
				console.error("Insertion failed.");
			}
		} catch (error: any) {
			console.error("Submit error:", error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Companion Name </FormLabel>
							<FormControl>
								<Input placeholder="Enter name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Subject */}
				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select subject" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{subjectOptions.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Teaching Subject */}
				<FormField
					control={form.control}
					name="teaching_subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Teaching Subject</FormLabel>
							<FormControl>
								<Input placeholder="e.g., Algebra" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Voice Type */}
				<FormField
					control={form.control}
					name="voice_type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Voice Type</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select voice type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{voiceTypeOptions.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Speaking Style */}
				<FormField
					control={form.control}
					name="speaking_style"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Speaking Style</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select style" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{speakingStyleOptions.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Duration */}
				<FormField
					control={form.control}
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duration (in minutes)</FormLabel>
							<FormControl>
								<Input type="number" placeholder="e.g., 15" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{loading ? <Circle className="animate-spin w-4 h-4" /> : "Submit"}
				</Button>
			</form>
		</Form>
	);
};

export default FormBuild;
