import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {ScriptService} from '../services/script.service';
import {KeycloakService} from 'keycloak-angular';
import {ProductService} from '../services/product.service';
import {environment} from '../../environments/environment';
import SwiperCore, {Navigation, Pagination, Scrollbar, SwiperOptions} from "swiper";

SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['content.component.scss'],
  providers: [ScriptService, ProductService],
})
export class ContentComponent implements OnInit {
  config: SwiperOptions = {
    navigation: true,
    pagination: {clickable: true},
    scrollbar: {draggable: true},
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 3,
      },
      990: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      }
    }
  };
  public products$: Observable<Product[]>;
  noWrap = true;

  private baseUrl: string = environment.baseUrl;
  private location: string = window.location.href;

  constructor(
    private _script: ScriptService,
    private _keycloak: KeycloakService,
    private _dataService: ProductService
  ) {
  }

  ngOnInit() {
    this.getProducts();
    this._script.load("imgcomp").then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  getProducts() {
    this.products$ = this._dataService.loadProducts();
  }

  register(): void {
    let newLocation = this.location;
    if (newLocation === this.baseUrl) {
      newLocation = this.baseUrl + '/browser';
    }
    this._keycloak.register({redirectUri: newLocation});
  }
}
