import CompanionCard from "@/components/home/module/ui/CompanionCard";
import SearchInput from "@/components/home/module/ui/SearchInput";
import SubjectFilter from "@/components/home/module/ui/SubjectFilter";
import { fetchLearningPartner } from "@/lib/actions/create.learning";
import { getSubjectColor } from "@/lib/utils";
import { SearchParams } from "@/types";
import { Metadata } from "next";
import React from "react";

const Learning = async ({ searchParams }: SearchParams) => {
	const filters = await searchParams;
	const subject = filters.subject ? filters.subject : "";
	const teaching_subject = filters.teaching_subject
		? filters.teaching_subject
		: "";
	const companions = await fetchLearningPartner({ subject, teaching_subject });
	return (
		<main className="container mx-auto px-4 py-8  my-20">
			<section className="flex flex-col">
				{/* Header with title and description */}
				<div className="mb-8 text-center md:mb-12">
					<h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
						Companion <span className='text-[#845fff]'>Library</span> 
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
						Discover AI companions to help you learn new subjects and skills at
						your own pace.
					</p>
				</div>

				{/* Filters section */}
				<div className="mb-8 md:mb-12">
					<div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl  p-4   sm:p-6 md:flex-row md:items-center md:justify-between">
						<div className="flex-1">
							<SearchInput />
						</div>
						<div className="w-full md:w-auto">
							<SubjectFilter />
						</div>
					</div>
				</div>

				{/* Companions grid */}
				<section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{companions.length > 0 ? (
						companions.map((companion) => (
							<CompanionCard
								key={companion.id}
								{...companion}
								color={getSubjectColor(companion.subject || "")}
							/>
						))
					) : (
						<div className="col-span-full py-20 text-center">
							<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
								<svg
									className="h-10 w-10 text-gray-400 dark:text-gray-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
								No companions found
							</h3>
							<p className="text-gray-500 dark:text-gray-400">
								Try adjusting your search or filter to find what you're looking
								for.
							</p>
						</div>
					)}
				</section>
			</section>
		</main>
	);
};

export default Learning;

export const metadata: Metadata = {
  title: "Companion Library | Wisera - AI Learning Companion",
  description: "Explore our AI-powered learning companions designed to enhance your study experience. Find the perfect companion to help you learn new subjects and skills at your own pace.",
};