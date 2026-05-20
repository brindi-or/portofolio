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
    {src:'assets/images/fl2.jpg',caption:'Love-in-a-mist',span:'wide'},
    {src:'assets/images/fl3.jpg',caption:'Soft roses bouquet',span:'tall'},
    {src:'assets/images/fl4.jpg',caption:'Plumeria in bloom',span:''},
    {src:'assets/images/fl5.jpg',caption:'Cosmos at sunset',span:''},
    {src:'assets/images/fl.png',caption:'Floral muse',span:'wide'},
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
