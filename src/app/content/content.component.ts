import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { ScriptService } from '../services/script.service';
import { KeycloakService } from 'keycloak-angular';
import { ProductService } from '../services/product.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['content.component.scss'],
  providers: [ScriptService, ProductService],
})
export class ContentComponent implements OnInit {
  public products$: Observable<Product[]>;
  displayAmount: number;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;

  private baseUrl: string = environment.baseUrl;
  private location: string = window.location.href;

  constructor(
    private _script: ScriptService,
    private _keycloak: KeycloakService,
    private _dataService: ProductService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this._dataService.loadProducts();
  }

  register(): void {
    let newLocation = this.location;
    if (newLocation === this.baseUrl) {
      newLocation = this.baseUrl + '/browser';
    }
    this._keycloak.register({ redirectUri: newLocation });
  }
}
