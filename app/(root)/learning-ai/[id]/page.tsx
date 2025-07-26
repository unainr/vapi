import LearningPartnerVoice from "@/components/home/module/ui/LearningPartnerVoice";
import { getCompanion } from "@/lib/actions/create.learning";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AiLearning = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const user = await currentUser();
	const companion = await getCompanion(id);
	if (!user) redirect("/sign-in");
	if (!companion) redirect("/learning-ai");
	return (
		<main className="dark:bg-black/40  p-6 my-20">
			<article className="max-w-4xl mx-auto  rounded-2xl border dark:bg-gray-800/40 bg-slate-100 border-gray-200 dark:border-gray-800 p-8">
				<div className="flex items-start gap-6 max-md:flex-col max-md:items-center max-md:text-center">
					<div
						className="w-20 h-20 flex items-center justify-center rounded-xl flex-shrink-0"
						style={{
							backgroundColor: getSubjectColor(companion.data?.subject || ""),
						}}>
						<span className="text-2xl font-bold text-white">
							{companion.data?.name?.charAt(0) || "AI"}
						</span>
					</div>

					<div className="flex-1 space-y-4">
						<div>
							<h1 className="text-3xl font-bold  mb-2">
								{companion.data?.name}
							</h1>

							<div className="flex flex-wrap items-center gap-3 max-md:justify-center">
								<span
									className="px-3 py-1 rounded-lg text-sm font-medium text-white"
									style={{
										backgroundColor: getSubjectColor(
											companion.data?.subject || ""
										),
									}}>
									{companion.data?.subject}
								</span>

								<span className="px-3 py-1 rounded-lg text-sm font-medium ">
									{companion.data?.teaching_subject}
								</span>

								<span className="text-gray-600 text-sm">
									{companion.data?.duration} minutes
								</span>
							</div>
						</div>
					</div>
				</div>
			</article>
			<LearningPartnerVoice
				{...companion.data!}
				companionId={companion.data?.id!}
				userName={user.firstName!}
				userImage={user.imageUrl!}
			/>
		</main>
	);
};

export default AiLearning;
