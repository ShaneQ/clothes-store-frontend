import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-details-admin',
  templateUrl: './product-details-admin.component.html',
  styleUrls: ['./product-details-admin.component.scss']
})
export class ProductDetailsAdminComponent implements OnInit {
  productId : number;

  constructor(    private _router: Router,
                  private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = Number(this._route.snapshot.paramMap.get('productId'));
  }

}
