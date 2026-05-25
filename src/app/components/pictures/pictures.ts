import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pictures',
  imports: [CommonModule],
  templateUrl: './pictures.html',
  styleUrl: './pictures.scss',
})
export class Pictures {

  lightboxOpen = false;
  activeImg:any = null;
  activeIndex = 0;

  photos = [
    {src:'assets/images/brinda-3.jpg',caption:'At work',span:'tall'},
    {src:'assets/images/brinda-1.jpg',caption:'Creative space',span:'tall'},
    {src:'assets/images/brinda-2.jpg',caption:'Style',span:''},
    {src:'assets/images/brinda-4.jpg',caption:'Off-duty',span:''},
  ];

  openLightbox(photo:any,index:any){
    this.activeImg = photo;
    this.activeIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(){
    this.activeImg = null;
    this.activeIndex = 0;
    this.lightboxOpen = false;
  }

  prev(){
    if(this.activeIndex > 0){
      this.activeIndex--;
    }
  }

  next(){
    if(this.activeIndex < this.photos.length - 1){
      this.activeIndex++;
    }
  }
}
