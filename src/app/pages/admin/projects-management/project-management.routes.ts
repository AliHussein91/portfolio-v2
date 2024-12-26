import { Routes } from '@angular/router';
import { ProjectsManagementComponent } from './projects-management.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';

export const projectsManagementRoutes: Routes = [
    {
        path: '',
        component: ProjectsManagementComponent,
        children: [
            {
                path: '',
                component: ProjectsListComponent
            },
            {
                path: 'add',
                component: AddProjectComponent
            },
            {
                path: 'update/:id',
                component: UpdateProjectComponent
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]
