import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactMeComponent } from './pages/contact-me/contact-me.component';
import { authGuard } from './core/guards/auth.guard';

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
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(r => r.adminRoutes),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
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
