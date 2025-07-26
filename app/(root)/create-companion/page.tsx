import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermission } from '@/lib/actions/create.learning';
import FormBuild from '@/components/home/module/ui/Form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
const CreateCompanion = async () => {
        const {userId} = await auth()
        if(!userId) redirect("/sign-in");
        const canCreateCompanion = await newCompanionPermission()
  return (
  <div className="flex flex-col items-center justify-center my-30 px-4 md:px-20">
  {canCreateCompanion ? (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-foreground">
        Create a New Learning <span className='text-[#845fff]'>Companion</span>
      </h2>
      <FormBuild />
    </>
  ) : (
    <div className="w-full max-w-lg mx-auto p-6 border border-border rounded-2xl bg-muted shadow-sm text-center space-y-4">
  <h2 className="text-2xl font-semibold text-foreground">
    Companion Limit Reached
  </h2>
  <p className="text-muted-foreground text-base">
    You’ve reached the limit of free companions. Upgrade your plan to unlock more learning power and create additional companions.
  </p>
  <Link href="/pricing" >
  <Button className="w-full" variant="default" size="lg">
    Upgrade Plan
  </Button>
  </Link>
</div>

  )}
</div>

  )
}

export default CreateCompanion
// export const revalidate = 0;

export const metadata: Metadata = {
  title: "Create Companion | Wisera - AI Learning Companion",
  description: "Create your own AI learning companion to enhance your study experience. Customize its personality, voice, and teaching style to suit your needs.",
};