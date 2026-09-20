import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ fullName: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[rgb(13, 13, 13)] text-foreground contact">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="hero-text">Contact Us</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="glass-card rounded-2xl p-8 border border-neon-green/20 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Full Name
              </label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-secondary border-border focus:border-neon-green/50 focus:ring-neon-green/20 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-secondary border-border focus:border-neon-green/50 focus:ring-neon-green/20 transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-secondary border-border focus:border-neon-green/50 focus:ring-neon-green/20 transition-all duration-200 resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary hover:shadow-neon-strong transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Support Email */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-6 border border-neon-green/20 inline-block">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-neon-green" />
              <span className="text-muted-foreground">
                Or email us directly at:
              </span>
              <a
                href="mailto:kunal34255@gmail.com"
                className="text-neon-green hover:text-neon-blue transition-colors duration-200 font-medium"
              >
                kunal34255@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex justify-center gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-neon-green hover:text-neon-blue transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Link>
            <Link
              to="/terms-privacy"
              className="text-muted-foreground hover:text-neon-green transition-colors duration-200"
            >
              Terms & Privacy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
