import { Component, OnInit } from '@angular/core';
import {BookingService} from "../booking.service";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {BookingRequest} from "../model/bookingRequest";

@Component({
  selector: 'app-my-account-orders',
  templateUrl: './my-account-orders.component.html',
  providers:[BookingService]
})
export class MyAccountOrdersComponent implements OnInit {

  public items$: Observable<BookingRequest[]>;

  constructor(private __dataService : BookingService) { }

  ngOnInit(): void {
   this.getBookings()

  }

  getBookings(){
    this.items$ = this.__dataService.getBookings()
    this.items$.subscribe(request => console.log(request))
  }

  onItemSelected($item: BookingRequest) {
    console.log(BookingRequest);

  }
}
