import { Component, Input, inject } from '@angular/core';
import { ProjectCardComponent } from "../../shared/components/project-card/project-card.component";
import { IProject } from '../../core/types/project.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-sample',
  standalone: true,
  imports: [ProjectCardComponent, TranslatePipe, RouterLink],
  templateUrl: './projects-sample.component.html',
  styleUrl: './projects-sample.component.scss'
})
export class ProjectsSampleComponent {
  @Input({ required: true }) projects: IProject[] = []
  @Input({required: true}) isLoaded = false;

}
