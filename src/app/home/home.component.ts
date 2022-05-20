import {Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-home',
  providers: [AppService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent {


  constructor() {
  }

}
