import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {AppService} from "./app.service";
import {BookingRequest} from "./model/bookingRequest";
import {Observable} from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private privateUrl = environment.resourceUrl +'private/booking';
  private privateUrlBookings = environment.resourceUrl +'private/bookings';

  constructor(private _service: AppService) { }

  postBooking(request: BookingRequest) : Observable<any> {
    return this._service.postBookingResource(request, this.privateUrl)
  }

  getBookings(): Observable<BookingRequest[]>{
    return this._service.getBookingsResource(this.privateUrlBookings);
  }

}
