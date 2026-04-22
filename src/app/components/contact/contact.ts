import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})

export class Contact {
  formData = { name: '', email: '', subject: '', message: '' };
  submitted = false;
  sending = false;

  onSubmit() {
    this.sending = true;
    setTimeout(() => {
      this.sending = false;
      this.submitted = true;
      this.formData = { name: '', email: '', subject: '', message: '' };
    }, 1500);
  }

  contacts = [
    { icon: '✉', label: 'Email', value: 'brindanodem@gmail.com', href: 'mailto:brindanodem@gmail.com' },
    { icon: '📍', label: 'Location', value: 'Douala, Cameroon', href: '#' },
    { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/nodembrinda', href: 'https://www.linkedin.com/in/nodem-brinda-1476a1209' },
    { icon: '⌥', label: 'GitHub', value: 'github.com/brindi-or', href: 'https://github.com/brindi-or' },
    { icon: '⌥', label: 'GitLab', value: 'gitlab.com/breeHD', href: 'https://gitlab.afric.ca/BreeHD' },
    {icon:'📞',label:'Phone',value:'+237 693 42 52 86',href:'tel:+237693435286'}
  ];
}
