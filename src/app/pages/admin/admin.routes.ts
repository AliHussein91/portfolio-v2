import { Routes } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { ProjectsManagementComponent } from "./projects-management/projects-management.component";
import { SkillsManagementComponent } from "./skills-management/skills-management.component";
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
                component: ProjectsManagementComponent
            },
            {
                path: 'skills',
                component: SkillsManagementComponent
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]