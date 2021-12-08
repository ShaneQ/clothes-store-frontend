import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: Product;

  @Output('productSelected')
  productEmitter = new EventEmitter<Product>();

  public defaultImageUrl = 'assets/img/products/product-6.jpg';

  constructor() { }

  ngOnInit() {
  }

}
