"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
				<Link href="/" className="flex items-center space-x-2 shrink-0">
					<span className="relative z-10 text-xl sm:text-2xl font-black tracking-tighter">
						<span className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
							L
						</span>
						<span className="bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 bg-clip-text text-transparent">
							inkify
						</span>
						<span className="absolute -right-1.5 -top-1.5 h-2 w-2 animate-ping rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-75" />
						<span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-md" />
					</span>
				</Link>

				<nav className="hidden md:flex items-center gap-4 lg:gap-6">
					<Link href="/" className="text-sm font-medium text-gray-500 dark:text-white hover:text-primary">
						Home
					</Link>
					<Link href="/learning-ai" className="text-sm font-medium text-gray-500 dark:text-white hover:text-primary">
						Learning
					</Link>
					<Link href="#testimonials" className="text-sm font-medium text-gray-500 dark:text-white hover:text-primary">
						Testimonials
					</Link>
					<Link href="/pricing" className="text-sm font-medium text-gray-500 dark:text-white hover:text-primary">
						Pricing
					</Link>
				</nav>

				<div className="hidden md:flex items-center gap-2">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<Button variant={"outline"} asChild className="rounded-lg">
							<Link href="/sign-in">Get Started</Link>
						</Button>
					</SignedOut>
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
									<Button variant={'outline'} asChild className="rounded-lg w-full text-xs">
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
