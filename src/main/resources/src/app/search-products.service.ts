import { Injectable,EventEmitter, Output  } from '@angular/core';
import {FormArray} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  @Output() sizeFilterClickedEvent = new EventEmitter<string>();

  sizeClicked(value :string) {
    this.sizeFilterClickedEvent.emit(value);
  }
}
