import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'fr';

type Dict = Record<string, string>;

/**
 * i18n maison léger : un signal de langue + un dictionnaire EN/FR.
 * Usage dans un composant : `i18n = inject(I18n)` puis `{{ i18n.t('nav.about') }}`.
 * Le changement de langue (toggle navbar) met à jour le signal -> re-render,
 * persiste le choix et synchronise l'attribut <html lang>.
 */
@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>('en');

  private readonly dict: Record<Lang, Dict> = {
    en: {
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.pictures': 'Pictures',
      'nav.contact': 'Contact',

      'home.badge': 'Available for freelance',
      'home.greeting': "Hello, I'm",
      'home.subtitle': 'Software Developer crafting user-friendly and visually refined web experiences from Douala, Cameroon.',
      'home.label.location': 'Location',
      'home.val.location': 'Douala, Cameroon',
      'home.label.availability': 'Availability',
      'home.val.availability': 'Open to freelance',
      'home.label.speciality': 'Speciality',
      'home.val.speciality': 'Software Development',
      'home.label.education': 'Education',
      'home.val.education': 'Bachelor Computer Science',
      'home.cta.primary': "Let's Work Together",
      'home.cta.secondary': 'See my world',
      'home.scroll': 'scroll',

      'skills.tag': 'Expertise',
      'skills.title1': 'Skills &',
      'skills.title2': 'Technologies',
      'skills.subtitle': 'A curated set of tools and technologies',

      'pictures.tag': 'My Pictures',
      'pictures.title1': 'Behind the',
      'pictures.title2': 'scenes',
      'pictures.subtitle': 'moments that inspire me',
      'pictures.cap.atwork': 'At work',
      'pictures.cap.creative': 'Creative space',
      'pictures.cap.style': 'Style',
      'pictures.cap.offduty': 'Off-duty',

      'contact.tag': 'Get In Touch',
      'contact.title1': "Let's Build",
      'contact.title2': 'Something Great',
      'contact.intro': "Whether you have a question, a project idea, or just want to say hello, I'm always open to discussing new ideas, creative projects, or opportunities to be part of something remarkable.",
      'contact.label.name': 'Your name',
      'contact.label.email': 'Your email',
      'contact.label.subject': 'Subject',
      'contact.label.message': 'Message',
      'contact.btn.send': 'Send message',
      'contact.btn.sending': 'Sending...',
      'contact.error': 'Failed to send. Please try again later.',
      'contact.thanks.title': 'Thank you!',
      'contact.thanks.msg': "Your message has been sent. I'll get back to you soon.",
      'contact.thanks.again': 'Send another',
      'contact.card.email': 'Email',
      'contact.card.location': 'Location',
      'contact.card.phone': 'Phone',
      'footer.copy': '© 2026 All rights reserved.',
    },
    fr: {
      'nav.about': 'À propos',
      'nav.skills': 'Compétences',
      'nav.pictures': 'Photos',
      'nav.contact': 'Contact',

      'home.badge': 'Disponible en freelance',
      'home.greeting': 'Bonjour, je suis',
      'home.subtitle': 'Développeuse logiciel, je conçois des expériences web soignées et agréables à utiliser, où le design rencontre la performance.',
      'home.label.location': 'Localisation',
      'home.val.location': 'Douala, Cameroun',
      'home.label.availability': 'Disponibilité',
      'home.val.availability': 'Ouverte au freelance',
      'home.label.speciality': 'Spécialité',
      'home.val.speciality': 'Développement logiciel',
      'home.label.education': 'Formation',
      'home.val.education': 'Bachelor en informatique',
      'home.cta.primary': 'Travaillons ensemble',
      'home.cta.secondary': 'Voir mon univers',
      'home.scroll': 'défiler',

      'skills.tag': 'Expertise',
      'skills.title1': 'Compétences &',
      'skills.title2': 'Technologies',
      'skills.subtitle': 'Un ensemble soigné d’outils et de technologies',

      'pictures.tag': 'Mes photos',
      'pictures.title1': 'Dans les',
      'pictures.title2': 'coulisses',
      'pictures.subtitle': 'Des moments qui m’inspirent',
      'pictures.cap.atwork': 'Au travail',
      'pictures.cap.creative': 'Espace créatif',
      'pictures.cap.style': 'Style',
      'pictures.cap.offduty': 'Détente',

      'contact.tag': 'Prendre contact',
      'contact.title1': 'Construisons',
      'contact.title2': 'quelque chose de grand',
      'contact.intro': "Une question, une idée de projet, ou juste envie de dire bonjour ? Je suis toujours ouverte à de nouvelles idées, des projets créatifs ou des opportunités de faire partie de quelque chose de remarquable.",
      'contact.label.name': 'Votre nom',
      'contact.label.email': 'Votre email',
      'contact.label.subject': 'Sujet',
      'contact.label.message': 'Message',
      'contact.btn.send': 'Envoyer le message',
      'contact.btn.sending': 'Envoi…',
      'contact.error': "Échec de l'envoi. Veuillez réessayer plus tard.",
      'contact.thanks.title': 'Merci !',
      'contact.thanks.msg': 'Votre message a bien été envoyé. Je vous réponds très vite.',
      'contact.thanks.again': 'Envoyer un autre message',
      'contact.card.email': 'Email',
      'contact.card.location': 'Localisation',
      'contact.card.phone': 'Téléphone',
      'footer.copy': '© 2026 Tous droits réservés.',
    },
  };

  constructor() {
    let initial: Lang = 'en';
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'fr' || saved === 'en') initial = saved;
    } catch { /* localStorage indisponible (SSR / privé) : on garde 'en' */ }
    this.set(initial);
  }

  /** Traduit une clé selon la langue courante (retombe sur EN, puis sur la clé brute). */
  t(key: string): string {
    const l = this.lang();
    return this.dict[l][key] ?? this.dict.en[key] ?? key;
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    try { localStorage.setItem('lang', lang); } catch { /* ignore */ }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  toggle(): void {
    this.set(this.lang() === 'en' ? 'fr' : 'en');
  }
}
