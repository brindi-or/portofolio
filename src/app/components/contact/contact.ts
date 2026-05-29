import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18n } from '../../i18n';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = '0x4AAAAAADYJ0Kmoc3Ik9yJl';

@Component({
    selector: 'app-contact',
    imports: [CommonModule,FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss',
})
  export class Contact implements AfterViewInit, OnDestroy {
    i18n = inject(I18n);
    private http = inject(HttpClient);
    private readonly mailerUrl = 'https://brinda-mailer.apps.hirodiscount.com/send';

    @ViewChild('turnstileEl') private turnstileEl?: ElementRef<HTMLDivElement>;
    private widgetId?: string;
    private turnstileToken: string | null = null;

  formData = { name: '', email: '', subject: '', message: '' };
    submitted = false;
    sending = false;
    errorMsg: string | null = null;

  ngAfterViewInit() {
        this.renderTurnstile();
  }

  ngOnDestroy() {
        try { if (this.widgetId) window.turnstile?.remove(this.widgetId); } catch { /* noop */ }
  }

  private renderTurnstile(attempt = 0) {
        const host = this.turnstileEl?.nativeElement;
        if (!host) return;
        if (!window.turnstile) {
                if (attempt < 40) setTimeout(() => this.renderTurnstile(attempt + 1), 250);
                return;
        }
        this.widgetId = window.turnstile.render(host, {
                sitekey: TURNSTILE_SITE_KEY,
                callback: (token: string) => { this.turnstileToken = token; },
                'error-callback': () => { this.turnstileToken = null; },
                'expired-callback': () => { this.turnstileToken = null; },
        });
  }

  onSubmit() {
        this.errorMsg = null;
        if (!this.turnstileToken) {
                this.errorMsg = this.i18n.t('contact.error');
                return;
        }
        this.sending = true;
        const payload = { ...this.formData, token: this.turnstileToken };
        this.http.post<{ok: boolean}>(this.mailerUrl, payload).subscribe({
                next: () => {
                          this.sending = false;
                          this.submitted = true;
                          this.formData = { name: '', email: '', subject: '', message: '' };
                          this.turnstileToken = null;
                          try { if (this.widgetId) window.turnstile?.reset(this.widgetId); } catch { /* noop */ }
                },
                error: (err) => {
                          this.sending = false;
                          this.errorMsg = this.i18n.t('contact.error');
                          this.turnstileToken = null;
                          try { if (this.widgetId) window.turnstile?.reset(this.widgetId); } catch { /* noop */ }
                          console.error(err);
                }
        });
  }

  contacts = [
    { icon: 'M', label: 'Email', labelKey: 'contact.card.email', value: 'brindanodem@gmail.com', href: 'mailto:brindanodem@gmail.com' },
    { icon: 'L', label: 'Location', labelKey: 'contact.card.location', value: 'Douala, Cameroon', href: '#' },
    { icon: 'in', label: 'LinkedIn', labelKey: '', value: 'linkedin.com/in/nodembrinda', href: 'https://www.linkedin.com/in/nodem-brinda-1476a1209' },
    { icon: 'GH', label: 'GitHub', labelKey: '', value: 'github.com/brindi-or', href: 'https://github.com/brindi-or' },
    { icon: 'GL', label: 'GitLab', labelKey: '', value: 'gitlab.afric.ca/BreeHD', href: 'https://gitlab.afric.ca/BreeHD' },
    { icon: 'P', label: 'Phone', labelKey: 'contact.card.phone', value: '+237 693 42 52 86', href: 'tel:+237693435286' }
      ];
}
