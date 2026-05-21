import { browser } from '$app/environment';

class I18n {
  lang = $state('de');

  constructor() {
    if (browser) {
      this.lang = localStorage.getItem('lang') ?? 'de';
    }
  }

  t(de, en) {
    return this.lang === 'en' ? en : de;
  }

  toggle() {
    this.lang = this.lang === 'de' ? 'en' : 'de';
    if (browser) localStorage.setItem('lang', this.lang);
  }
}

export const i18n = new I18n();
