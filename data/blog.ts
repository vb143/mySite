export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'tutorial' | 'opinion' | 'review' | 'news';
  tags: string[];
  publishedAt: string;
  readTime: number | string;
  featured: boolean;
  author: string;
  coverImage?: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    slug: 'building-scalable-react-applications-typescript',
    excerpt: 'Learn how to structure large React applications using TypeScript for better maintainability and developer experience.',
    content: `# Building Scalable React Applications with TypeScript

TypeScript has become an essential tool for building large-scale React applications. In this comprehensive guide, we'll explore best practices for structuring your React TypeScript projects.

## Why TypeScript?

TypeScript brings static typing to JavaScript, which helps catch errors at compile time rather than runtime. This is especially valuable in React applications where prop drilling and component composition can become complex.

## Project Structure

A well-organized project structure is crucial for scalability:

\`\`\`
src/
  components/
    ui/
    forms/
    layout/
  hooks/
  utils/
  types/
  pages/
\`\`\`

## Type Safety Best Practices

1. **Define Props Interfaces**: Always create interfaces for your component props
2. **Use Generic Types**: Leverage TypeScript generics for reusable components
3. **Strict Mode**: Enable strict mode in your tsconfig.json

This approach has helped me build maintainable applications that scale with team growth.`,
    category: 'tutorial',
    tags: ['React', 'TypeScript', 'Architecture', 'Best Practices'],
    publishedAt: '2024-01-15',
    readTime: 8,
    featured: true,
    author: 'Vaibhav Lutade',
  },
  {
    id: '2',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-web-development-trends-2024',
    excerpt: 'Exploring emerging technologies and trends that are shaping the future of web development.',
    content: `# The Future of Web Development: Trends to Watch in 2024

The web development landscape is constantly evolving. Here are the key trends I'm watching this year.

## Server Components Revolution

React Server Components are changing how we think about rendering. They offer:
- Better performance
- Reduced bundle sizes
- Improved SEO

## AI-Powered Development

AI tools are becoming integral to the development process:
- Code completion with GitHub Copilot
- Automated testing with AI
- Design-to-code tools

## Edge Computing

Moving computation closer to users for better performance.

The future is exciting, and these trends will shape how we build web applications.`,
    category: 'opinion',
    tags: ['Web Development', 'Trends', 'AI', 'Performance'],
    publishedAt: '2024-01-10',
    readTime: 6,
    featured: true,
    author: 'Vaibhav Lutade',
  },
  {
    id: '3',
    title: 'Next.js 14: A Deep Dive into New Features',
    slug: 'nextjs-14-deep-dive-new-features',
    excerpt: 'Comprehensive review of Next.js 14 features including App Router improvements and performance enhancements.',
    content: `# Next.js 14: A Deep Dive into New Features

Next.js 14 brings significant improvements to the developer experience and application performance.

## Key Features

### Turbopack Improvements
- Faster local development
- Better hot reloading
- Improved build times

### Server Actions
- Simplified form handling
- Better data mutations
- Type-safe server functions

### Partial Prerendering
- Combines static and dynamic content
- Better performance characteristics
- Improved user experience

## Migration Guide

Upgrading to Next.js 14 is straightforward for most applications. Here's what you need to know...`,
    category: 'review',
    tags: ['Next.js', 'React', 'Performance', 'Framework'],
    publishedAt: '2023-12-20',
    readTime: 10,
    featured: false,
    author: 'Vaibhav Lutade',
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    slug: 'css-grid-vs-flexbox-when-to-use',
    excerpt: 'A practical guide to choosing between CSS Grid and Flexbox for your layout needs.',
    content: `# CSS Grid vs Flexbox: When to Use Which

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes.

## Flexbox: One-Dimensional Layouts

Use Flexbox when:
- Aligning items in a single direction
- Creating responsive navigation bars
- Centering content vertically or horizontally

## CSS Grid: Two-Dimensional Layouts

Use CSS Grid when:
- Creating complex page layouts
- Building card-based designs
- Managing both rows and columns

## Practical Examples

Let me show you real-world scenarios where each excels...`,
    category: 'tutorial',
    tags: ['CSS', 'Layout', 'Flexbox', 'Grid'],
    publishedAt: '2023-12-15',
    readTime: 5,
    featured: false,
    author: 'Vaibhav Lutade',
  },
  {
    id: '5',
    title: 'My Journey from Junior to Senior Developer',
    slug: 'journey-junior-to-senior-developer',
    excerpt: 'Reflections on the skills, mindset, and experiences that shaped my growth as a developer.',
    content: `# My Journey from Junior to Senior Developer

Five years ago, I started my career as a junior developer. Here's what I've learned along the way.

## Technical Growth

The technical skills are just the beginning:
- Learning multiple programming languages
- Understanding system design
- Mastering debugging techniques

## Soft Skills Matter

What really accelerated my growth:
- Communication with stakeholders
- Mentoring junior developers
- Leading technical discussions

## Key Lessons

1. **Never stop learning**: Technology evolves rapidly
2. **Focus on fundamentals**: Frameworks change, principles remain
3. **Build relationships**: Your network is invaluable

The journey continues, and I'm excited about what's next.`,
    category: 'opinion',
    tags: ['Career', 'Growth', 'Mentorship', 'Leadership'],
    publishedAt: '2023-12-01',
    readTime: 7,
    featured: true,
    author: 'Vaibhav Lutade',
  },
  {
    id: '6',
    title: 'Building a Design System with React and Storybook',
    slug: 'building-design-system-react-storybook',
    excerpt: 'Step-by-step guide to creating a scalable design system for your React applications.',
    content: `# Building a Design System with React and Storybook

Design systems ensure consistency across your applications. Here's how to build one.

## Why Design Systems?

- Consistency across products
- Faster development
- Better collaboration between design and development

## Setting Up Storybook

\`\`\`bash
npx storybook@latest init
\`\`\`

## Component Architecture

Structure your components for maximum reusability:
- Atomic design principles
- Prop-driven customization
- Comprehensive documentation

## Testing Strategy

Ensure your components work reliably:
- Visual regression testing
- Accessibility testing
- Unit tests for component logic

A well-built design system is an investment in your team's productivity.`,
    category: 'tutorial',
    tags: ['Design System', 'React', 'Storybook', 'UI/UX'],
    publishedAt: '2023-11-20',
    readTime: 12,
    featured: false,
    author: 'Vaibhav Lutade',
  },
];
