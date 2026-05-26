'use client';

import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Server, Palette, Award, Coffee } from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';

const skills = [
  {
    category: 'Frontend',
    icon: Globe,
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js'],
    color: 'text-blue-400',
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB'],
    color: 'text-green-400',
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo'],
    color: 'text-purple-400',
  },
  {
    category: 'DevOps',
    icon: Database,
    technologies: ['Docker', 'AWS', 'Vercel', 'Git', 'CI/CD', 'Nginx'],
    color: 'text-orange-400',
  },
  {
    category: 'Design',
    icon: Palette,
    technologies: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX', 'Prototyping'],
    color: 'text-pink-400',
  },
  {
    category: 'Languages',
    icon: Code,
    technologies: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
    color: 'text-yellow-400',
  },
];

const achievements = [
  {
    title: '50+ Projects Delivered',
    description: 'Successfully completed projects ranging from small websites to enterprise applications',
    icon: Award,
  },
  {
    title: '10k+ Blog Readers',
    description: 'Monthly readership on technical articles and tutorials',
    icon: Globe,
  },
  {
    title: '5+ Years Experience',
    description: 'Professional experience in full-stack development',
    icon: Coffee,
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              About Me
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              I&apos;m a passionate full-stack developer who loves creating beautiful, 
              functional, and user-friendly applications. Here&apos;s a bit more about my journey, 
              skills, and what drives me in the world of technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass border-gradient rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
              My Story
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                My journey into technology began during my computer science studies, where I discovered 
                the magic of turning ideas into digital reality. What started as curiosity about how 
                websites work evolved into a deep passion for creating exceptional user experiences.
              </p>
              <p>
                Over the years, I&apos;ve had the privilege of working on diverse projects - from sleek 
                e-commerce platforms to complex enterprise applications. Each project has taught me 
                something new and reinforced my belief that great software is built at the intersection 
                of technical excellence and human empathy.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me writing technical articles, experimenting with 
                new technologies, or contributing to open-source projects. I believe in the power of 
                sharing knowledge and giving back to the developer community that has taught me so much.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Skills & Technologies
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              The tools and technologies I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                className="glass border-gradient rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                  <h3 className="text-xl font-bold text-[var(--color-text)]">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[var(--color-background)] text-[var(--color-text-secondary)] text-sm rounded-full border border-[var(--color-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
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
              Achievements
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Some milestones I&apos;m proud of
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center glow">
                  <achievement.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                  {achievement.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              What Drives Me
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Continuous Learning',
                description: 'Technology evolves rapidly, and I believe in staying curious and constantly learning new things.',
              },
              {
                title: 'User-Centric Design',
                description: 'Great software starts with understanding user needs and creating intuitive experiences.',
              },
              {
                title: 'Clean Code',
                description: 'Writing maintainable, readable code that other developers can understand and build upon.',
              },
              {
                title: 'Community Impact',
                description: 'Sharing knowledge, mentoring others, and contributing to the developer community.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass border-gradient rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  {value.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
