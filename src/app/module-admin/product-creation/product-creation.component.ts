import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Size } from '../model/size';
import type { Image } from '../model/image';
import {productCategories, seasons, colours, sizes} from "../../model/arrays";

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss'],
  providers: [ProductService],
})
export class ProductCreationComponent implements OnInit {
  productForm: FormGroup;
  productCategories = [];
  seasons = [];
  public product$: Observable<Product>;
  public product: Product;
  public submitted: boolean;
  public saved: boolean;
  public hidden: boolean = false;
  public update: boolean = false;
  public productId: number;
  public created: boolean;
  constructor(
    private fb: FormBuilder,
    private _app: ProductService,
    private _route: ActivatedRoute,
    protected router: Router
  ) {}

  get f() {
    return this.productForm.controls;
  }
  get a(){
    return ((this.productForm.get('measurements') as FormGroup).controls)
  }
  get b(){
    return ((this.productForm.get('imgCover') as FormGroup).controls)
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.productForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('productId');
    this.product$ = this._app.getProduct(productId);
    this.initializeEmptyForm();
    if (productId) {
      this.productId = +productId;
      this.product$.subscribe((data) => {
        this.populateForm(data)
        this.hidden = data.hidden
      });
    }
  }

  hideProduct() {
    this._app.hide(this.productId).subscribe((data) => (this.hidden = true));
  }

  showProduct() {
    this._app.show(this.productId).subscribe((data) => (this.hidden = false));
  }

  deleteProduct() {
    this._app
      .delete(this.productId)
      .subscribe((data) => this.router.navigate(['base/shop']));
  }

  getNameControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getQuickDescriptionControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getDescriptionControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getFittingInfoControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getWashInfoControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getMaterialControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getBrandControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getDryCleanControl(value :boolean) : FormControl{
    return new FormControl(value, [Validators.required])
  }
  getProductCategoryControl(value : number){
    return new FormControl(value, [Validators.required])
  }
  getSeasonControl(value : number){
    return new FormControl(value, [Validators.required])
  }
  getColorControl(value : number){
    return new FormControl(value, [Validators.required])
  }
  getMeasurementChestControl(value :string) : FormControl{
      return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getMeasurementHipsControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getMeasurementWaistControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getMeasurementLengthControl(value :string) : FormControl{
    return new FormControl(value, [Validators.required, Validators.maxLength(250)])
  }
  getRetailPriceControl(value: number){
    return new FormControl(value, [Validators.required, Validators.pattern(/^[0-9.]/)])
  }
  getImageUrlControl(value: string){
    return new FormControl(value, [Validators.required, Validators.maxLength(150)])
  }
  private populateForm(product: Product) {
    this.product = product;
    this.update = true;
    this.productCategories = this.getProductCategories();
    this.seasons = this.getSeasons();
    this.productForm = this.fb.group({
      ignore: [],
      id: new FormControl(product.id, [Validators.required]),
      name: this.getNameControl(product.name),
      quickDesc: this.getQuickDescriptionControl(product.quickDesc),
      description: this.getDescriptionControl(product.description),
      fittingInfo: this.getFittingInfoControl(product.fittingInfo),
      washInfo: this.getWashInfoControl(product.washInfo),
      material: this.getMaterialControl(product.material),
      brand: this.getBrandControl(product.brand),
      imgCover: this.fb.group({
        url: this.getImageUrlControl(product.imgCover.url),
        id: product.imgCover.id,
      }),
      dryClean: this.getDryCleanControl(product.dryClean),
      productCategory: this.getProductCategoryControl(product.productCategory),
      color: this.getColorControl(product.color),
      season: this.getSeasonControl(product.season),
      retailPrice: this.getRetailPriceControl(product.retailPrice),
      measurements: this.fb.group({
        chest: this.getMeasurementChestControl(product.measurements.chest),
        hips: this.getMeasurementHipsControl(product.measurements.hips),
        waist: this.getMeasurementWaistControl(product.measurements.waist),
        length: this.getMeasurementLengthControl(product.measurements.length),
      }),
      sizes: this.fb.group({
        size1: [product.sizes.filter((size) => size.id_size == 1).length == 1],
        size2: [product.sizes.filter((size) => size.id_size == 2).length == 1],
        size3: [product.sizes.filter((size) => size.id_size == 3).length == 1],
        size4: [product.sizes.filter((size) => size.id_size == 4).length == 1],
        size5: [product.sizes.filter((size) => size.id_size == 5).length == 1],
        size6: [product.sizes.filter((size) => size.id_size == 6).length == 1],
      }),
      images: this.fb.array([]),
    });
    product.images.forEach((img) => this.populateImage(img.id, img.url));
  }

  private initializeEmptyForm() {
    this.productForm = this.fb.group({
      id: [],
      ignore: [],
      name: this.getNameControl('Testing'),
      quickDesc: this.getQuickDescriptionControl('Testing'),
      description: this.getDescriptionControl('Testing'),
      fittingInfo: this.getFittingInfoControl('Testing'),
      washInfo: this.getWashInfoControl('Testing'),
      material: this.getMaterialControl('Testing'),
      brand: this.getBrandControl('Some Brand'),
      imgCover: this.fb.group({
        url: this.getImageUrlControl(''),
        id: [],
      }),
      dryClean: this.getDryCleanControl(false),
      productCategory: this.getProductCategoryControl(1),
      color: this.getColorControl(1),
      season: this.getSeasonControl(1),
      retailPrice: this.getRetailPriceControl(0),
      measurements: this.fb.group({
        chest: this.getMeasurementChestControl("1"),
        hips: this.getMeasurementHipsControl("1"),
        waist: this.getMeasurementWaistControl("1"),
        length: this.getMeasurementLengthControl("1"),
      }),
      sizes: this.fb.group({
        size1: [false],
        size2: [false],
        size3: [false],
        size4: [false],
        size5: [false],
        size6: [false],
      }),
      images: this.fb.array([]),
    });
    this.productCategories = this.getProductCategories();
    this.seasons = this.getSeasons();
  }

  submit() {
    this.submitted = true;
    let f = this.productForm.value as Product;
    let sizes = this.convertSizes(this.productForm.value.sizes);
    if (this.productForm.invalid || sizes.length == 0 || f.images.length == 0) {
      console.log(this.findInvalidControls());
      console.log('Invalid form :' + this.productForm.invalid);
      console.log('Sizes Length ' + sizes.length);
      console.log('Images length :' + f.images.length);
      return;
    }

    let product = new Product(
      f.id,
      f.name,
      f.quickDesc,
      f.material,
      f.fittingInfo,
      f.washInfo,
      f.description,
      f.dryClean,
      f.measurements,
      f.imgCover,
      f.images,
      sizes,
      f.retailPrice,
      f.color,
      f.season,
      f.productCategory,
      this.hidden,
      f.brand
    );
    if (this.productForm.get('id').value) {
      this._app.updateProduct(product).subscribe((data) => (this.saved = true));
    } else {
      this._app.createProduct(product).subscribe((data) => {
        this.created = true;
      });
    }
  }

  newImage(id: number, url: string): FormGroup {
    return this.fb.group({
      id: id,
      url: url,
    });
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  addImage(image: Image) {
    this.images.push(this.newImage(image.id, image.url));
  }

  populateImage(id: number, url: string) {
    this.images.push(this.newImage(id, url));
  }

  removeImage(i: number) {
    this.images.removeAt(i);
  }

  getSizes(){
    return sizes;
  }

  getProductCategories() {
    return productCategories;
  }
  getSeasons() {
    return seasons;
  }

  getColours(){
    return colours;
  }

  private addSize(
    selectedSize: boolean,
    sizeInt: number,
    sizesArr: Array<any>
  ) {
    if (selectedSize) {
      if (this.product!!) {
        const foundSize = this.product.sizes.filter(
          (size) => size.id_size == sizeInt
        )[0];
        if (foundSize!!) {
          sizesArr.push(
            new Size(foundSize.id, sizeInt, null, foundSize.status)
          );
          return;
        }
      }
      sizesArr.push(new Size(null, sizeInt, null, 'STORED'));
    }
  }

  private convertSizes(value): Size[] {
    let sizes = [];
    this.addSize(value.size1, 1, sizes);
    this.addSize(value.size2, 2, sizes);
    this.addSize(value.size3, 3, sizes);
    this.addSize(value.size4, 4, sizes);
    this.addSize(value.size5, 5, sizes);
    this.addSize(value.size6, 6, sizes);
    return sizes;
  }

  onImageAdded(image: Image) {
    let formGroup = this.productForm.get('imgCover') as FormGroup;
    formGroup.patchValue({
      id: image.id,
      url: image.url,
    });
  }
}
