import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductCarouselComponent} from "./product-carousel/product-carousel.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {SwiperModule} from "swiper/angular";


@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductCarouselComponent
  ],
  exports: [
    ProductCarouselComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    CarouselModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    SwiperModule
  ]
})
export class ProductModule {
}
