import {
	fetchLearningPartner,
	getUserCompanion,
	getUsersSessions,
} from "@/lib/actions/create.learning";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import CompanionCard from "@/components/home/module/ui/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import RecentSession from "@/components/home/module/ui/RecentSession";
import { CompanionCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";


const page = async () => {
	const user = await currentUser();
	if (!user)  redirect("/sign-in");
	const companions = await getUserCompanion(user.id);
	const sessionFetch = await fetchLearningPartner({ limit: 3 });
	const history = await getUsersSessions(user.id);
	return (
		<main className=" px-4 py-8 lg:px-8 my-10">
	{/* Profile Header */}
	<section className="max-w-6xl mx-auto mb-12">
		<div className=" rounded-3xl shadow-sm border  dark:border-gray-700 overflow-hidden">
			{/* Minimal Cover Area */}
			<div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800 relative">
				<div className="absolute inset-0 bg-gray-900/10"></div>
			</div>
			
			{/* Profile Content */}
			<div className="px-8 pb-8">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between -mt-12 relative z-10">
					{/* Profile Image & Info */}
					<div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
						<div className="relative mb-6 lg:mb-0">
							<Image 
								src={user.imageUrl} 
								alt={user.firstName || "user"} 
								width={120} 
								height={120} 
								className="rounded-3xl ring-4 ring-white dark:ring-black shadow-lg mx-auto lg:mx-0" 
							/>
							<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white shadow-md"></div>
						</div>
						
						<div className="text-center lg:text-left">
							<h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
								{user.firstName} {user.lastName}
							</h1>
							<p className=" text-lg mb-4 py-2 ">
								{user.emailAddresses[0].emailAddress}
							</p>
							<div className="flex flex-wrap gap-2 justify-center lg:justify-start">
								<span className="px-4 py-2 text-gray-700 text-sm font-medium rounded-full">
									Pro Member
								</span>
								<span className="px-4 py-2  text-emerald-700 text-sm font-medium rounded-full">
									Active
								</span>
								<span className="px-4 py-2 text-amber-700 text-sm font-medium rounded-full">
									Top Learner
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	{/* Stats Grid */}
	<section className="max-w-6xl mx-auto mb-12">
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
			{/* Companions Stats */}
			<div className=" rounded-2xl shadow-sm border  p-6 hover:shadow-md transition-shadow">
				<div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12  rounded-xl flex items-center justify-center">
						<svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div>
						<h3 className="text-3xl font-bold ">
							{companions.data?.length}
						</h3>
						<p className=" text-sm font-medium">Companions</p>
					</div>
				</div>
				<div className="w-full  rounded-full h-2 mb-2">
					<div className=" h-2 rounded-full" style={{width: '78%'}}></div>
				</div>
				<p className=" text-xs">+12 this month</p>
			</div>

			{/* Lessons Stats */}
			<div className=" rounded-2xl shadow-sm border  dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
				<div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12  rounded-xl flex items-center justify-center">
						<svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<h3 className="text-3xl font-bold ">
							{history.data?.length}
						</h3>
						<p className=" text-sm font-medium">Lessons</p>
					</div>
				</div>
				<div className="w-full  rounded-full h-2 mb-2">
					<div className="bg-emerald-500 h-2 rounded-full" style={{width: '64%'}}></div>
				</div>
				<p className=" text-xs">+8 this week</p>
			</div>

			{/* Achievement Stats */}
			<div className=" rounded-2xl shadow-sm border  dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
				<div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12  rounded-xl flex items-center justify-center">
						<svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
						</svg>
					</div>
					<div>
						<h3 className="text-3xl font-bold ">24</h3>
						<p className=" text-sm font-medium">Achievements</p>
					</div>
				</div>
				<div className="w-full  rounded-full h-2 mb-2">
					<div className="bg-amber-500 h-2 rounded-full" style={{width: '89%'}}></div>
				</div>
				<p className="text-gray-500 text-xs">Almost there!</p>
			</div>

			{/* Time Stats */}
			<div className=" shadow-sm border  dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
				<div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
						<svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<h3 className="text-3xl font-bold ">127h</h3>
						<p className=" text-sm font-medium">Study Time</p>
					</div>
				</div>
				<div className="w-full  rounded-full h-2 mb-2">
					<div className="bg-rose-500 h-2 rounded-full" style={{width: '92%'}}></div>
				</div>
				<p className=" text-xs">12h this week</p>
			</div>
		</div>
	</section>

	{/* Learning Companions Section */}
	<section className="max-w-6xl mx-auto">
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
			<div>
				<h2 className="text-3xl font-bold  mb-2">Your Companions</h2>
				<p >Your AI-powered learning partners</p>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2 text-sm ">
					<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
					{sessionFetch.length} active companions
				</div>
				<Button className="px-6 py-3  bg-[#845fff] hover:bg-[#845fff]/90  text-white font-medium rounded-xl  transition-colors shadow-sm">
					+ Create New
				</Button>
			</div>
		</div>
		
		{/* Companions Grid */}
		{companions.data && companions.data.length > 0 ? (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{companions.data?.map((companion:CompanionCardProps, index:number) => (
					<div 
						key={companion.id} 
						className="bg-white rounded-2xl shadow-sm border  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
						style={{ animationDelay: `${index * 50}ms` }}
					>
						<CompanionCard 
							{...companion} 
							color={getSubjectColor(companion.subject!)} 
						/>
					</div>
				))}
			</div>
		) : (
			/* Empty State */
			<div className=" rounded-2xl border  dark:border-gray-600 p-16 text-center">
				<div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
					<svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
				</div>
				<h3 className="text-xl font-semibold mb-2">Create Your First Companion</h3>
				<p className=" mb-8 max-w-md mx-auto">
					Get started by creating an AI learning companion tailored to your needs and interests.
				</p>
				<Button className="px-8 py-4 bg-[#845fff] hover:bg-[#845fff]/90  text-white font-medium rounded-xl  transition-colors shadow-sm">
					Create Companion
				</Button>
			</div>
		)}
	</section>

	
</main>
	);
};

export default page;

export const metadata: Metadata = {
  title: "Your Journey | Wisera - AI Learning Companion",
  description: "Track your learning journey with Wisera. View your companions, sessions, and achievements in one place.",
};