import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

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

  changeLang() {
    this.lang.emit()
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }
}
