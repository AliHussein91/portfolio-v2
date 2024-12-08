import { Component, Input, inject } from '@angular/core';
import { ProjectCardComponent } from "../../shared/components/project-card/project-card.component";
import { Project } from '../../shared/types/project';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-sample',
  standalone: true,
  imports: [ProjectCardComponent, TranslatePipe],
  templateUrl: './projects-sample.component.html',
  styleUrl: './projects-sample.component.scss'
})
export class ProjectsSampleComponent {
  @Input({ required: true }) projects: Project[] = [{ id: 1, name: 'Project Name', description: 'This is a project description', image: 'img/project_1.png' }, { id: 2, name: 'Project Name', description: 'This is a project description', image: 'img/project_3.png' },]

}
