import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AiChatComponent } from './pages/ai-chat/ai-chat';
import { ExploreComponent } from './pages/explore/explore';
import { SettingsComponent } from './pages/settings/settings';
import { AboutComponent } from './pages/about/about';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy';
import { SavedComponent } from './pages/saved/saved';
import { AuthComponent } from './pages/auth/auth';

export const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    data: { title: 'Home | whtsnyr.me', description: 'Discover curated local specialties, weather, and food options near you.' }
  },
  { 
    path: 'ai', 
    component: AiChatComponent,
    data: { title: 'whtsnyr.AI | Your Smart Local Companion', description: 'Chat with our AI to find the best places, food, and events tailored to your preferences.' }
  },
  { 
    path: 'explore', 
    component: ExploreComponent,
    data: { title: 'Explore | whtsnyr.me', description: 'Discover local specialties, nature spots, temples, and shopping near you.' }
  },
  { 
    path: 'saved', 
    component: SavedComponent,
    data: { title: 'Saved Places | whtsnyr.me', description: 'View your saved local spots.' }
  },
  { 
    path: 'settings', 
    component: SettingsComponent,
    data: { title: 'Settings | whtsnyr.me', description: 'Manage your preferences, saved places, and order history.' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About Us | whtsnyr.me', description: 'Real-time local activity and trends.' }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { title: 'Privacy Policy | whtsnyr.me', description: 'Read our privacy policy.' }
  },
  {
    path: 'account',
    component: AuthComponent,
    data: { title: 'Account | whtsnyr.me', description: 'Sign in or create an account to access your saved places and preferences.' }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
