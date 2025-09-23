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
				<div className="mb-12 text-center md:mb-16">
				{/* Background decoration */}
				<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-500/20 blur-3xl"></div>
				<div className="absolute -top-20 -left-32 h-60 w-60 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-500/20 blur-3xl"></div>
				</div>
				
				{/* Badge */}
				<div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 text-sm font-medium text-purple-700 ring-1 ring-purple-200 dark:from-purple-900/30 dark:to-blue-900/30 dark:text-purple-300 dark:ring-purple-800">
				<svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
				AI-Powered Learning
				</div>
				
				{/* Main heading */}
				<h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
				<span > Companion</span>
				<span className="relative inline-block">
				<span className="bg-gradient-to-r from-[#845fff] via-purple-600 to-blue-600 bg-clip-text text-transparent">
				Library
				</span>
				{/* Underline decoration */}
				<div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#845fff] via-purple-600 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
				</span>
				</h1>
				
				{/* Description */}
				<p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
				Discover AI companions to help you learn new subjects and skills at your own pace. 
				<span className="block mt-2 text-lg text-gray-500 dark:text-gray-400">
				Personalized learning experiences powered by advanced AI technology.
				</span>
				</p>
				
				{/* Stats or features */}
				<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
				<div className="flex items-center">
				<div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
				<span>Interactive Learning</span>
				</div>
				<div className="flex items-center">
				<div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
				<span>Personalized Pace</span>
				</div>
				<div className="flex items-center">
				<div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
				<span>AI-Powered</span>
				</div>
				</div>
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