import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from 'src/app/model/line-item';
import { Product } from 'src/app/model/product';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit, OnDestroy {
  title: string = 'Line-Item-Create';
  newLineItem: LineItem = new LineItem();
  subscription: Subscription | undefined;
  message?: string = undefined;
  products?: Product[] = undefined; 

  constructor(
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // load list of products for drop down
    this.subscription = this.productSvc.list().subscribe(
      resp => {
        this.products = resp;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  save() {
    // Make an assumption that the user will NOT add the same product +
    // invoice combo that already exists in the DB.
    this.subscription = this.lineItemSvc.create(this.newLineItem).subscribe(
      resp => {
        this.newLineItem = resp;
        this.router.navigateByUrl("/line-item/list");
      }
    );
  }
}
