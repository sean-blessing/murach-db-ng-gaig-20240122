import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from 'src/app/model/line-item';
import { LineItemService } from 'src/app/service/line-item.service';

@Component({
  selector: 'app-line-item-detail',
  templateUrl: './line-item-detail.component.html',
  styleUrls: ['./line-item-detail.component.css']
})
export class LineItemDetailComponent implements OnInit, OnDestroy{
  title: string = "LineItem-Detail";
  lineItem: LineItem = new LineItem();
  id: number = 0;
  subscription?: Subscription; 

  constructor(
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      parms => {
        this.id = parms["id"];
        this.subscription?.unsubscribe();
        if (this.id) {
          this.subscription = this.lineItemSvc.get(this.id).subscribe(
            resp => {
              this.lineItem = resp;
          });
        }
        else {
          console.log("Error: no id passed for lineItem detail.");
        }
      }
  );
  }

  delete() {
    this.subscription = this.lineItemSvc.delete(this.id).subscribe(
      resp => {
        this.lineItem = resp;
        this.router.navigateByUrl('/line-item/list');
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
