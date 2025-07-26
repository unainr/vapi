"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../ui/mode-toggle";
import Logo from "./Logo";

export default function MainHeader() {
	const [isScrolled, setIsScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-200 ${
				isScrolled ? "bg-background/60 backdrop-blur-md" : ""
			}`}>
			<div className="mx-auto max-w-screen-xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				<Logo/>

				<nav className="hidden md:flex items-center gap-4 lg:gap-6">
					<Link
						href="/"
						className="text-sm font-medium  hover:text-primary">
						Home
					</Link>
					<Link
						href="/create-companion"
						className="text-sm font-medium  hover:text-primary">
						Create Companion
					</Link>
					<Link
						href="/learning-ai"
						className="text-sm font-medium  hover:text-primary">
						Learning
					</Link>
					<Link
						href="/journey"
						className="text-sm font-medium  hover:text-primary">
						My Journey
					</Link>
					<Link
						href="/pricing"
						className="text-sm font-medium  hover:text-primary">
						Pricing
					</Link>
				</nav>

				<div className="hidden md:flex items-center gap-2">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<Button  asChild className="rounded-lg bg-[#845fff] hover:bg-[#845fff]/90  text-white">
							<Link href="/sign-in">Get Started</Link>
						</Button>
					</SignedOut>
					<ModeToggle />
				</div>

				{/* Mobile Menu Trigger */}
				<div className="md:hidden flex items-center">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[250px] sm:w-[300px]">
							<nav className="flex flex-col gap-4 mt-8 items-center">
								<Link href="/" className="text-sm font-medium">
									Home
								</Link>
								<Link href="/learning-ai" className="text-sm font-medium">
									Learning
								</Link>
								<Link href="#testimonials" className="text-sm font-medium">
									Testimonials
								</Link>
								<Link href="/pricing" className="text-sm font-medium">
									Pricing
								</Link>
								<SignedIn>
									<UserButton />
								</SignedIn>
								<SignedOut>
									<Button
										variant={"outline"}
										asChild
										className="rounded-lg w-full text-xs">
										<Link href="/sign-in">Login</Link>
									</Button>
								</SignedOut>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
