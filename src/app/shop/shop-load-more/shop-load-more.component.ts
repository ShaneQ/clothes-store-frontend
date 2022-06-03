import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-shop-load-more',
  templateUrl: './shop-load-more.component.html',
  styleUrls: ['./shop-load-more.component.scss'],
})
export class ShopLoadMoreComponent {
  constructor() {
  }

  @Output()
  private increaseDisplay = new EventEmitter();

  submitIncreaseDisplay() {
    this.increaseDisplay.emit(null);
  }
}
