import { Component, inject, Input } from '@angular/core';
import { IProject } from '../../../core/types/project.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule, NgClass } from '@angular/common';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TranslatePipe, NgClass, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: IProject
  @Input({ required: true }) left: boolean = false

  localizationService = inject(LocalizationService)

  rtl = this.localizationService.rtl
}
