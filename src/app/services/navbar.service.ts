import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  navbarEvent = new Subject();

  getButtonClicked() {
    return this.navbarEvent.asObservable();
  }
}
