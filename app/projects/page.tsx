'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter, Globe, Smartphone, Code, Database } from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';
import { projects, type Project } from '@/data/projects';

const categories = [
  { id: 'all', label: 'All Projects', icon: Code },
  { id: 'web', label: 'Web Apps', icon: Globe },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'fullstack', label: 'Full Stack', icon: Database },
  { id: 'opensource', label: 'Open Source', icon: Github },
];

const categoryColors = {
  web: 'text-blue-400',
  mobile: 'text-purple-400',
  fullstack: 'text-green-400',
  opensource: 'text-yellow-400',
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  const featuredProjects = projects.filter(project => project.featured);

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
              My Projects
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              A showcase of my work spanning web applications, mobile apps, and open-source contributions. 
              Each project represents a unique challenge and learning opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Featured Work
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Highlighted projects that showcase my best work
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
                className="glass border-gradient rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-sm rounded-full bg-[var(--color-background)] ${categoryColors[project.category]}`}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  <span className="text-[var(--color-text-secondary)] text-sm">{project.year}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                  {project.title}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {project.longDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[var(--color-primary)] text-black text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="flex items-center space-x-2 px-4 py-2 glass border-gradient rounded-lg hover:bg-[var(--color-surface)] transition-colors duration-200"
                    >
                      <Github size={16} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
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
              All Projects
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Browse through my complete portfolio
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[var(--color-primary)] text-black'
                      : 'glass border-gradient hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <category.icon size={16} />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                className="glass border-gradient rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-sm rounded-full bg-[var(--color-background)] ${categoryColors[project.category]}`}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  <span className="text-[var(--color-text-secondary)] text-sm">{project.year}</span>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  {project.title}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-secondary)] text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-secondary)] text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-[var(--color-primary)] text-black text-sm rounded-lg hover:bg-[var(--color-accent)] transition-colors duration-200"
                    >
                      <ExternalLink size={14} />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 glass border-gradient text-sm rounded-lg hover:bg-[var(--color-surface)] transition-colors duration-200"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
