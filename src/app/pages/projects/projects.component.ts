import { Component, inject, Input, OnInit } from '@angular/core';
import { IProject } from '../../core/types/project.interface';
import { ProjectCardComponent } from "../../shared/components/project-card/project-card.component";
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: IProject[] = []
  projectService = inject(ProjectsService)
  isLoading = false

  ngOnInit(): void {
    this.showProjects();
  }

  // Get all the projects from the local storage
  async showProjects() {
    if (!localStorage.getItem('projects')) {
      this.getProjects();
    }
    const projects = await JSON.parse(localStorage.getItem('projects')!);
    this.projects = projects;
  }

  // Get projects from server and save them to the local storage
  getProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (projects: IProject[]) => {
        this.projects = projects;
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
