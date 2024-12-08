import { Component, Input } from '@angular/core';
import { Project } from '../../shared/types/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  @Input({required: true}) projects: Project[] = []
}
