'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap, Heart, Star } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  location?: string;
  type: 'education' | 'work' | 'personal' | 'achievement';
  image?: string;
  tags?: string[];
}

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  personal: Heart,
  achievement: Star,
};

const typeColors = {
  education: 'text-blue-400',
  work: 'text-green-400',
  personal: 'text-pink-400',
  achievement: 'text-yellow-400',
};

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] opacity-30" />
      
      <div className="space-y-12">
        {events.map((event, index) => {
          const Icon = typeIcons[event.type];
          const colorClass = typeColors[event.type];
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex items-start space-x-8"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 rounded-full glass border-gradient flex items-center justify-center glow">
                  <Icon className={`w-6 h-6 ${colorClass}`} />
                </div>
              </div>
              
              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex-1 glass border-gradient rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-[var(--color-primary)] font-medium">{event.year}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-1 text-[var(--color-text-secondary)] text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                  {event.title}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {event.description}
                </p>
                
                {event.image && (
                  <div className="mt-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
