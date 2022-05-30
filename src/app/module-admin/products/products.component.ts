import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Inventory} from '../model/inventory';
import {DataTableDirective} from "angular-datatables";
import {colours, inventoryStatus, sizes} from "../../model/arrays";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  public status :string;
  public inventory: Inventory[];

  constructor(private _service: ProductService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
    };
    this._service.findInventory().subscribe((data) => (this.inventory = data));
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const status = data[7]; // use data for the id column
      if (this.status == null) {
        return true

      } else if (status != null && status?.toUpperCase().includes(this.status.toUpperCase())) {
        return true;
      }

      return false;
    });

  }

  updateStatus(event: any, id: number, productId: number) {
    this._service.updateInventoryStatus(event.target.value, id, productId);
  }

  public getInventoryStatus(){
    return inventoryStatus;
  }

  public getColours(){
    return colours;
  }

  public getSizes(){
    return sizes
  }



  filterByStatus(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
