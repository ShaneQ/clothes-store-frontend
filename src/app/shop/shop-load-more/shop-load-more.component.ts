import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from "../../model/product";

@Component({
  selector: 'app-shop-load-more',
  templateUrl: './shop-load-more.component.html',
  styleUrls: ['./shop-load-more.component.scss'],
})
export class ShopLoadMoreComponent {
  constructor() {}
  @Output('increaseDisplay')
  eventEmitter = new EventEmitter();

  increaseDisplay(){
    this.eventEmitter.emit(null);
  }
}
