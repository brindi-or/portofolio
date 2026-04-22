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
       { name:'Angular',level:40},
       { name:'TypeScript',level:40},
       { name:'SCSS / Tailwind',level:80},
       { name:'Vuejs',level:60},
      ]
    },
     {
      category: 'Backend',
      icon: '◉',
      skills: [
        { name: 'Laravel', level: 67 },
        { name: 'Python / Django', level: 68 },
        { name: 'Mysql / MongoDB', level: 65 },
        { name: 'REST APIs', level: 31 },
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: '◎',
      skills: [
        { name: 'Git & GitLab', level: 70 },
        { name: 'Linux / Bash', level: 60 },
      ]
    }
  ];

  tools = ['Docker','Windows', 'VSCode', 'Figma','Teams','Slack','PhpStorm','MobaXterm','Office 365','HeidiSQL'];

}
