import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { CategoryService } from '../_services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../_model/product';
import { Category } from '../_model/category';

// import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-update-product',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @Input() form: any = {};
  isSuccessful = false;
  productType = {};
  isSignUpFailed = false;
  errorMessage = '';
  isUpdate = false;

  product: Product = {
    product_id: null,
    product_title: '',
    product_category_id: '',
    product_price_per_item: '',
    product_description: ''
  };

  type: Category = {
    category_id: null,
    category_name: null,
    category_description: ''
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.form.product_category_id = 0;
    this.getProductType();
    if (id) {
      this.isUpdate = true;
      this.getProduct(id);
      this.form.product_category_id = 1;
    }

  }

  getProduct(id): void {
    this.productService.getById(id).subscribe(
      data => {
        this.product = data[0];
        this.form.product_category_id = data[0].product_category_id;
      },
      err => {
        console.log(err);
      }
    );

  }

  getProductType(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.type = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("ID  "+id)
    if (id) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  updateProduct(): void {
    console.log("Product Upate")
    this.productService.update(this.product.product_id, { ...this.product, ...this.form }).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/product']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  addProduct(): void {
    this.productService.create(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/product']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
