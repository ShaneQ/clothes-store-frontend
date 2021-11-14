import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {SearchProductsService} from "../search-products.service";

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss']
})
export class ShopFilterComponent implements OnInit {
  searchForm: FormGroup
  Sizes: Array<any> = [
    { name: 'XS', value: '2' },
    { name: 'S', value: '3' },
    { name: 'M', value: '4' },
    { name: 'L', value: '5' },
    { name: 'XL', value: '6' },
    { name: 'One Size', value: '1' }
  ];
  constructor(private fb: FormBuilder, private _searchService: SearchProductsService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      sizes: this.fb.array([])
    })
  }

  filterProducts(){
    let sizesArr = this.searchForm.get('sizes').value.toString()
    this._searchService.sizeClicked(sizesArr);
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.searchForm.get('sizes') as FormArray;

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
    this.filterProducts()
  }
}
