import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { LocalizationService } from './core/services/localization.service';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-v2';
  isContactFormVisible = true
  localizationService = inject(LocalizationService)
  router = inject(Router)
  authService = inject(AuthService)

  constructor() {
    this.authService.autoLogin()
    this.localizationService.start()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isContactFormVisible = this.router.url !== '/login' && !this.router.url.includes('/admin')? true: false; // Hide sidebar on '/specific-route'
    });
  }

  changeLang() {
    this.localizationService.changeLang()
  }


}

