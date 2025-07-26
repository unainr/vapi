import CTA from "@/components/home/module/ui/CallToAction";
import FAQ from "@/components/home/module/ui/FAQ";
import Features from "@/components/home/module/ui/Features";
import FurigHero from "@/components/home/module/ui/FurigHero";
import HowItWorks from "@/components/home/module/ui/HowItsWork";
import RecentSession from "@/components/home/module/ui/RecentSession";
import Stats from "@/components/home/module/ui/States";
import EtherealBeamsHero from "@/components/home/module/ui/TestHero";
import TestimonialsMain from "@/components/home/module/ui/testimonial-main";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
	return (
		<>
		{/* <HeroSection/> */}
		{/* <FurigHero/> */}
		<EtherealBeamsHero />
		<Stats/>
		<RecentSession/>
		<Features/>
		<HowItWorks/>
		<TestimonialsMain/>
		<FAQ/>
		<CTA/>
		</>
	);	
};

export default Home;
export const revalidate = 0;
