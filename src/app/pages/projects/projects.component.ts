import { Component, inject, Input, OnInit } from '@angular/core';
import { Project } from '../../shared/types/project';
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
  projects: Project[] = []
  projectService = inject(ProjectsService)
  isLoading = false

  ngOnInit(): void {
    this.isLoading = true
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }
}
