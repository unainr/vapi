'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does Wisera's AI companion technology work?",
      answer: "Wisera uses advanced AI and natural language processing to create companions that can engage in meaningful voice conversations. Our technology learns from interactions to provide personalized and contextually aware responses."
    },
    {
      question: "Can I customize my AI companion's personality?",
      answer: "Absolutely! You can customize your companion's personality traits, conversation style, voice preferences, and interests to create a unique experience tailored to your preferences."
    },
    {
      question: "Is my conversation data secure and private?",
      answer: "Yes, we take privacy seriously. All conversations are encrypted and stored securely. We never share your personal data with third parties, and you have full control over your information."
    },
    {
      question: "How does session history work?",
      answer: "Your companion remembers previous conversations and can reference past interactions to maintain continuity. You can easily access and return to previous sessions to continue where you left off."
    },
    {
      question: "Can I use Wisera on multiple devices?",
      answer: "Yes! Your companion and conversation history sync across all your devices. Start a conversation on your phone and continue it on your computer seamlessly."
    },
    {
      question: "What makes Wisera different from other AI chatbots?",
      answer: "Wisera focuses on creating genuine relationships through natural voice conversations, persistent memory, and personalized interactions. Unlike simple chatbots, our companions evolve and grow with you over time."
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-[#845fff]">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Wisera
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-6 bg-card/50 hover:bg-card transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-[#845fff] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;