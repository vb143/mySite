import type { TimelineEvent } from '@/components/ui/timeline';
import { Project as BaseProject } from '@/data/projects';
export type { TimelineEvent } from '@/components/ui/timeline';
import type { BlogPost } from '@/data/blog';
export type { BlogPost } from '@/data/blog';

// Extended Project interface for admin management
export interface Project extends BaseProject {
  status?: 'completed' | 'in-progress' | 'planned';
  startDate?: string;
  endDate?: string;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  gallery?: string[];
}

// Additional interfaces for comprehensive content management
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  profileImage?: string;
  resumeUrl?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
  icon: string;
  visible: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  heroHeading: string;
  heroSubheading: string;
  aboutHeading: string;
  aboutDescription: string;
  projectsHeading: string;
  projectsDescription: string;
  blogHeading: string;
  blogDescription: string;
}

// Data management functions for admin
export class AdminDataManager {
  // Timeline Events Management
  static getTimelineEvents(): TimelineEvent[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('admin-timeline-events');
    return stored ? JSON.parse(stored) : [];
  }

  static saveTimelineEvents(events: TimelineEvent[]): void {
    localStorage.setItem('admin-timeline-events', JSON.stringify(events));
  }

  static addTimelineEvent(event: TimelineEvent): void {
    const events = this.getTimelineEvents();
    events.push(event);
    this.saveTimelineEvents(events);
  }

  static updateTimelineEvent(id: string, updatedEvent: TimelineEvent): void {
    const events = this.getTimelineEvents();
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = updatedEvent;
      this.saveTimelineEvents(events);
    }
  }

  static deleteTimelineEvent(id: string): void {
    const events = this.getTimelineEvents();
    const filtered = events.filter(e => e.id !== id);
    this.saveTimelineEvents(filtered);
  }

  // Projects Management
  static getProjects(): Project[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('admin-projects');
    if (stored) {
      return JSON.parse(stored);
    }
    // Convert base projects to extended format if no admin data exists
    return [];
  }

  static saveProjects(projects: Project[]): void {
    localStorage.setItem('admin-projects', JSON.stringify(projects));
  }

  static addProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    this.saveProjects(projects);
  }

  static updateProject(id: string, updatedProject: Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = updatedProject;
      this.saveProjects(projects);
    }
  }

  static deleteProject(id: string): void {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    this.saveProjects(filtered);
  }

  // Blog Posts Management
  static getBlogPosts(): BlogPost[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('admin-blog-posts');
    return stored ? JSON.parse(stored) : [];
  }

  static saveBlogPosts(posts: BlogPost[]): void {
    localStorage.setItem('admin-blog-posts', JSON.stringify(posts));
  }

  static addBlogPost(post: BlogPost): void {
    const posts = this.getBlogPosts();
    posts.push(post);
    this.saveBlogPosts(posts);
  }

  static updateBlogPost(id: string, updatedPost: BlogPost): void {
    const posts = this.getBlogPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index] = updatedPost;
      this.saveBlogPosts(posts);
    }
  }

  static deleteBlogPost(id: string): void {
    const posts = this.getBlogPosts();
    const filtered = posts.filter(p => p.id !== id);
    this.saveBlogPosts(filtered);
  }

  // Personal Info Management
  static getPersonalInfo(): PersonalInfo {
    if (typeof window === 'undefined') return this.getDefaultPersonalInfo();
    const stored = localStorage.getItem('admin-personal-info');
    return stored ? JSON.parse(stored) : this.getDefaultPersonalInfo();
  }

  static savePersonalInfo(info: PersonalInfo): void {
    localStorage.setItem('admin-personal-info', JSON.stringify(info));
  }

  static getDefaultPersonalInfo(): PersonalInfo {
    return {
      name: 'Vaibhav Lutade',
      title: 'Full Stack Developer',
      tagline: 'Building digital experiences that matter',
      bio: 'Passionate developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems.',
      location: 'India',
      email: 'vaibhav@example.com',
      phone: '+91 9876543210',
      profileImage: '',
      resumeUrl: '',
    };
  }

  // Social Links Management
  static getSocialLinks(): SocialLink[] {
    if (typeof window === 'undefined') return this.getDefaultSocialLinks();
    const stored = localStorage.getItem('admin-social-links');
    return stored ? JSON.parse(stored) : this.getDefaultSocialLinks();
  }

  static saveSocialLinks(links: SocialLink[]): void {
    localStorage.setItem('admin-social-links', JSON.stringify(links));
  }

  static addSocialLink(link: SocialLink): void {
    const links = this.getSocialLinks();
    links.push(link);
    this.saveSocialLinks(links);
  }

  static updateSocialLink(id: string, updatedLink: SocialLink): void {
    const links = this.getSocialLinks();
    const index = links.findIndex(l => l.id === id);
    if (index !== -1) {
      links[index] = updatedLink;
      this.saveSocialLinks(links);
    }
  }

  static deleteSocialLink(id: string): void {
    const links = this.getSocialLinks();
    const filtered = links.filter(l => l.id !== id);
    this.saveSocialLinks(filtered);
  }

  static getDefaultSocialLinks(): SocialLink[] {
    return [
      {
        id: '1',
        platform: 'GitHub',
        url: 'https://github.com/vaibhav',
        username: 'vaibhav',
        icon: 'Github',
        visible: true,
      },
      {
        id: '2',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/vaibhav',
        username: 'vaibhav',
        icon: 'Linkedin',
        visible: true,
      },
      {
        id: '3',
        platform: 'Twitter',
        url: 'https://twitter.com/vaibhav',
        username: 'vaibhav',
        icon: 'Twitter',
        visible: true,
      },
      {
        id: '4',
        platform: 'Email',
        url: 'mailto:vaibhav@example.com',
        username: 'vaibhav@example.com',
        icon: 'Mail',
        visible: true,
      },
    ];
  }

  // Site Settings Management
  static getSiteSettings(): SiteSettings {
    if (typeof window === 'undefined') return this.getDefaultSiteSettings();
    const stored = localStorage.getItem('admin-site-settings');
    return stored ? JSON.parse(stored) : this.getDefaultSiteSettings();
  }

  static saveSiteSettings(settings: SiteSettings): void {
    localStorage.setItem('admin-site-settings', JSON.stringify(settings));
  }

  static getDefaultSiteSettings(): SiteSettings {
    return {
      siteTitle: 'Vaibhav Lutade - Portfolio',
      siteDescription: 'Full Stack Developer & Creative Technologist',
      heroHeading: 'Welcome to My Digital Journey',
      heroSubheading: 'Crafting experiences through code and creativity',
      aboutHeading: 'About Me',
      aboutDescription: 'Get to know my story, skills, and passion for technology',
      projectsHeading: 'My Projects',
      projectsDescription: 'Explore my latest work and creative solutions',
      blogHeading: 'Thoughts & Insights',
      blogDescription: 'Sharing knowledge and experiences from my journey',
    };
  }

  // Initialize with default data if empty
  static initializeData(): void {
    if (this.getTimelineEvents().length === 0) {
      // Import and save default timeline events
      import('@/data/timeline').then(({ timelineEvents }) => {
        this.saveTimelineEvents(timelineEvents);
      });
    }

    if (this.getProjects().length === 0) {
      // Import and save default projects with extended properties
      import('@/data/projects').then(({ projects }) => {
        const extendedProjects: Project[] = projects.map(project => ({
          ...project,
          status: 'completed' as const,
          startDate: project.year,
          links: {
            github: project.githubUrl,
            live: project.liveUrl,
          },
        }));
        this.saveProjects(extendedProjects);
      });
    }

    if (this.getBlogPosts().length === 0) {
      // Import and save default blog posts
      import('@/data/blog').then(({ blogPosts }) => {
        this.saveBlogPosts(blogPosts);
      });
    }

    // Initialize personal info and social links if not set
    if (!localStorage.getItem('admin-personal-info')) {
      this.savePersonalInfo(this.getDefaultPersonalInfo());
    }

    if (!localStorage.getItem('admin-social-links')) {
      this.saveSocialLinks(this.getDefaultSocialLinks());
    }

    if (!localStorage.getItem('admin-site-settings')) {
      this.saveSiteSettings(this.getDefaultSiteSettings());
    }
  }
}
