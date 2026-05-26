'use client';

import { motion } from 'framer-motion';
import { heroContent } from '../config/hero';
import { Github, Linkedin, Mail, MapPin, ArrowDown } from 'lucide-react';

// Create a mapping of icon names to their components
const iconComponents = {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowDown
} as const;

export function HeroSection() {
  const { 
    name, 
    title, 
    location, 
    description, 
    avatar, 
    socialLinks, 
    cta 
  } = heroContent;

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${avatar.gradient} p-1 glow`}
        >
          <div className="w-full h-full rounded-full bg-[var(--color-surface)] flex items-center justify-center text-4xl font-bold text-gradient">
            {avatar.initials}
          </div>
        </motion.div>
        
        {/* Name and Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gradient"
          >
            {name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl mx-auto"
          >
            {title}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center space-x-2 text-[var(--color-text-secondary)]"
          >
            <MapPin size={16} />
            <span>{location}</span>
          </motion.div>
        </div>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
        
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center justify-center space-x-6"
        >
          {socialLinks.map((social) => {
            const IconComponent = iconComponents[social.icon as keyof typeof iconComponents];
            return (
              <motion.a
                key={social.platform}
                href={social.url}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass border-gradient rounded-full glow hover:text-[var(--color-primary)] transition-colors duration-200"
                aria-label={social.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent size={24} />
              </motion.a>
            );
          })}
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <button
            onClick={() => {
              document.getElementById(cta.target)?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="group inline-flex items-center space-x-2 px-8 py-4 bg-[var(--color-primary)] text-black font-medium rounded-full hover:bg-[var(--color-accent)] transition-all duration-300 glow"
          >
            <span>{cta.text}</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
