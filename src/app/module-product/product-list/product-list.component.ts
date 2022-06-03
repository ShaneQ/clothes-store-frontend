import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product';
import {SearchProductsService} from '../../services/search-products.service';

@Component({
  selector: 'app-product-list',
  providers: [AppService, ProductService],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products: Product[];
  public filteredProducts: Product[] = [];
  public filterBySizes: string;
  private filterByColor: string;
  private filterBySeason: string;
  private filterByCategory: string;
  private amountPerIncrement = 12;
  displayAmount: number;

  constructor(
    private _service: AppService,
    private _dataService: ProductService,
    private _searchService: SearchProductsService
  ) {
  }

  getProducts() {
    this._dataService.loadProducts().subscribe(data => {
      this.products = data;
      this.displayAmount = this.amountPerIncrement
    });
  }

  ngOnInit(): void {
    this.displayAmount = this.amountPerIncrement;
    this.getProducts();
    this._searchService.sizeFilterClickedEvent.subscribe((data: string) => {
      this.filterBySizes = data;
    });
    this._searchService.showResultsClickEvent.subscribe(() => {
      this._dataService.filterProducts(
        this.filterBySizes,
        this.filterByColor,
        this.filterBySeason,
        this.filterByCategory
      ).subscribe(data => {
        this.displayAmount = this.amountPerIncrement;
        this.products = data;
      });
    });
    this._searchService.colorFilterClickedEvent.subscribe((data: string) => {
      this.filterByColor = data;
    });
    this._searchService.seasonFilterClickedEvent.subscribe((data: string) => {
      this.filterBySeason = data;
    });
    this._searchService.categoryFilterClickedEvent.subscribe((data: string) => {
      this.filterByCategory = data;
    });
  }

  increaseDisplay() {
    this.displayAmount = this.displayAmount + this.amountPerIncrement;
  }

}
