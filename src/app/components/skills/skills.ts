import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skillsElements=[
    {
      category:'Frontent',
      icon:'◈',
      skills:[
       { name:'React',level:70},
       { name:'Angular',level:50},
       { name:'TypeScript',level:40},
       { name:'SCSS / Tailwind',level:80},
      ]
    },
     {
      category: 'Backend',
      icon: '◉',
      skills: [
        { name: 'Laravel', level: 67 },
        { name: 'Python / Django', level: 68 },
        { name: 'REST & GraphQL APIs', level: 91 },
        { name: 'PostgreSQL / MongoDB', level: 83 },
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: '◎',
      skills: [
        { name: 'Git & GitLab', level: 70 },
        { name: 'Linux / Bash', level: 60 },
        { name: 'Docker', level: 74 },
        { name: 'Linux / Bash', level: 80 },
      ]
    }
  ];

  tools = ['Angular', 'React','MySql', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker','Windows', 'Git', 'Figma', 'Firebase'];

}
