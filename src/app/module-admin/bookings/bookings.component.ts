import {Component, Input, OnInit} from '@angular/core';
import {BookingRequest} from "../model/bookingRequest";
import {BookingService} from "../booking.service";
import {ProductService} from "../product.service";

export enum Status {
  WAITING_COLLECTION,
  ACTIVE,
  COMPLETE,
  LATE_RETURN
}

export namespace Status {

  export function keys(): Array<string> {
    const keys = Object.keys(Status);
    return keys.slice(keys.length / 2, keys.length - 1);
  }
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  providers: [BookingService, ProductService]
})
export class BookingsComponent implements OnInit {

  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts;
  status = Status;
  public bookings: BookingRequest[]

  @Input()
  userId: string;

  @Input()
  productId: number;

  sizes: Array<any> = [
    {name: 'One Size', value: 1},
    {name: 'XS', value: 2},
    {name: 'S', value: 3},
    {name: 'M', value: 4},
    {name: 'L', value: 5},
    {name: 'XL', value: 6}

  ];

  constructor(private _service: BookingService, private _productService: ProductService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true
    };
    if (this.userId!!) {
      this._service.getBookingsForUser(this.userId).subscribe(data => this.bookings = data);
    } else if (this.productId!!) {
      this._service.getBookingsForProduct(this.productId).subscribe(data => this.bookings = data);
    } else {
      this._service.getBookings().subscribe(data => this.bookings = data);
    }
  }

  updateStatus(event: any, id: number) {
    console.log("UPDATING STATUS")
    this._service.updateBookingStatus(event.target.value, id)
    console.log("UPDATED STATUS")

  }

  updateInventoryStatus(event: any, id: number, productId: number) {
    this._productService.updateInventoryStatus(event.target.value, id, productId)
  }

  public inventoryStatus =
    ["BOOKED",
      "IN_USE",
      "WAITING_RETURN",
      "STORED",
      "WASH",
      "DEACTIVATED"];
}
