'use client';
import { motion } from "framer-motion";
import { UserPlus, MessageCircle, Settings, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Create Your Account",
      description: "Sign up in seconds and customize your profile to get started with your AI companion journey.",
      step: "01"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Design Your Companion",
      description: "Choose personality traits, voice preferences, and conversation styles to create your perfect AI companion.",
      step: "02"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Start Conversations",
      description: "Begin natural voice conversations instantly. Your companion learns and adapts to your communication style.",
      step: "03"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Build Relationships",
      description: "Develop meaningful connections through continuous interactions and watch your companion evolve.",
      step: "04"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How Wisera <span className="text-[#845fff]"> Works</span> 
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with your AI companion in just four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#845fff]/50 to-violet-300/70" />
              )}
              
              <motion.div
                className="text-center relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#845fff]/10 rounded-full flex items-center justify-center border border-primary/20">
                  <span className="text-[#845fff] font-bold text-sm">{step.step}</span>
                </div>
                
                {/* Icon container */}
                <motion.div
                  className="w-20 h-20 bg-card border border-border/50 rounded-2xl  flex items-center justify-center mx-auto mb-6 group-hover:border-[#845fff]/50 transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-[#845fff]">
                    {step.icon}
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-[#845fff] transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;