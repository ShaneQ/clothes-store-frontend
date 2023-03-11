import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {ScriptService} from '../services/script.service';
import {KeycloakService} from 'keycloak-angular';
import {ProductService} from '../services/product.service';
import {environment} from '../../environments/environment';
import SwiperCore, {Navigation, Pagination, Scrollbar, SwiperOptions} from "swiper";
import {stuff} from '../model/shop';
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
    spaceBetween: 25,
    speed: 1000,
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      640: {
        slidesPerView: 3
      },
      990: {
        slidesPerView: 4
      }
    }
  };
  public products$: Observable<Product[]>;
  noWrap = true;

  private baseUrl: string = environment.baseUrl;
  private location: string = window.location.href;
  public productsNew: string[] = this.shuffleArray(stuff);

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

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
}
