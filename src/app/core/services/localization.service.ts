import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  language = localStorage.getItem('language') || 'en'
  translate = inject(TranslateService)
  el = document.querySelector('html')!;
  rtl = signal(false)

  start() {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', this.language)
    }
    this.rtl.set(this.language === 'en' ? false : true)
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
    updateLayoutDirection(this.el, this.language)
  }
  changeLang() {
    this.language === 'en' ? this.language = 'ar' : this.language = 'en'
    localStorage.setItem('language', this.language)
    this.rtl.set(this.language === 'en' ? false : true)
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