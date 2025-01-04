import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './product/product.component';

import { ProductAddComponent } from './product-add/product-add.component';
import { PageLayoutComponent } from './page-layout/page-layout.component'; 
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category-add/category-add.component';


const routes: Routes = [

  { 
    path: '', 
    component: PageLayoutComponent ,
    children: [
      { path: 'addProduct', component: ProductAddComponent },
      { path: 'updateProduct/:id', component: ProductAddComponent },
      { path: 'product', component: ProductsComponent },
      { path: 'addCategory', component:  CategoryAddComponent},
      { path: 'category', component: CategoryComponent },
      { path: 'updateCategory/:id', component: CategoryAddComponent },
      { path: '**', redirectTo: '/product', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
