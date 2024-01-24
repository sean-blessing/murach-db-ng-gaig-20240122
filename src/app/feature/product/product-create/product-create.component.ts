import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  title: string = "Product-Create";
  newProduct: Product = new Product();
  subscription!: Subscription;
  message?: string = undefined;

  constructor(
    private productSvc: ProductService,
    private router: Router
  ) {}
  
  save() {
    this.subscription = this.productSvc.get(this.newProduct.productCode).subscribe(
      resp => {
        this.subscription?.unsubscribe();
        if (!resp) {
          this.subscription = this.productSvc.create(this.newProduct).subscribe(
            resp => {
              this.newProduct = resp;
              this.router.navigateByUrl("/product/list");
            }
          );
        }
        else {
          this.message = "Product already exists for code:" + this.newProduct.productCode;
        }
      }
    );
  }
  
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
