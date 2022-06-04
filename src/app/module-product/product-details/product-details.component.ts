import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScriptService} from '../../services/script.service';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookingSummaryComponent} from '../../modal/booking-summary/booking-summary.component';
import {BookingRequest} from '../../model/bookingRequest';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../module-auth/auth.service';
import {Role} from "../../module-auth/roles";
import {colours, productCategories, seasons, sizes} from "../../model/arrays";
import {NotFoundError} from "../../errors/not-found-error";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ScriptService, ProductService],
})
export class ProductDetailsComponent implements OnInit {
  public id;
  public product: Product;
  public productOccasions: string;
  public member: boolean;
  public order: BookingRequest;
  public orderForm: FormGroup;
  public minDate: Date;
  public maxDate: Date;
  public isMemberInfoBtnVis: boolean;
  public remainingBookings: number;
  public submitted = false;
  public isLoggedIn = false;
  public hasActiveMembership = false;
  public productCategories = [];
  public colors = [];
  public seasons = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _scriptLoader: ScriptService,
    private _app: ProductService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));

    this.minDate = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 180);
    this.orderForm = this.formBuilder.group({
      size: ['', Validators.required],
      orderDate: ['', Validators.required],
      dispatch: ['', Validators.required],
    });
    this.productCategories = this.getProductCategories();
    this.colors = this.getColors();
    this.seasons = this.getSeasons();
  }

  public setSize(value: number) {
    this.orderForm.get('size').setValue(value);
  }

  async ngOnInit(): Promise<void> {
    this._authService.isLoggedIn().then(data => this.isLoggedIn = data);

    this.hasActiveMembership = this._authService
    .getUserRoles()
    .includes(Role[Role.scc_active_membership]);

    const productId = this._route.snapshot.paramMap.get('productId');
    this._app.getProduct(productId).subscribe(
      (data => {
        this.product = data
        if (this.product.sizes.length == 1) {
          this.setSize(this.product.sizes[0].id)
        }
      }),
      ((err: Error) => {
        if (err instanceof NotFoundError) {
          this._router.navigate(["404"])
        }
      }));

    this.remainingBookings = 0;
    this.order = new BookingRequest();
    this.order.product = this.product;
  }

  onSubmit() {
    this.submitted = true;
    if (this.orderForm.invalid) {
      console.log('invalid');
      return;
    }
    this.order.productId = this.product.id;
    const size = this.product.sizes.filter(
      (size) => size.id == this.orderForm.value.size
    )[0];
    this.order.productSize = size;
    this.order.product = this.product
    this.order.sizeName = this.getSizes()[size.id_size - 1].name;
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

  getSizes() {
    return sizes;
  }

  getProductCategories() {
    return productCategories
  }

  getSeasons() {
    return seasons;
  }

  getColors() {
    return colours
  }

  register() {
    this._authService.register();
  }
}
