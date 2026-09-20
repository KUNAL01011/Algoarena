import React from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kunal Kumar",
      role: "Beginner turned Full-Stack Dev",
      quote:
        "The Explore page kept me coming back every day. It's addictive in the best way.",
      avatar: "KK",
      rating: 5,
    },
    {
      name: "Hitesh Choudhary",
      role: "Top 1% Coder on AlgoArena",
      quote: "This platform made me love coding again. The challenges are 🔥!",
      avatar: "HC",
      rating: 5,
    },
    {
      name: "Piyush Garg",
      role: "Senior Software Engineer",
      quote:
        "Finally found a platform that challenges me at my level. The algorithms section is fantastic!",
      avatar: "PG",
      rating: 5,
    },
    {
      name: "David K.",
      role: "CS Student",
      quote:
        "Went from struggling with arrays to solving complex tree problems. This platform works!",
      avatar: "DK",
      rating: 5,
    },
  ];

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
          <span className="hero-text">What Our Community Says</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join thousands of developers who are leveling up their coding skills
          with AlgoArena
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  className="glass-card rounded-2xl p-8 h-full border border-neon-green/20 backdrop-blur-lg relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-neon-blue/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative z-10">
                    <Quote className="w-8 h-8 text-neon-green mb-4 opacity-60" />

                    <p className="text-foreground mb-6 text-lg leading-relaxed line-clamp-3 h-24">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neon-gradient rounded-full flex items-center justify-center text-black font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-neon-green/30 hover:bg-neon-green/10 absolute left-0" />
          <CarouselNext className="border-neon-green/30 hover:bg-neon-green/10 absolute right-0" />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
