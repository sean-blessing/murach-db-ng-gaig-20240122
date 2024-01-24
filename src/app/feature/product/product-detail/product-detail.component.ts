import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  title: string = "Product-Detail";
  product: Product = new Product();
  code: string = "";
  subscription!: Subscription;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
        parms => {
          this.code = parms["code"];
          this.subscription?.unsubscribe();
          if (this.code) {
            this.subscription = this.productSvc.get(this.code).subscribe(
              resp => {
                this.product = resp;
                this.subscription?.unsubscribe();
            });
          }
          else {
            console.log("Error: no code passed for product detail.");
          }
        }
    );
  }

  delete() {
    this.subscription = this.productSvc.delete(this.code).subscribe(
      resp => {
        this.product = resp;
        this.router.navigateByUrl('/product/list');
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
