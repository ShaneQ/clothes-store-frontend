import { Component, Input } from '@angular/core';
import { BookingRequest } from '../../model/bookingRequest';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../services/booking.service';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss'],
  providers: [AppService, BookingService],
})
export class BookingSummaryComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private _dataService: BookingService,
    private _service: AppService,
    private _router: Router
  ) {}

  @Input() public order: BookingRequest;

  book() {
    return this._dataService.postBooking(this.order).subscribe(
      () => {
        this.activeModal.dismiss();
        this._router.navigate(['/account/orders']);
      },
      (err) => {
        //status 0 means it cant connect to the backend
        console.log(err.status);
      }
    );
  }
}
