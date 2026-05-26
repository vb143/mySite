'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette, Home, User, BookOpen, Code, Gamepad2 } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { themes, type ThemeVariant } from '@/lib/themes';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/projects', label: 'Projects', icon: Code },
  { href: '/fun', label: 'Fun', icon: Gamepad2 },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const { themeVariant, setThemeVariant } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur' : 'bg-[var(--color-background)] bg-opacity-80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gradient"
            >
              VL
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 glow"
              >
                <Palette size={20} />
              </button>
              
              <AnimatePresence>
                {showThemeSelector && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 glass border-gradient rounded-lg p-4 shadow-lg"
                  >
                    <h3 className="text-sm font-medium mb-3 text-[var(--color-text)]">
                      Choose Theme
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(themes).map(([key, theme]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setThemeVariant(key as ThemeVariant);
                            setShowThemeSelector(false);
                          }}
                          className={`p-3 rounded-lg text-left transition-all duration-200 ${
                            themeVariant === key
                              ? 'bg-[var(--color-primary)] text-black'
                              : 'hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                          }`}
                        >
                          <div className="font-medium text-sm">{theme.name}</div>
                          <div className="text-xs opacity-75">{theme.description}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass rounded-lg mt-2 p-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                {/* Mobile Theme Selector */}
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <h3 className="text-sm font-medium mb-3 text-[var(--color-text)]">
                    Choose Theme
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(themes).map(([key, theme]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setThemeVariant(key as ThemeVariant);
                          setIsOpen(false);
                        }}
                        className={`p-3 rounded-lg text-left transition-all duration-200 ${
                          themeVariant === key
                            ? 'bg-[var(--color-primary)] text-black'
                            : 'hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                        }`}
                      >
                        <div className="font-medium text-sm">{theme.name}</div>
                        <div className="text-xs opacity-75">{theme.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
