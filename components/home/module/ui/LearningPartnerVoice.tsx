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

		const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

		const onMessage = (message:Message) => {
			if(message.type === 'transcript' && message.transcirptType === 'final'){
				const newMessage = {role:message.role,content:message.transcirpt

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
		<section className="flex flex-col gap-4 h0-[70vh]">
			<section className="flex gap-8 max-sm:flex-col">
				<div className="flex ">
					<div
						style={{ backgroundColor: getSubjectColor(subject || "") }}
						className="w-16 h-16 flex items-center justify-center rounded-xl flex-shrink-0">
						<div
							className={cn(
								"absolute transition-opacity duration-1000",
								callStatus === CallStatus.FINISHED ||
									callStatus === CallStatus.INACTIVE
									? "opacity-1001"
									: "opacity-0",
								callStatus === CallStatus.CONNECTION &&
									"opacity-100 animate-pulse"
							)}></div>
						<div
							className={cn(
								"absolute transition-opacity duration-1000",
								callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
							)}>
							<Lottie
								lottieRef={lottieRef}
								animationData={soundwaves}
								autoplay={false}
							/>
						</div>
					</div>

					<p>{name}</p>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-col gap-2">
						<Image
							src={userImage}
							alt={userName}
							width={130}
							height={130}
							className="rounded-full"
						/>
						<p>{userName}</p>
					</div>
					<Button className="btn-mic" onClick={toggleMicroPhone} disabled={callStatus !== CallStatus.ACTIVE}>
						{isMuted ? <MicOff /> : <Mic />}
						 {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
					</Button>

					 <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTION && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleConnect}>
                        {callStatus === CallStatus.ACTIVE
                        ? "End Session"
                        : callStatus === CallStatus.CONNECTION
                            ? 'Connecting'
                        : 'Start Session'
                        }
                    </button>
				</div>
			</section>

			<section className="transcirpt">
				<div>
					{messages.map((message) => { 
						if(message.role=== 'assistant'){
							return (
								<p className="max-sm:text-sm" key={message.content}>
									{name?.split(' ')[0].replace('/[.,]/g, ', '')}:{message.content}
								</p>
							)
							
						}else{
								return(<p className="text-primary max-sm:text-sm" key={message.content}>
									{userName}:{message.content}
								</p>)
							}

					 })}
				</div>
				<div className="transcript-fade" />
			</section>
		</section>
	);
};

export default LearningPartnerVoice;
