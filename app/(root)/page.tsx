import FormBuild from "@/components/home/module/ui/Form";
import { newCompanionPermission } from "@/lib/actions/create.learning";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
	const {userId} = await auth()
	if(!userId) redirect("/sign-in");
	const canCreateCompanion = await newCompanionPermission()
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-20 mx-20">
			{canCreateCompanion?(

				<FormBuild/>
			):(
				<h1>
					You have reached your limit of creating learning companions. Please upgrade your plan to create more.
				</h1>
			)

			}
			
		</div>
	);
};

export default Home;
