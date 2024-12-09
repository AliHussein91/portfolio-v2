import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HeroComponent } from "../hero/hero.component";
import { ProjectsComponent } from "../projects/projects.component";
import { ProjectsSampleComponent } from "../projects-sample/projects-sample.component";
import { Project } from '../../shared/types/project';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, ProjectsComponent, ProjectsSampleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 projects: Project[] = [{ id: 1, name: 'Project Name', description: 'This is a project description', image: 'img/project_1.png' }, { id: 2, name: 'Project Name', description: 'This is a project description', image: 'img/project_3.png' },]

}
