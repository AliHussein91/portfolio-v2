import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactMeComponent } from './pages/contact-me/contact-me.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent)
    },
    {
        path: 'projects',
        loadComponent: () => import('./pages/projects/projects.component').then(c => c.ProjectsComponent)
    },
    {
        path: 'contact',
        component: ContactMeComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
