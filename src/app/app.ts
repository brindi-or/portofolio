import { Component, effect, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Pictures } from './components/pictures/pictures';
import { Contact } from './components/contact/contact';
import { I18n } from './i18n';

@Component({
  selector: 'app-root',
  imports: [Navbar,Home,Projects,Skills,Pictures,Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  i18n = inject(I18n);
  private titleSvc = inject(Title);
  private meta = inject(Meta);

  // SEO : title + meta description suivent la langue choisie (et <html lang> via I18n.set)
  private readonly seo = {
    en: {
      title: 'Brinda Laure Nodem — Software Developer',
      desc: 'Brinda Laure Nodem, software developer in Douala, Cameroon — building user-friendly, visually refined web experiences. Available for freelance.',
    },
    fr: {
      title: 'Brinda Laure Nodem — Développeuse logiciel',
      desc: 'Brinda Laure Nodem, développeuse logiciel à Douala, Cameroun — des expériences web soignées et agréables à utiliser. Disponible en freelance.',
    },
  } as const;

  constructor() {
    effect(() => {
      const s = this.seo[this.i18n.lang()];
      this.titleSvc.setTitle(s.title);
      this.meta.updateTag({ name: 'description', content: s.desc });
      this.meta.updateTag({ property: 'og:title', content: s.title });
      this.meta.updateTag({ property: 'og:description', content: s.desc });
    });
  }
}
