import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {Inventory} from "../model/inventory";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts;
  public inventory: Inventory[]

  constructor(private _service: ProductService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true
    };
    this._service.findInventory().subscribe(data => this.inventory = data)

  }

  updateStatus(event: any, id: number, productId: number) {
    this._service.updateInventoryStatus(event.target.value, id, productId)
  }

  public inventoryStatus =
    ["BOOKED",
      "IN_USE",
      "WAITING_RETURN",
      "STORED",
      "WASH",
      "DEACTIVATED"];

  public colors = [
    {name: 'black', id: 1},
    {name: 'white', id: 2},
    {name: 'grey', id: 3},
    {name: 'cream', id: 4},
    {name: 'brown', id: 5},
    {name: 'red', id: 6},
    {name: 'orange', id: 7},
    {name: 'yellow', id: 8},
    {name: 'green', id: 9},
    {name: 'blue', id: 10},
    {name: 'purple', id: 11},
    {name: 'pink', id: 12},
    {name: 'gold', id: 13},
    {name: 'silver', id: 14},
    {name: 'print', id: 15},

  ];

  public sizes: Array<any> = [
    {name: 'One Size', value: 1},
    {name: 'XS', value: 2},
    {name: 'S', value: 3},
    {name: 'M', value: 4},
    {name: 'L', value: 5},
    {name: 'XL', value: 6}

  ];


}
