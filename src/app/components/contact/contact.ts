import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18n } from '../../i18n';

@Component({
    selector: 'app-contact',
    imports: [CommonModule,FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss',
})
  export class Contact {
    i18n = inject(I18n);
    private http = inject(HttpClient);
    private readonly mailerUrl = 'https://brinda-mailer.apps.hirodiscount.com/send';

  formData = { name: '', email: '', subject: '', message: '' };
    submitted = false;
    sending = false;
    errorMsg: string | null = null;

  onSubmit() {
        this.sending = true;
        this.errorMsg = null;
        this.http.post<{ok: boolean}>(this.mailerUrl, this.formData).subscribe({
                next: () => {
                          this.sending = false;
                          this.submitted = true;
                          this.formData = { name: '', email: '', subject: '', message: '' };
                },
                error: (err) => {
                          this.sending = false;
                          this.errorMsg = this.i18n.t('contact.error');
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
