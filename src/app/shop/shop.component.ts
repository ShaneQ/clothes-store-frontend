import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  displayAmount: number;
  constructor() {}

  ngOnInit(): void {
    this.displayAmount = 12;
    console.log('SHOP PAGE ON INIT');
  }

  increaseDisplay(){
    console.log("LOADING MORE")
    this.displayAmount = this.displayAmount +12;
  }
}
