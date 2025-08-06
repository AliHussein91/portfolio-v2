import { Routes } from '@angular/router';
import { SkillsManagementComponent } from './skills-management.component';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { UpdateSkillComponent } from './update-skill/update-skill.component';


export const skillsManagementRoutes: Routes = [
    {
        path: '',
        component: SkillsManagementComponent,
        children: [
            {
                path: '',
                component: SkillsListComponent
            },
            {
                path: 'add',
                component: AddSkillComponent
            },
            {
                path: 'update/:id',
                component: UpdateSkillComponent
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]
