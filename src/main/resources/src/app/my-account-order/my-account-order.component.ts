import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../model/product";
import {BookingRequest} from "../model/bookingRequest";

@Component({
  selector: 'app-my-account-order',
  templateUrl: './my-account-order.component.html'
})
export class MyAccountOrderComponent implements OnInit {

  @Input()
  item: BookingRequest;

  @Output('itemSelected')
  itemEmitted = new EventEmitter<BookingRequest>();

  constructor() { }

  ngOnInit(): void {
  }

  getEndDate(): number {
    let number = this.item.startDate as unknown as number
    return number +864000000
  }
}
