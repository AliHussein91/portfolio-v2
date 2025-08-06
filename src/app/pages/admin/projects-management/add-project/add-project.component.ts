import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects.service';
import { UploadMediaService } from '../../../../core/services/upload-media.service';
import { IProject } from '../../../../core/types/project.interface';
import { mergeMap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {

  projects: IProject[] = []
  isLoading: boolean = false
  newProjectImage: string = ''
  projectsService = inject(ProjectsService)
  uploadMediaService = inject(UploadMediaService)

  fb = inject(FormBuilder)

  form: FormGroup

  constructor(){
    this.form = this.fb.nonNullable.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      nameAr: ['', Validators.required],
      descritptionAr: ['', Validators.required],
      skills: ['', Validators.required]
    })
  }

  
  addProjectWithImage(image: File, project: IProject) {
    this.isLoading = true
    this.uploadMediaService.postImage(image).pipe(
      mergeMap((data: any) => {
        project.image = data.fileUrl
        return this.projectsService.postProject(project)
      })
    ).subscribe({
      next: (project) => {
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

}
