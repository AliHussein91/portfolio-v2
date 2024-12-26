import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects.service';
import { UploadMediaService } from '../../../../core/services/upload-media.service';
import { IProject } from '../../../../core/types/project.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent implements OnInit {

  projects: IProject[] = []
  isLoading: boolean = false
  newProjectImage: string = ''
  projectsService = inject(ProjectsService)
  uploadMediaService = inject(UploadMediaService)

  ngOnInit(): void {
    this.showProjects();
  }

  // Show all projects
  async showProjects() {
    if (!localStorage.getItem('projects')) {
      this.getProjects()
      return
    }
    const projects = await JSON.parse(localStorage.getItem('projects')!)
    this.projects = projects
  }

  // Get all projects
  getProjects() {
    this.isLoading = true
    this.projectsService.getProjects().subscribe({
      next: projects => {
        this.projects = projects
        localStorage.setItem('projects', JSON.stringify(projects))
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isLoading = false
      }
    })
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

  // Delete a project by id
  deleteProject(id: string) {
    this.isLoading = true
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(project => project._id !== id)
        localStorage.setItem('projects', JSON.stringify(this.projects))
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
