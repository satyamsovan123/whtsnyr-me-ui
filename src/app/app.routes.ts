import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    data: { title: 'Home | whtsnyr.me', description: 'Discover curated local specialties, weather, and food options near you.' }
  },
  { 
    path: 'ai', 
    loadComponent: () => import('./pages/ai-chat/ai-chat').then(m => m.AiChatComponent),
    data: { title: 'whtsnyr.AI | Your Smart Local Companion', description: 'Chat with our AI to find the best places, food, and events tailored to your preferences.' }
  },
  { 
    path: 'explore', 
    loadComponent: () => import('./pages/explore/explore').then(m => m.ExploreComponent),
    data: { title: 'Explore | whtsnyr.me', description: 'Discover local specialties, nature spots, temples, and shopping near you.' }
  },
  { 
    path: 'saved', 
    loadComponent: () => import('./pages/saved/saved').then(m => m.SavedComponent),
    data: { title: 'Saved Places | whtsnyr.me', description: 'View your saved local spots.' }
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings').then(m => m.SettingsComponent),
    data: { title: 'Settings | whtsnyr.me', description: 'Manage your preferences, saved places, and order history.' }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
    data: { title: 'About Us | whtsnyr.me', description: 'Real-time local activity and trends.' }
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicyComponent),
    data: { title: 'Privacy Policy | whtsnyr.me', description: 'Read our privacy policy.' }
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/auth/auth').then(m => m.AuthComponent),
    data: { title: 'Account | whtsnyr.me', description: 'Sign in or create an account to access your saved places and preferences.' }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
