'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Search, BookOpen, TrendingUp, MessageSquare, Eye } from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';
import { blogPosts, type BlogPost } from '@/data/blog';

const categories = [
  { id: 'all', label: 'All Posts', icon: BookOpen },
  { id: 'tutorial', label: 'Tutorials', icon: BookOpen },
  { id: 'opinion', label: 'Opinions', icon: MessageSquare },
  { id: 'review', label: 'Reviews', icon: Eye },
  { id: 'news', label: 'News', icon: TrendingUp },
];

const categoryColors = {
  tutorial: 'text-blue-400',
  opinion: 'text-green-400',
  review: 'text-purple-400',
  news: 'text-orange-400',
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterPosts(category, searchTerm);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterPosts(selectedCategory, term);
  };

  const filterPosts = (category: string, search: string) => {
    let filtered = blogPosts;
    
    if (category !== 'all') {
      filtered = filtered.filter(post => post.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
  };

  const featuredPosts = blogPosts.filter(post => post.featured);

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
              My Blog
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Thoughts, tutorials, and insights about web development, technology trends, 
              and my journey as a developer. Join me as I share what I've learned along the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
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
              Featured Articles
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              My most popular and impactful posts
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
                className="glass border-gradient rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-sm rounded-full bg-[var(--color-background)] ${categoryColors[post.category]}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  <div className="flex items-center space-x-4 text-[var(--color-text-secondary)] text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center space-x-1 px-2 py-1 bg-[var(--color-background)] text-[var(--color-text-secondary)] text-xs rounded border border-[var(--color-border)]"
                    >
                      <Tag size={10} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
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
              All Articles
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Browse through my complete collection of articles
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
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
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                className="glass border-gradient rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-sm rounded-full bg-[var(--color-background)] ${categoryColors[post.category]}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  {post.featured && (
                    <span className="px-2 py-1 bg-[var(--color-primary)] text-black text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] text-xs mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-secondary)] text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-secondary)] text-xs rounded">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                No articles found
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
