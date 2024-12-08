import { LocalizationService } from './../../core/services/localization.service';
import { NgStyle } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslatePipe, RouterLink, NgStyle],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  localizationService = inject(LocalizationService)
  rtl = this.localizationService.rtl
}
