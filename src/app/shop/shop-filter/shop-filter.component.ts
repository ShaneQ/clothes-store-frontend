import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SearchProductsService} from '../../services/search-products.service';
import {colours, productCategories, seasons, sizes} from "../../model/arrays";

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss'],
})
export class ShopFilterComponent implements OnInit {
  searchForm: FormGroup;
  isCollapsed: boolean = false;
  isTrue: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _searchService: SearchProductsService
  ) {
  }

  collapseSeason() {
    console.log(this.isTrue + " isTrue");
    this.isTrue = false
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      sizes: this.fb.array([]),
      colors: this.fb.array([]),
      seasons: this.fb.array([]),
      categories: this.fb.array([]),
    });
  }

  filterProducts() {
    this._searchService.showResults();
    this.collapseSeason()
  }

  sizeChange(e) {
    const checkArray: FormArray = this.searchForm.get('sizes') as FormArray;
    this.updateArray(e, checkArray);
    this._searchService.sizeClicked(
      this.searchForm.get('sizes').value.toString()
    );
  }

  seasonChange(e) {
    const checkArray: FormArray = this.searchForm.get('seasons') as FormArray;
    this.updateArray(e, checkArray);
    this._searchService.seasonClicked(
      this.searchForm.get('seasons').value.toString()
    );
  }

  categoryChange(e) {
    const checkArray: FormArray = this.searchForm.get(
      'categories'
    ) as FormArray;
    this.updateArray(e, checkArray);
    this._searchService.categoryClicked(
      this.searchForm.get('categories').value.toString()
    );
  }

  colourChange(e) {
    const checkArray: FormArray = this.searchForm.get('colors') as FormArray;
    this.updateArray(e, checkArray);
    this._searchService.colorClicked(
      this.searchForm.get('colors').value.toString()
    );
  }

  clearColors() {
    const checkArray: FormArray = this.searchForm.get('colors') as FormArray;
    checkArray.clear();
    this._searchService.colorClicked('');
    this._searchService.showResults();
  }

  clearCategories() {
    const checkArray: FormArray = this.searchForm.get(
      'categories'
    ) as FormArray;
    checkArray.clear();
    this._searchService.categoryClicked('');
    this._searchService.showResults();
  }

  clearSeasons() {
    const checkArray: FormArray = this.searchForm.get('seasons') as FormArray;
    checkArray.clear();
    this._searchService.seasonClicked('');
    this._searchService.showResults();
  }

  clearSizes() {
    const checkArray: FormArray = this.searchForm.get('sizes') as FormArray;
    checkArray.clear();
    this._searchService.sizeClicked('');
    this._searchService.showResults();
  }

  public getSizes(){
    return sizes;
  }

  public getSeasons(){
    return seasons;
  }

  public getColours(){
    return colours;
  }

  getProductCategories(){
    return productCategories
  }

  updateArray(e, checkArray: FormArray) {
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
