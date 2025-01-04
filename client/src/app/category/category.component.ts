import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../_model/category';
import { CategoryService } from '../_services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isLoggedIn = false;
  category: Category[];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        console.log(data);
        this.category = data;
      },
      err => {
        this.category = JSON.parse(err.error).message;
      }
    );
  }

  delete(id: number): void {
    this.categoryService.delete(id).subscribe(
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
