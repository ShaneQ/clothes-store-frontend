import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SearchProductsService} from "../search-products.service";

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss']
})
export class ShopFilterComponent implements OnInit {
  searchForm: FormGroup
  sizes: Array<any> = [
    {name: 'XS', value: '2'},
    {name: 'S', value: '3'},
    {name: 'M', value: '4'},
    {name: 'L', value: '5'},
    {name: 'XL', value: '6'},
    {name: 'One Size', value: '1'}
  ];
  seasons: Array<any> = [
    {name: 'Winter', value: 1},
    {name: 'Summer', value: 2},
    {name: 'Spring & Fall', value: 3}
  ];
  colors: Array<any> = [
    {name: 'black', value: 1, code: 'something'},
    {name: 'white', value: 2},
    {name: 'grey', value: 3},
    {name: 'cream', value: 4},
    {name: 'brown', value: 5},
    {name: 'red', value: 6},
    {name: 'orange', value: 7},
    {name: 'yellow', value: 8},
    {name: 'green', value: 9},
    {name: 'blue', value: 10},
    {name: 'purple', value: 11},
    {name: 'pink', value: 12},
    {name: 'gold', value: 13},
    {name: 'silver', value: 14},
    {name: 'print', value: 15}

  ];
  categories: Array<any> = [
    {name: 'Dresses', value: 1},
    {name: 'Tops', value: 2},
    {name: 'Pants', value: 3},
    {name: 'Skirts', value: 4},
    {name: 'Jumpsuits & Rompers', value: 5},
    {name: 'Jackets & Coats', value: 6},
    {name: 'Bags', value: 7}
  ];

  constructor(private fb: FormBuilder, private _searchService: SearchProductsService) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      sizes: this.fb.array([]),
      colors: this.fb.array([]),
      seasons: this.fb.array([]),
      categories: this.fb.array([])

    })
  }

  filterProducts() {
    this._searchService.showResults();
  }

  sizeChange(e) {
    const checkArray: FormArray = this.searchForm.get('sizes') as FormArray;
    this.updateArray(e, checkArray)
    this._searchService.sizeClicked(this.searchForm.get('sizes').value.toString());
  }

  seasonChange(e) {
    const checkArray: FormArray = this.searchForm.get('seasons') as FormArray;
    this.updateArray(e, checkArray)
    this._searchService.seasonClicked(this.searchForm.get('seasons').value.toString());
  }

  categoryChange(e) {
    const checkArray: FormArray = this.searchForm.get('categories') as FormArray;
    this.updateArray(e, checkArray)
    this._searchService.categoryClicked(this.searchForm.get('categories').value.toString());
  }

  colourChange(e) {
    const checkArray: FormArray = this.searchForm.get('colors') as FormArray;
    this.updateArray(e, checkArray)
    this._searchService.colorClicked(this.searchForm.get('colors').value.toString());
  }

  clearColors() {
    const checkArray: FormArray = this.searchForm.get('colors') as FormArray;
    checkArray.clear()
    this._searchService.colorClicked('');
    this._searchService.showResults();
  }

  clearCategorys() {
    const checkArray: FormArray = this.searchForm.get('categories') as FormArray;
    checkArray.clear()
    this._searchService.categoryClicked('');
    this._searchService.showResults();
  }

  clearSeasons() {
    const checkArray: FormArray = this.searchForm.get('seasons') as FormArray;
    checkArray.clear()
    this._searchService.seasonClicked('');
    this._searchService.showResults();
  }

  clearSizes() {
    const checkArray: FormArray = this.searchForm.get('sizes') as FormArray;
    checkArray.clear()
    this._searchService.sizeClicked('');
    this._searchService.showResults();
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
