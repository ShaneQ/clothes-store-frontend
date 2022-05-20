import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Image} from "../../model/image";


@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  @Input()
  coverImage: Image;
  @Input()
  imagesAgain: Image[]


}
