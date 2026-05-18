import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-contact',
    imports: [CommonModule,FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss',
})
  export class Contact {
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
                          this.errorMsg = 'Failed to send. Please try again later.';
                          console.error(err);
                }
        });
  }

  contacts = [
    { icon: 'M', label: 'Email', value: 'brindanodem@gmail.com', href: 'mailto:brindanodem@gmail.com' },
    { icon: 'L', label: 'Location', value: 'Douala, Cameroon', href: '#' },
    { icon: 'in', label: 'LinkedIn', value: 'linkedin.com/in/nodembrinda', href: 'https://www.linkedin.com/in/nodem-brinda-1476a1209' },
    { icon: 'GH', label: 'GitHub', value: 'github.com/brindi-or', href: 'https://github.com/brindi-or' },
    { icon: 'GL', label: 'GitLab', value: 'gitlab.com/breeHD', href: 'https://gitlab.afric.ca/BreeHD' },
    { icon: 'P', label: 'Phone', value: '+237 693 42 52 86', href: 'tel:+237693435286' }
      ];
}
