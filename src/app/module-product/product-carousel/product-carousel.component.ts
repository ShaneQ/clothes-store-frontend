import {Component, Input} from '@angular/core';
import {Image} from '../../model/image';
import SwiperCore, {Navigation, Pagination, Scrollbar, SwiperOptions} from "swiper";

SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html'
})
export class ProductCarouselComponent {
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: {clickable: true},
    scrollbar: {draggable: true}
  };
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  @Input()
  coverImage: Image;
  @Input()
  imagesAgain: Image[];

  onSlideChange() {
    console.log('slide change');
  }

}
