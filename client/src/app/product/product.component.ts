import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../_model/product';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {
  isLoggedIn = false;
  product: Product[];
  record_per_page = 5
  total_records = 0
  numbers: number[] = [];


  constructor(
    private productService: ProductService,
    private router: Router,
  ) { 
   
  }



  ngOnInit(): void {
    this.getProducts(0);
    this.getTotalCount();
  }


  getTotalCount(): void {
    this.productService.getTotalCount().subscribe(
      data => {
        this.total_records = data.length;
        for (let i = 0; i <= this.total_records; i += this.record_per_page) {
          this.numbers.push(i);
        }
      },
      err => {
        this.product = JSON.parse(err.error).message;
      }
    );
  }

  getProducts(page_number): void {
    this.productService.getAllProducts(page_number).subscribe(
      data => {
        console.log(data);
        this.product = data;
      },
      err => {
        this.product = JSON.parse(err.error).message;
      }
    );
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.getProducts(value);
    console.log('Selected value:', value);
  }

  delete(id: number): void {
    this.productService.delete(id).subscribe(
      data => {
        console.log(data);
        this.reloadPage();
      },
      err => {
        console.log(err);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
