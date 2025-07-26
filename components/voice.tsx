import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";

export const VoiceVisualizer: FC<{ isActive?: boolean }> = ({ isActive = true }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

   useEffect(() => {
    if (audioRef.current) {
      if (isActive) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/voices/final.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="flex items-end gap-1.5">
        {[4, 6, 8, 10, 7, 5, 3].map((height, index) => (
          <motion.div
            key={index}
            className="w-1.5 bg-gradient-to-t from-purple-500 to-blue-400 rounded-sm"
            style={{ height: `${height * 4}px` }}
            animate={isActive ? {
              scaleY: [1, 1.5, 0.8, 1.2, 1],
              opacity: [0.7, 1, 0.8, 0.9, 0.7]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};