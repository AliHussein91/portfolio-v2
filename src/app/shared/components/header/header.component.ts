import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe,RouterLink,NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() lang = new EventEmitter()
  isMenuOpen: boolean = false
  // authService = inject(AuthService)

  changeLang() {
    this.lang.emit()
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }
}
