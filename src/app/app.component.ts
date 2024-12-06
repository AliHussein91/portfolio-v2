import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-v2';
  translate = inject(TranslateService)
  language = localStorage.getItem('language') || 'en'
  el = document.querySelector('html')!;

  constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
    updateLayoutDirection(this.el, this.language)
  }

  changeLang() {
    this.language === 'en' ? this.language = 'ar' : this.language = 'en'
    localStorage.setItem('language', this.language)
    this.translate.setDefaultLang(this.language)
    this.translate.use(this.language)
    updateLayoutDirection(this.el, this.language)
  }
}

function updateLayoutDirection(ref: HTMLHtmlElement, language: string) {
  if (language === 'ar') {
    ref.setAttribute('dir', 'rtl');
  } else {
    ref.setAttribute('dir', 'ltr');
  }
}