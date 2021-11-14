import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {ProductService} from '../product.service';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {SearchProductsService} from "../search-products.service";
import {Size} from "../model/size";

@Component({
  selector: 'app-product-list',
  providers: [AppService, ProductService],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products$: Observable<Product[]>;
  public allProducts$: Observable<Product[]>;
  public filteredProducts: Product[] = [];

  productCount: number;

  @Input()
  displayAmount: number;

  constructor(private _service: AppService, private _dataService: ProductService, private _searchService: SearchProductsService) {
    this.productCount = 0;
    if (!this.displayAmount) {
      this.displayAmount = 50;
    }
  }

  getProducts() {
    this.products$ = this._dataService.loadProducts();
    this.allProducts$ = this.products$
  }

  ngOnInit(): void {
    this.getProducts();
    this._searchService.sizeFilterClickedEvent
    .subscribe((data: string) => {
      if(data.length > 0){
        let b = data.split(',').map(function(item) {
          return parseInt(item, 10);
        });
        this.filterProducts(b)
      }else{
        this.products$ = this.allProducts$
      }
    });
  }


  filterProducts(sizes: number[]) {
    this.products$ = this.allProducts$.map(products => products.filter(product => this.filterSizes(product.sizes, sizes)))
  }

  filterSizes(sizes: Size[], sizeArr: Number[]):boolean{
    let sizeFound = sizes.filter(value => sizeArr.includes(value.id));
    if(sizeArr.length > 0 && sizeFound.length > 0){
      return true;
    }else{
      return false;
    }
  }

  loopThroughArray(size: Number, sizeArr: Number[]){
    console.log(size)
    console.log(sizeArr)
    return sizeArr.includes(size)

  }

  onProductSelected(product: Product) {
    console.log('Card was selected');
    console.log(product);

  }
}
