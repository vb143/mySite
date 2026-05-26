export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'opensource';
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with real-time inventory and payment processing',
    longDescription: 'A full-featured e-commerce platform built with Next.js and Node.js. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. Implemented real-time inventory updates and responsive design.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    category: 'fullstack',
    featured: true,
    year: '2024',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates and team features',
    longDescription: 'A comprehensive task management application with team collaboration features. Built with React and Firebase, it includes drag-and-drop task boards, real-time notifications, file attachments, time tracking, and detailed analytics dashboard.',
    technologies: ['React', 'Firebase', 'Material-UI', 'WebSocket', 'PWA'],
    category: 'web',
    featured: true,
    year: '2023',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Weather Mobile App',
    description: 'Cross-platform weather app with location-based forecasts',
    longDescription: 'A beautiful weather application built with React Native. Features include current weather conditions, 7-day forecasts, weather maps, location-based alerts, and offline data caching. Integrated with multiple weather APIs for accurate data.',
    technologies: ['React Native', 'Expo', 'Weather API', 'AsyncStorage', 'Maps'],
    category: 'mobile',
    featured: false,
    year: '2023',
    githubUrl: '#',
  },
  {
    id: '4',
    title: 'Blog CMS',
    description: 'Headless CMS for bloggers with markdown support and SEO optimization',
    longDescription: 'A headless content management system specifically designed for bloggers and content creators. Features markdown editor, SEO optimization, image management, comment system, and analytics integration. Built with modern JAMstack architecture.',
    technologies: ['Next.js', 'Contentful', 'MDX', 'Tailwind CSS', 'Vercel'],
    category: 'web',
    featured: true,
    year: '2022',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '5',
    title: 'Open Source UI Library',
    description: 'React component library with accessibility and theming support',
    longDescription: 'An open-source React component library focused on accessibility and customization. Includes 50+ components, dark/light theme support, TypeScript definitions, comprehensive documentation, and Storybook integration.',
    technologies: ['React', 'TypeScript', 'Storybook', 'Rollup', 'Jest'],
    category: 'opensource',
    featured: false,
    year: '2022',
    githubUrl: '#',
  },
  {
    id: '6',
    title: 'Real Estate Platform',
    description: 'Property listing platform with virtual tours and mortgage calculator',
    longDescription: 'A comprehensive real estate platform connecting buyers, sellers, and agents. Features property listings, advanced search filters, virtual tour integration, mortgage calculator, and agent dashboard. Implemented geolocation services and map integration.',
    technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io', 'Google Maps API'],
    category: 'fullstack',
    featured: false,
    year: '2021',
    liveUrl: '#',
  },
];
