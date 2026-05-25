import { Component, inject } from '@angular/core';
import { I18n } from '../../i18n';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  i18n = inject(I18n);
}
