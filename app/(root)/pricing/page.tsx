import { PricingTable } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'

const Pricing = () => {
  return (
   <section className="w-full bg-background py-20 lg:py-28">
  <div className="container mx-auto px-4 max-w-5xl text-center">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
      Upgrade to <span className="text-[#845fff]">Pro</span>
    </h1>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
      Choose a plan that fits your learning journey. Get access to more sessions, premium companions, and advanced features.
    </p>

   
      <PricingTable />
    
  </div>
</section>

  )
}

export default Pricing


export const metadata: Metadata = {
  title: "Pricing | Wisera AI Companion for Learning and Growth ",
  description: "Choose a plan that fits your learning journey. Get access to more sessions, premium companions, and advanced features.",
};