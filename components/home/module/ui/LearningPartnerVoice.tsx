"use client";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { CompanionProps, SavedMessage } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { companionSessionHistory } from "@/lib/actions/create.learning";
enum CallStatus {
	INACTIVE = "INACTIVE",
	CONNECTION = "CONNECTION",
	ACTIVE = "ACTIVE",
	FINISHED = "FINISHED",
}

const LearningPartnerVoice = ({
	companionId,
	subject,
	teaching_subject,
	name,
	userName,
	userImage,
	voice_type,
	speaking_style,
}: CompanionProps) => {
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
	const [isSpeaking, setisSpeaking] = useState(false);
	const lottieRef = useRef<LottieRefCurrentProps>(null);
const [messages, setMessages] = useState<SavedMessage[]>([]);
	const [isMuted, setIsMuted] = useState(false);
	useEffect(() => {
		if (lottieRef) {
			if (isSpeaking) {
				lottieRef.current?.play();
			} else {
				lottieRef.current?.stop();
			}
		}
	}, [isSpeaking]);

	useEffect(() => {
		const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

		const onCallEnd = () => {setCallStatus(CallStatus.FINISHED)
        companionSessionHistory(companionId)
            
        };

		const onMessage = (message:Message) => {
			if(message.type === 'transcript' && message.transcriptType   === 'final'){
				const newMessage = {role:message.role,content:message.transcript

				}
				setMessages((prev)=>[newMessage, ...prev]);
			}
		};

		const onspeechStart = () => setisSpeaking(true);
		const onspeechEnd = () => setisSpeaking(false);

		const onError = (error: Error) => console.log(error);

		vapi.on("call-start", onCallStart);
		vapi.on("call-end", onCallEnd);
		vapi.on("message", onMessage);
		vapi.on("error", onError);
		vapi.on("speech-start", onspeechStart);
		vapi.on("speech-end", onspeechEnd);

		return () => {
			vapi.off("call-start", onCallStart);
			vapi.off("call-end", onCallEnd);
			vapi.off("message", onMessage);
			vapi.off("error", onError);
			vapi.off("speech-start", onspeechStart);
			vapi.off("speech-end", onspeechEnd);
		};
	}, []);
	const toggleMicroPhone = () => {
		const isMuted = vapi.isMuted();
		vapi.setMuted(!isMuted);
		setIsMuted(!isMuted);
	};

	const handleConnect = async () => {
		setCallStatus(CallStatus.CONNECTION);

		const assistantOverrides = {
			variableValues: { subject, teaching_subject, voice_type },
			clientMessages: ["transcript"],
			serverMessages: [],
		};

		// @ts-expect-error
		vapi.start(configureAssistant(voice_type, teaching_subject), assistantOverrides);
	};
	const handleDisconnect = async () => {
		setCallStatus(CallStatus.FINISHED);
		vapi.stop();
	};
	return (
		<section className="flex flex-col gap-4 min-h-[100dvh]  rounded-xl overflow-hidden">
    {/* Main Meeting Interface */}
     <section className="flex flex-col lg:flex-row flex-1 gap-4 p-4">
        {/* Left Side - Companion Video/Avatar */}
        <div className="flex-1 bg-slate-100 dark:bg-gray-800/40  w-full rounded-xl relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative">
                {/* Companion Avatar/Video Area */}
                <div className="flex flex-col items-center justify-center h-full">
                    <div
                        style={{ backgroundColor: getSubjectColor(subject || "") }}
                        className="w-32 h-32 flex items-center justify-center rounded-full my-2 mb-5 relative shadow-2xl">
                        
                        {/* Static State */}
                        <div
                            className={cn(
                                "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                                callStatus === CallStatus.FINISHED ||
                                    callStatus === CallStatus.INACTIVE
                                    ? "opacity-100"
                                    : "opacity-0"
                            )}>
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <Mic className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        {/* Connecting State */}
                        <div
                            className={cn(
                                "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                                callStatus === CallStatus.CONNECTION
                                    ? "opacity-100"
                                    : "opacity-0"
                            )}>
                            <div className="w-16 h-16 rounded-full bg-white/30 animate-pulse flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full animate-bounce" />
                            </div>
                        </div>

                        {/* Active State with Lottie */}
                        <div
                            className={cn(
                                "absolute inset-0 transition-opacity duration-500",
                                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                            )}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                    
                    {/* Companion Name */}
                    <h3 className=" text-xl font-semibold mb-2">{name}</h3>
                    <p className="italic text-sm capitalize">{subject} • {teaching_subject}</p>
                    
                    {/* Status Badge */}
                    <div className={cn(
                        "mt-3 px-3 py-1 rounded-full text-xs font-medium",
                        callStatus === CallStatus.ACTIVE ? "bg-green-500 text-white" : 
                        callStatus === CallStatus.CONNECTION ? "bg-yellow-500 text-white animate-pulse" : 
                        "bg-gray-500 text-white"
                    )}>
                        {callStatus === CallStatus.ACTIVE ? "● Live" : 
                         callStatus === CallStatus.CONNECTION ? "● Connecting..." : 
                         "● Offline"}
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side - User Panel */}
        <div className="w-80 flex flex-col gap-4">
            {/* User Video/Avatar Box */}
            <div className="dark:bg-gray-800/40 bg-slate-100  shadow rounded-xl p-4 flex-shrink-0">
                <div className="flex flex-col items-center">
                    <div className="relative mb-3">
                        <Image
                            src={userImage}
                            alt={userName}
                            width={120}
                            height={120}
                            className="rounded-full border-2 border-gray-600 shadow-lg"
                        />
                        {/* User Status Indicator */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-gray-800 flex items-center justify-center">
                            <div className="w-3 h-3  rounded-full" />
                        </div>
                    </div>
                    <h4 className=" font-medium text-lg">{userName}</h4>
                    <p className="text-gray-400 text-sm">You</p>
                </div>
            </div>

            {/* Controls Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex-shrink-0">
                <div className="space-y-3">
                    {/* Microphone Control */}
                    <Button 
                        className={cn(
                            "w-full flex items-center cursor-pointer justify-center gap-3 h-12 text-base font-medium transition-all duration-200",
                            isMuted 
                                ? "bg-red-500 hover:bg-red-600 text-white" 
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                        )}
                        onClick={toggleMicroPhone} 
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                    </Button>

                    {/* Session Control Button */}
                    <button 
                        className={cn(
                            'w-full flex items-center justify-center cursor-pointer gap-3 h-14 rounded-lg font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]',
                            callStatus === CallStatus.ACTIVE 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-[#845fff] hover:bg-[#845fff]/80 text-white',
                            callStatus === CallStatus.CONNECTION && 'animate-pulse cursor-not-allowed'
                        )} 
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleConnect}
                        disabled={callStatus === CallStatus.CONNECTION}
                    >
                        {callStatus === CallStatus.ACTIVE ? (
                            <>
                                <div className="w-3 h-3 bg-white rounded-sm" />
                                End Session
                            </>
                        ) : callStatus === CallStatus.CONNECTION ? (
                            <>
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                                Connecting...
                            </>
                        ) : (
                            <>
                                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1" />
                                Start Session
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Transcript Section */}
          
		{/* Enhanced Transcript Section */}



        </div>
    </section>
<section className="transcript bg-slate-100 dark:bg-gray-800/40  dark:to-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl p-6  overflow-y-auto relative shadow-inner">
    {/* Header */}
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Live Transcript</h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-gray-700 px-3 py-1 rounded-full">
            {messages.length} messages
        </div>
    </div>

    {/* Messages Container */}
    <div className="space-y-4">
        {messages.map((message, index) => { 
            if(message.role === 'assistant'){
                return (
                    <div key={`${message.content}-${index}`} className="flex items-start gap-4 animate-fade-in">
                        {/* Assistant Avatar */}
                        <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg flex-shrink-0 mt-1"
                            style={{ backgroundColor: getSubjectColor(subject || "") }}
                        >
                            {name?.split(' ')[0]?.charAt(0) || 'A'}
                        </div>
                        
                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {name?.split(' ')[0]?.replace(/[.,]/g, '') || 'Assistant'}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                            <div className="bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 dark:border-gray-600 relative">
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                {/* Message tail */}
                                <div className="absolute -left-2 top-4 w-0 h-0 border-r-8 border-r-white dark:border-r-gray-700 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={`${message.content}-${index}`} className="flex items-start gap-4 flex-row-reverse animate-fade-in">
                        {/* User Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-lg flex-shrink-0 mt-1">
                            {userName?.charAt(0) || 'U'}
                        </div>
                        
                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-row-reverse">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {userName || 'You'}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm relative">
                                <p className="text-sm leading-relaxed max-sm:text-sm">{message.content}</p>
                                {/* Message tail */}
                                <div className="absolute -right-2 top-4 w-0 h-0 border-l-8 border-l-blue-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                            </div>
                        </div>
                    </div>
                )
            }
        })}
    </div>

    {/* Enhanced fade effect */}
    <div className="transcript-fade absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent dark:from-gray-800 pointer-events-none rounded-b-xl"></div>
    
    {/* Scroll indicator */}
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-slate-300 dark:bg-gray-600 rounded-full opacity-30"></div>
</section>
</section>


	);
};

export default LearningPartnerVoice;
