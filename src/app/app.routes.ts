import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Home',
      description: 'Discover curated local specialties, weather, and food options near you.'
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
