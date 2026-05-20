import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Pictures } from './components/pictures/pictures';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Navbar,Home,Projects,Skills,Pictures,Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('B-Portfolio');
}
