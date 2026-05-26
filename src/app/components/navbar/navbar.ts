import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { I18n } from '../../i18n';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  i18n = inject(I18n);
  isScroll = false;
  menuOpen = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isScroll = window.scrollY > 60;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
