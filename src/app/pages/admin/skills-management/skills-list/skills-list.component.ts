import { Component, inject } from '@angular/core';
import { SkillsService } from '../../../../core/services/skills.service';
import { UploadMediaService } from '../../../../core/services/upload-media.service';
import { ISkill } from '../../../../core/types/skill.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skills-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './skills-list.component.html',
  styleUrl: './skills-list.component.scss'
})
export class SkillsListComponent {
  skills: ISkill[] = [];
  isLoading: boolean = false;

  skillsService = inject(SkillsService)
  uploadMediaService = inject(UploadMediaService);

  constructor() {
    this.loadSkills();
  }

  loadSkills() {
    this.isLoading = true;
    this.skillsService.getSkills().subscribe({
      next: (skills: ISkill[]) => {
        this.skills = skills;
      },
      error: (err) => {
        console.error('Error loading skills:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteSkill(skillId: string) {
    this.isLoading = true;
    this.skillsService.deleteSkill(skillId).subscribe({
      next: () => {
        this.skills = this.skills.filter(skill => skill._id !== skillId);
      },
      error: (err) => {
        console.error('Error deleting skill:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
