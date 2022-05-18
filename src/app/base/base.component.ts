import { Component } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  providers: [AppService]

})
export class BaseComponent {

  constructor(){}



}
