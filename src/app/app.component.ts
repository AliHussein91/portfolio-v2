import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { LocalizationService } from './core/services/localization.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-v2';

  localizationService = inject(LocalizationService) 
  
  constructor() {
   this.localizationService.start()
  }

  changeLang() {
    this.localizationService.changeLang()
  }
}

