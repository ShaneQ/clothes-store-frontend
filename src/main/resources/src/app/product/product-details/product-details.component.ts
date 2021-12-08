import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScriptService} from '../../script.service';
import {ProductService} from '../../product.service';
import {Product} from '../../model/product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookingSummaryComponent} from '../../modal/booking-summary/booking-summary.component';
import {BookingRequest} from '../../model/bookingRequest';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ScriptService, ProductService]
})
export class ProductDetailsComponent implements OnInit{
  public id;
  public product: Product;
  public productOccasions: string;
  public member: boolean;
  public order: BookingRequest;
  public orderForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  public isMemberInfoBtnVis: boolean;
  public remainingBookings: number;
  public submitted = false;

  productCategories = []
  colors = []
  seasons = []

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _scriptLoader: ScriptService,
    private _app: ProductService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 180);
    this.orderForm = this.formBuilder.group({
      size: ['', Validators.required],
      orderDate: ['', Validators.required],
      dispatch: ['', Validators.required],
    });
    this.productCategories = this.getProductCategories()
    this.colors = this.getColors()
    this.seasons = this.getSeasons()
  }


  async ngOnInit(): Promise<void> {

    const productId = this._route.snapshot.paramMap.get('productId');
    this.product = await this._app.getProduct(productId).toPromise();
    this.remainingBookings = 0;
    this.order = new BookingRequest()
    this.order.product = this.product

  }

  onMembershipClick(setting){
    if (!this.member){
      this.isMemberInfoBtnVis = setting;
    }
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      console.log('invalid');
      return;
    }
    this.order.productId = this.product.id
    this.order.productSize = this.orderForm.value.size;
    this.order.sizeName = this.sizes[this.orderForm.value.size].name
    this.order.startDate = this.orderForm.value.orderDate;
    this.order.rentalType = this.orderForm.value.rental;
    this.order.collectionPlace = this.orderForm.value.dispatch;
    const modalRef = this._modalService.open(BookingSummaryComponent);
    modalRef.componentInstance.order = this.order;
  }

  get f() {
    console.log(this.orderForm.controls);
    return this.orderForm.controls;
  }

  sizes: Array<any> = [
    {name: 'One Size', value: '1'},
    {name: 'XS', value: '2'},
    {name: 'S', value: '3'},
    {name: 'M', value: '4'},
    {name: 'L', value: '5'},
    {name: 'XL', value: '6'}

  ];

  getProductCategories() {
    return [
      {name: 'Dresses', id: '1'},
      {name: 'Tops', id: '2'},
      {name: 'Pants', id: '3'},
      {name: 'Skirts', id: '4'},
      {name: 'Jumpsuits & Rompers', id: '5'},
      {name: 'Jackets & Coats', id: '6'},
      {name: 'Bags', id: '7'},
    ];
  }
  getSeasons() {
    return [
      {name: 'Winter', id: '1'},
      {name: 'Spring', id: '2'},
      {name: 'Fall', id: '3'},
      {name: 'Summer', id: '4'}
    ];
  }
  getColors() {
    return [
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
  }
}