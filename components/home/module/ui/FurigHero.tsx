'use client'
import { motion } from "framer-motion";
import { FluidGradient } from "./HeroSection";
import { VoiceVisualizer } from "@/components/voice";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, MicOff, Users } from "lucide-react";

export default function FurigHero() {
    const [isVoiceActive, setIsVoiceActive] = useState(false);
   const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };
  return (
    <div className="h-svh w-screen flex items-center justify-center relative z-20">
      <FluidGradient/>
        <div className=" absolute items-center justify-center gap-6 text-center max-w-6xl mx-auto">
          
          {/* Main Hero Title with Voice Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col lg:flex-row items-center gap-4"
          >
            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight `}>
              <span className={`bg-gradient-to-r from-white via-gray-100 to-white  bg-clip-text text-transparent`}>
                Wisera
              </span>
            </h1>
            
            {/* Voice Visualizer */}
            <VoiceVisualizer isActive={isVoiceActive} />
          </motion.div>

          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="space-y-4 max-w-4xl"
          >
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-light leading-tight `}>
              Create Your Perfect AI Companion
            </h2>
            
            <p className={`text-lg md:text-xl leading-relaxed font-light `}>
              Experience natural voice conversations with intelligent AI companions tailored to your needs. 
              Build meaningful connections through advanced voice technology powered by VAPI.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
          
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-4"
            >
          <Link href={'create-companion'}>
            <Button 
           
              size="lg"
              className="flex items-center gap-3"
              >
              <Users className="w-5 h-5" />
              Choose Your Companion
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={toggleVoice}
              className="flex items-center gap-3"
            >
              {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              {isVoiceActive ? 'Stop Voice' : 'Start Voice Session'}
            </Button>
          </motion.div>

        

          {/* Status Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center gap-8 mt-8"
          >
            {/* Voice Ready Indicator */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
              </div>
              <span className={`text-sm font-medium tracking-wide `}>
                VOICE READY
              </span>
            </div>
            
            {/* AI Active Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300"></div>
              </div>
              <span className={`text-sm font-medium tracking-wide `}>
                AI ACTIVE
              </span>
            </div>

           
          </motion.div>
        </div>


    </div>
  );
}
