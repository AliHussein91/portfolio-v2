import e from 'express';
import { ProjectsService } from '../../../core/services/projects.service';
import { IProject } from '../../../core/types/project.interface';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-management',
  standalone: true,
  imports: [],
  templateUrl: './projects-management.component.html',
  styleUrl: './projects-management.component.scss'
})
export class ProjectsManagementComponent implements OnInit {

  projects: IProject[] = []
  isLoading: boolean = false
  projectsService = inject(ProjectsService)

  ngOnInit(): void {
    this.showProjects();
  }

  // Show all projects
  async showProjects() {
    if (!localStorage.getItem('projects')) {
      this.getProjects()
    }
    const projects = await JSON.parse(localStorage.getItem('projects')!)
    this.projects = projects
  }

  // Get a project by id
  getProject(id: string) {
    this.isLoading = true
    this.projectsService.getProject(id).subscribe({
      next: project => {
        console.log(project)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  // Add a new project to the projects array
  postProject(project: IProject) {
    this.isLoading = true
    this.projectsService.postProject(project).subscribe({
      next: project => {
        this.projects.push(project)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  // Update a project by id
  updateProject(id: string, project: IProject) {
    this.isLoading = true
    this.projectsService.updateProject(id, project).subscribe({
      next: project => {
        this.projects = this.projects.map(p => p._id === id ? project : p)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  // Get all projects
  getProjects() {
    this.isLoading = true
    this.projectsService.getProjects().subscribe({
      next: projects => {
        this.projects = projects
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  // Delete a project by id
  deleteProject(id: string) {
    this.isLoading = true
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(project => project._id !== id)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }
}
