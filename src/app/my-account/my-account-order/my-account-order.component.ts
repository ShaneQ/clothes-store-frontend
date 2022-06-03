import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingRequest } from '../../model/bookingRequest';

@Component({
  selector: 'app-my-account-order',
  templateUrl: './my-account-order.component.html',
  styleUrls: ['./my-account-order.component.scss'],
})
export class MyAccountOrderComponent {
  @Input()
  item: BookingRequest;

  @Output()
  itemSelected = new EventEmitter<BookingRequest>();

  constructor() {}

  public convertStatusToReadable(str) {
    return str
      .toLowerCase()
      .replace(/(^|[^a-z0-9]+?)[a-z0-9]/gi, function (match) {
        if (match.length === 1) {
          // the 1st char
          return match.toUpperCase();
        }
        // char after special char
        return ' ' + match[1].toUpperCase();
      });
  }
}
