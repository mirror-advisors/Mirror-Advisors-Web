export interface NavPage {
  key: string;
  label: string;
  href: string;
  enabled: boolean;
}

export const NAV_PAGES: NavPage[] = [
  { key: 'services', label: 'Services', href: '/services', enabled: true },
  { key: 'cases', label: 'Case Studies', href: '/cases', enabled: true },
  { key: 'technology', label: 'Technology', href: '/technology', enabled: true },
  { key: 'about', label: 'About', href: '/about', enabled: true },
  { key: 'contact', label: 'Contact', href: '/contact', enabled: true },
];

export const MOBILE_NAV_PAGES: NavPage[] = [
  { key: 'home', label: 'Home', href: '/', enabled: true },
  ...NAV_PAGES,
];
