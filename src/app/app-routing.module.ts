import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './feature/product/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/product-list', pathMatch:'full'},
  { path: 'product-list', component: ProductListComponent},
  { path: '**', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
