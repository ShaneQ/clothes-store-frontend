import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScriptService} from '../script.service';
import {ProductService} from '../product.service';
import {Product} from '../model/product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookingSummaryComponent} from '../modal/booking-summary/booking-summary.component';
import {Order} from '../model/order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var Flickity: any;

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
  public order: Order;
  public orderForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  public isMemberInfoBtnVis: boolean;
  public remainingBookings: number;
  public submitted = false;
  public rentalPreferenceMembership: boolean;
  get f() {
    console.log(this.orderForm.controls);
    return this.orderForm.controls;
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _scriptLoader: ScriptService,
    private _app: ProductService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private el: ElementRef) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 180);
    this.orderForm = this.formBuilder.group({
      size: ['', Validators.required],
      orderDate: ['', Validators.required],
      rental: ['', Validators.required],
      dispatch: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {


    const productId = this._route.snapshot.paramMap.get('productId');
    this.product = await this._app.getProduct(productId).toPromise();
    console.log(this.product)
 /*   this.productOccasions = this.product.occasions.map(x => x.occasion.name).join(',');
    */this.member = true;
    this.rentalPreferenceMembership = this.member;
    this.remainingBookings = 0;
    this.order = new Order(this.product, this.member);

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

    this.order.selectedSize = this.orderForm.value.size;
    this.order.date = this.orderForm.value.orderDate;
    this.order.rentalType = this.orderForm.value.rental;
    this.order.dispatch = this.orderForm.value.dispatch;
    console.log(this.order);
    const modalRef = this._modalService.open(BookingSummaryComponent);
    modalRef.componentInstance.order = this.order;
  }
}
