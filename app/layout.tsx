import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { dark } from "@clerk/themes";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title:
		"Wisera - AI Learning Companion Platform to Enhance Your Learning Experience",
	description:
		"Wisera is an AI-powered learning companion platform designed to enhance your learning experience by providing personalized support and resources tailored to your needs.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				variables: {
					colorPrimary: "#845fff",
					colorTextOnPrimaryBackground: "#ffffff",
				},
			}}>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<NextTopLoader
						color="#845fff"
						height={2}
						crawlSpeed={50}
						speed={1000}
						showSpinner={false}
					/>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
