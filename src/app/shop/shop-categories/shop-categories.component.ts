import {Component, OnInit} from '@angular/core';
import {ScriptService} from '../../services/script.service';

@Component({
  selector: 'app-shop-topbar',
  templateUrl: './shop-categories.component.html',
  providers: [ScriptService]
})
export class ShopCategoriesComponent implements OnInit {

  constructor(private _script: ScriptService) {
  }

  ngOnInit() {
    this._script.load('flickity').then(data => {
     // console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
