import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-v2';

  constructor(private translate: TranslateService) {
    const language:string = localStorage.getItem('language')!
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}