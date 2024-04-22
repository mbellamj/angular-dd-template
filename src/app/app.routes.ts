import { Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import { PageNotFoundComponent } from './page-not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/auth.component').then((c) => c.AuthComponent),
  },
  { path: '**', component: PageNotFoundComponent },
];
