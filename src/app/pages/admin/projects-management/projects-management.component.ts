import e from 'express';
import { ProjectsService } from '../../../core/services/projects.service';
import { IProject } from '../../../core/types/project.interface';
import { Component, inject, OnInit } from '@angular/core';
import { UploadMediaService } from '../../../core/services/upload-media.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-projects-management',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './projects-management.component.html',
  styleUrl: './projects-management.component.scss'
})
export class ProjectsManagementComponent {

  projects: IProject[] = []
  isLoading: boolean = false
  newProjectImage: string = ''
  projectsService = inject(ProjectsService)
  uploadMediaService = inject(UploadMediaService)



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


  

// Upload a project image
uploadImage(file: File) {
  this.isLoading = true
  this.uploadMediaService.postImage(file).subscribe({
    next: (res: any) => {
      console.log(res)
      this.newProjectImage = res
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
