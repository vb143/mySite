'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { Timeline } from '@/components/ui/timeline';
import { timelineEvents } from '@/data/timeline';
import { HeroSection } from './components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_50%)] opacity-10" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <HeroSection />
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[var(--color-primary)] rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-[var(--color-primary)] rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Journey Section */}
      <section id="journey" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              My Journey
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              A cinematic timeline of my life, career, and adventures in technology
            </p>
          </motion.div>
          
          <Timeline events={timelineEvents} />
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="py-20 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Explore More
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Dive deeper into my work, thoughts, and creative projects
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'About Me',
                description: 'Learn more about my background, skills, and passions',
                href: '/about',
                icon: '👨‍💻',
              },
              {
                title: 'Blog',
                description: 'Technical articles, tutorials, and thoughts on development',
                href: '/blog',
                icon: '📝',
              },
              {
                title: 'Projects',
                description: 'Showcase of my latest work and side projects',
                href: '/projects',
                icon: '🚀',
              },
              {
                title: 'Fun Stuff',
                description: 'Games, experiments, and creative coding adventures',
                href: '/fun',
                icon: '🎮',
              },
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                className="group p-6 glass border-gradient rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {item.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
