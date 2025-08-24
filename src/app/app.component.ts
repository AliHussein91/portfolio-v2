import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { LocalizationService } from './core/services/localization.service';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { ProjectsService } from './core/services/projects.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-v2';
  isContactFormVisible = true
  
  localizationService = inject(LocalizationService)
  router = inject(Router)
  authService = inject(AuthService)
  projectsService = inject(ProjectsService)

  ngOnInit() {
    // Wake up server to prevent cold start
    this.wakeUpServer()
    // Start the localization service
    this.localizationService.start()
    // Get the projects data
    this.getProjects()
    // Auto login if the user has a token
    // this.authService.autoLogin()
    // Hide the contact form on specific routes
    this.hideContactForm()
  }

  // Change the language
  changeLang() {
    this.localizationService.changeLang()
  }

  // Wake up server to prevent cold start
  wakeUpServer() {
    this.authService.wakeUpServer().subscribe({
      next: (data) => {
        console.log("Server is awake")
      },
      error: (error) => console.error(error)
    })
  }

  // Get the projects data and save it to the local storage
  getProjects() {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        localStorage.setItem('projects', JSON.stringify(data))
      },
      error: (error) => console.error(error),
    })
  }
  // Hide the contact form on specific routes
  hideContactForm() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isContactFormVisible = event.url !== '/login' && !event.url.includes('/admin') ? true : false; // Hide sidebar on '/specific-route'
    });
  }
}



