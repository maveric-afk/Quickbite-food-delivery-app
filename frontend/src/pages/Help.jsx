import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MessageCircle, ChevronDown } from "lucide-react"
import { useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order in the 'Orders' section of the app. You'll see real-time updates on your food preparation and delivery status.",
  },
  {
    question: "What should I do if my food is delayed?",
    answer:
      "Contact our support team via chat or call. We take delays seriously and will help resolve the issue or provide compensation if needed.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, orders can be canceled before the restaurant starts preparing them. Once preparation begins, cancellation may not be possible, but you can contact support for assistance.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refunds are processed within 2-5 business days depending on the payment method. For urgent refund requests, please contact our support team directly.",
  },
]

const contactOptions = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Reach our support team at +91-9461089817",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "guptachirag965@gmail.com",
  },
  {
    icon: MessageCircle,
    title: "Chat With Us",
    description: "Use our in-app chat for instant help",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Help() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="min-h-screen bg-black p-2">
      <Navbar/>

      {/* Header Section */}
      <motion.section
        className="bg-black text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Need Help?
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 text-balance"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We're here to make your QuickBite experience smooth and delicious.
          </motion.p>
          <motion.div
            className="mt-8 h-1 w-16 bg-orange-600 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </div>
      </motion.section>

      {/* Contact Options Section */}
      <motion.section
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black" variants={itemVariants}>
            Get in Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {contactOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(234, 88, 12, 0.15)",
                  }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-lg mb-6"
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-black mb-3">{option.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{option.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-black text-left">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5 text-orange-600" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
     <Footer/>
    </div>
  )
}
