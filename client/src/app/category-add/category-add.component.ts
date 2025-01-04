import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../_services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Category } from '../_model/category';

// import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-update-category',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  @Input() form: any = {};
  isSuccessful = false;
  categoryType = {};
  isSignUpFailed = false;
  errorMessage = '';
  isUpdate = false;

  category: Category = {
    category_id: null,
    category_name: '',
    category_description: ''
  };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdate = true;
      this.getCategory(id);
    }

  }

  getCategory(id): void {
    this.categoryService.getById(id).subscribe(
      data => {
        this.category = data[0];
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
      console.log("Gand marane ja raha hai idhar")

      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  updateCategory(): void {
    console.log("Category Upate")
    this.categoryService.update(this.category.category_id, { ...this.category, ...this.form }).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/category']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  addCategory(): void {
    this.categoryService.create(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/category']);
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
