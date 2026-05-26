export const heroContent = {
  name: "Vaibhav Lutade",
  title: "Full-Stack Developer, Blogger & Creative Technologist",
  location: "Mumbai, India",
  description: "Crafting digital experiences with modern web technologies. Passionate about creating scalable applications, sharing knowledge through blogging, and exploring the intersection of technology and creativity.",
  avatar: {
    initials: "VL",
    gradient: "from-[var(--color-primary)] to-[var(--color-accent)]"
  },
  socialLinks: [
    { 
      platform: "GitHub",
      url: "#",
      icon: "Github"
    },
    { 
      platform: "LinkedIn",
      url: "#",
      icon: "Linkedin"
    },
    { 
      platform: "Email",
      url: "#",
      icon: "Mail"
    }
  ],
  cta: {
    text: "Explore My Journey",
    target: "journey"
  }
};

export type HeroContent = typeof heroContent;
