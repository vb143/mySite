export type ThemeVariant = 'cinematic' | 'neon' | 'minimal' | 'warm';

export interface Theme {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  effects: {
    filmGrain: boolean;
    parallax: boolean;
    blur: boolean;
    glow: boolean;
  };
}

export const themes: Record<ThemeVariant, Theme> = {
  cinematic: {
    name: 'Cinematic',
    description: 'Film-inspired dark theme with golden accents',
    colors: {
      primary: '#D4AF37',
      secondary: '#B8860B',
      accent: '#FFD700',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#F5F5F5',
      textSecondary: '#B0B0B0',
      border: '#333333',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      mono: 'JetBrains Mono',
    },
    effects: {
      filmGrain: false,
      parallax: true,
      blur: true,
      glow: true,
    },
  },
  neon: {
    name: 'Neon',
    description: 'Cyberpunk-inspired with electric colors',
    colors: {
      primary: '#00D9FF',
      secondary: '#FF0080',
      accent: '#00FF88',
      background: '#0A0A0F',
      surface: '#1A1A2E',
      text: '#FFFFFF',
      textSecondary: '#B8B8FF',
      border: '#2D2D44',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      mono: 'JetBrains Mono',
    },
    effects: {
      filmGrain: false,
      parallax: true,
      blur: true,
      glow: true,
    },
  },
  minimal: {
    name: 'Minimal',
    description: 'Clean and professional with subtle elegance',
    colors: {
      primary: '#2563EB',
      secondary: '#1E40AF',
      accent: '#3B82F6',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      mono: 'JetBrains Mono',
    },
    effects: {
      filmGrain: false,
      parallax: false,
      blur: false,
      glow: false,
    },
  },
  warm: {
    name: 'Warm',
    description: 'Cozy sunset tones with golden accents',
    colors: {
      primary: '#F59E0B',
      secondary: '#D97706',
      accent: '#FBBF24',
      background: '#1C1917',
      surface: '#292524',
      text: '#FAFAF9',
      textSecondary: '#D6D3D1',
      border: '#44403C',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      mono: 'JetBrains Mono',
    },
    effects: {
      filmGrain: false,
      parallax: true,
      blur: true,
      glow: true,
    },
  },
};
