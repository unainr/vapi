'use client';
import { motion } from "framer-motion";
import { Users, MessageSquare, Clock, Star } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "50K+",
      label: "Active Users",
      description: "Growing community"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      value: "2M+",
      label: "Conversations",
      description: "Daily interactions"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "24/7",
      label: "Availability",
      description: "Always online"
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: "4.9",
      label: "User Rating",
      description: "Highly rated"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 " />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl  font-bold mb-4">
            Trusted by <span className="text-[#845fff]">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join our growing community of AI companion enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <div className="text-[#845fff]">
                  {stat.icon}
                </div>
              </motion.div>
              
              <motion.div
                className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              
              <h3 className="font-semibold text-foreground mb-1">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;