import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input()
  product: Product;

  @Output()
  productSelected = new EventEmitter<Product>();

  public defaultImageUrl = 'assets/img/products/product-6.jpg';

  constructor() {}
}
