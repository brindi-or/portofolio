import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { I18n } from '../../i18n';

@Component({
  selector: 'app-pictures',
  imports: [CommonModule],
  templateUrl: './pictures.html',
  styleUrl: './pictures.scss',
})
export class Pictures {
  i18n = inject(I18n);

  lightboxOpen = false;
  activeImg:any = null;
  activeIndex = 0;

  photos = [
    {src:'assets/images/brinda-3.jpg',captionKey:'pictures.cap.atwork',span:'tall'},
    {src:'assets/images/brinda-1.jpg',captionKey:'pictures.cap.creative',span:'tall'},
    {src:'assets/images/brinda-2.jpg',captionKey:'pictures.cap.style',span:''},
    {src:'assets/images/brinda-4.jpg',captionKey:'pictures.cap.offduty',span:''},
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
