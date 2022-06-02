import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BookingRequest} from '../model/bookingRequest';
import {BookingService} from '../services/booking.service';
import {ProductService} from '../services/product.service';
import {DataTableDirective} from "angular-datatables";
import {inventoryStatus, sizes} from "../../model/arrays";
import {ToastService} from "../../module-common/toast.service";
import {Observable} from "rxjs/Observable";

export enum Status {
  WAITING_COLLECTION,
  ACTIVE,
  COMPLETE,
  LATE_RETURN,
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
  providers: [BookingService, ProductService],
})
export class BookingsComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  status = Status;
  bookingStatus: string;
  public bookings: BookingRequest[];

  @Input()
  userId: string;

  @Input()
  productId: number;

  constructor(
    private _service: BookingService,
    private _productService: ProductService,
    private _toastService: ToastService
  ) {
  }

  public getSizes() {
    return sizes;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      order: [[ 0, 'des' ]]
    };
    if (this.userId!!) {
      this._service
      .getBookingsForUser(this.userId)
      .subscribe((data) => (this.bookings = data));
    } else if (this.productId!!) {
      this._service
      .getBookingsForProduct(this.productId)
      .subscribe((data) => (this.bookings = data));
    } else {
      this._service.getBookings().subscribe((data) => (this.bookings = data));
    }
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const status = data[1]; // use data for the id column
      const inventoryStatus = data[2]; // use data for the id column

      if (this.bookingStatus == null) {
        return true
      } else if (status != null && status?.toUpperCase().includes(this.bookingStatus.toUpperCase())) {
        return true;
      } else if (inventoryStatus != null && inventoryStatus?.toUpperCase().includes(this.bookingStatus.toUpperCase())) {
        return true;
      }

      return false;
    });
  }

  updateStatus(event: any, id: number) {
    this._service.updateBookingStatus(event.target.value, id)
    .catch((e: any) => Observable.call(this.showInventoryStatusErrorMessage()))
    .subscribe(data => this.showBookingStatusSuccessMessage());
  }

  updateInventoryStatus(event: any, inventoryId: number, productId: number) {
    this._productService.updateInventoryStatus(
      event.target.value,
      inventoryId,
      productId
    ).catch((e: any) => Observable.call(this.showBookingStatusErrorMessage()))
    .subscribe(data => {
      this.showInventoryStatusSuccessMessage()
    });
  }


  public getInventoryStatus() {
    return inventoryStatus
  }

  filterByStatus(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  showBookingStatusSuccessMessage() {
    this._toastService.showSuccess("Booking Status updated successfully")
  }

  showBookingStatusErrorMessage() {
    this._toastService.showError("Booking Status update error occurred")
  }

  showInventoryStatusSuccessMessage() {
    this._toastService.showSuccess("Inventory Status updated successfully")
  }

  showInventoryStatusErrorMessage() {
    this._toastService.showError("Inventory Status update error occurred")
  }
}
