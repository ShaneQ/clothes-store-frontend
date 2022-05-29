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

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('productId');
    this.product$ = this._app.getProduct(productId);
    if (productId) {
      this.productId = +productId;
      this.product$.subscribe((data) => this.populateForm(data));
    } else {
      this.initializeEmptyForm();
    }
  }

  hideProduct() {
    this._app.hide(this.productId).subscribe((data) => (this.hidden = true));
  }

  showProduct() {
    this._app.unhide(this.productId).subscribe((data) => (this.hidden = false));
  }

  deleteProduct() {
    this._app
      .delete(this.productId)
      .subscribe((data) => this.router.navigate(['base/shop']));
  }

  private populateForm(product: Product) {
    this.product = product;
    this.update = true;
    this.productCategories = this.getProductCategories();
    this.seasons = this.getSeasons();
    this.productForm = this.fb.group({
      ignore: [],
      id: [product.id],
      name: [product.name, [Validators.required]],
      quickDesc: [product.quickDesc, [Validators.required]],
      description: [product.description, [Validators.required]],
      fittingInfo: [product.fittingInfo, [Validators.required]],
      washInfo: [product.washInfo, [Validators.required]],
      material: [product.material, [Validators.required]],
      brand: [product.brand, Validators.required],
      imgCover: this.fb.group({
        url: product.imgCover.url,
        id: product.imgCover.id,
      }),
      dryClean: product.dryClean,
      productCategory: [product.productCategory],
      color: [product.color],
      season: [product.season],
      retailPrice: [product.retailPrice, [Validators.required]],
      measurements: this.fb.group({
        chest: [product.measurements.chest, [Validators.required]],
        hips: [product.measurements.hips, [Validators.required]],
        waist: [product.measurements.waist, [Validators.required]],
        length: [product.measurements.length, [Validators.required]],
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
      name: ['Testing', [Validators.required]],
      quickDesc: ['Testing', [Validators.required]],
      description: ['Testing', [Validators.required]],
      fittingInfo: ['Testing', [Validators.required]],
      washInfo: ['Testing', [Validators.required]],
      material: ['Testing', [Validators.required]],
      brand: ['Some Brand', Validators.required],
      imgCover: this.fb.group({
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1kUVuAjGZ8a6N1Tz9m0i0zKXVkk0CTJnJslJu6Z3Pk17XqOdSyQ&s',
        id: [],
      }),
      dryClean: false,
      productCategory: [1],
      color: [1],
      season: [1],
      retailPrice: [0, [Validators.required]],
      measurements: this.fb.group({
        id: [],
        chest: [0, [Validators.required]],
        hips: [0, [Validators.required]],
        waist: [0, [Validators.required]],
        length: [0, [Validators.required]],
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

  sizes: Array<any> = [
    { name: 'One Size', value: 1 },
    { name: 'XS', value: 2 },
    { name: 'S', value: 3 },
    { name: 'M', value: 4 },
    { name: 'L', value: 5 },
    { name: 'XL', value: 6 },
  ];

  getProductCategories() {
    return [
      { name: 'Dresses', id: 1 },
      { name: 'Tops', id: 2 },
      { name: 'Pants', id: 3 },
      { name: 'Skirts', id: 4 },
      { name: 'Jumpsuits & Rompers', id: 5 },
      { name: 'Jackets & Coats', id: 6 },
      { name: 'Bags', id: 7 },
    ];
  }
  getSeasons() {
    return [
      { name: 'Winter', id: '1' },
      { name: 'Summer', id: '2' },
      { name: 'Spring & Fall', id: '3' }
    ];
  }
  public colors = [
    { name: 'black', id: 1 },
    { name: 'white', id: 2 },
    { name: 'grey', id: 3 },
    { name: 'cream', id: 4 },
    { name: 'brown', id: 5 },
    { name: 'red', id: 6 },
    { name: 'orange', id: 7 },
    { name: 'yellow', id: 8 },
    { name: 'green', id: 9 },
    { name: 'blue', id: 10 },
    { name: 'purple', id: 11 },
    { name: 'pink', id: 12 },
    { name: 'gold', id: 13 },
    { name: 'silver', id: 14 },
    { name: 'print', id: 15 },
  ];

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
