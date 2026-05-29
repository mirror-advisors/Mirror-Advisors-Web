export interface SocialLink {
  key: string;
  label: string;
  url: string;
  enabled: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { key: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com', enabled: true },
  { key: 'facebook', label: 'Facebook', url: 'https://facebook.com', enabled: true },
  { key: 'instagram', label: 'Instagram', url: 'https://instagram.com', enabled: true },
  { key: 'x', label: 'X', url: 'https://x.com', enabled: true },
  { key: 'youtube', label: 'YouTube', url: 'https://youtube.com', enabled: true },
  { key: 'google', label: 'Google', url: 'https://google.com', enabled: true },
  { key: 'tiktok', label: 'TikTok', url: 'https://tiktok.com', enabled: true },
];
