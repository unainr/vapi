'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Users, History, Zap, Brain, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Create Your Companion",
      description: "Design unique AI companions with distinct personalities, voices, and conversation styles tailored to your preferences.",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Natural Voice Conversations",
      description: "Experience seamless voice interactions powered by advanced AI. Talk naturally as if speaking with a real person.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <History className="w-8 h-8" />,
      title: "Session History",
      description: "Track all your conversations and easily return to previous sessions. Your companion remembers your journey together.",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Sessions",
      description: "Start conversations instantly. Your AI companion is always ready to engage, learn, and grow with you.",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Adaptive Learning",
      description: "Your companion learns from every interaction, becoming more personalized and understanding over time.",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "All conversations are encrypted and secure. Your privacy and data protection are our top priorities.",
      gradient: "from-indigo-500/20 to-blue-500/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  return (
    <section className="py-6 px-6" id="features">
      <div className=" mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-[#845fff]">Wisera</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of AI companionship with features designed for meaningful connections.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card className="border-2 border-border/50 hover:border-primary/30 transition-all duration-500 h-full group relative overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardContent className="p-8 text-center h-full flex flex-col relative z-10">
                  {/* Floating icon container */}
                  <motion.div 
                    className="relative mb-6 mx-auto"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-card border border-border/50 rounded-2xl flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300  group-hover:shadow-lg group-hover:shadow-primary/20">
                      <div className="text-[#845fff]">
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors flex-shrink-0">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;