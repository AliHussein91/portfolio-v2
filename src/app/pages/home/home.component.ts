import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { ProjectsSampleComponent } from "../projects-sample/projects-sample.component";
import { IProject } from '../../core/types/project.interface';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ProjectsSampleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: IProject[] = []
  isLoading: boolean = false

  private projectsService = inject(ProjectsService)

  ngOnInit() {
    // Get the first 3 projects from the local storage
    this.showProjects();
  }


  // Get the first 3 projects from the local storage
  async showProjects() {
    if (!localStorage.getItem('projects')) {
      this.getProjects();
    }
    
    const projects = await JSON.parse(localStorage.getItem('projects')!);
    // set this.projects to the projects with featured true
    this.projects = projects.filter((project: IProject) => project.featured).slice(0, 3);
  }

  // Get projects from server and save them to the local storage
  getProjects() {
    this.isLoading = true;
    this.projectsService.getProjects().subscribe({
      next: (projects: IProject[]) => {
        this.projects = projects.slice(0, 3);
        localStorage.setItem('projects', JSON.stringify(projects));
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
