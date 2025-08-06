import { Component, inject } from '@angular/core';
import { ISkill } from '../../../../core/types/skill.interface';
import { SkillsService } from '../../../../core/services/skills.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadMediaService } from '../../../../core/services/upload-media.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.scss'
})
export class AddSkillComponent {

  skills: ISkill[] = []
  isLoading: boolean = false
  skillsService = inject(SkillsService)
  uploadMediaService = inject(UploadMediaService)
  newSkillImage: File | null = null;

  fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    this.form = this.fb.nonNullable.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  addProjectWithImage(image: File, skill: ISkill) {
    this.isLoading = true
    this.uploadMediaService.postImage(image).pipe(
      mergeMap((data: any) => {
        skill.image = data.fileUrl
        return this.skillsService.postSkill(skill)
      })
    ).subscribe({
      next: (skill) => {
        this.skills.push(skill)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newSkillImage = file;
    } else {
      this.newSkillImage = null;
    }
  }

}

