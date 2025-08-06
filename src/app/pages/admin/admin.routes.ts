import { Routes } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { AdminComponent } from "./admin.component";


export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: MessagesComponent
            },
            {
                path: 'projects',
                loadChildren: () => import('./projects-management/project-management.routes').then(r => r.projectsManagementRoutes)
            },
            {
                path: 'skills',
                loadChildren: () => import('./skills-management/skills-management.routes').then(r => r.skillsManagementRoutes)
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]