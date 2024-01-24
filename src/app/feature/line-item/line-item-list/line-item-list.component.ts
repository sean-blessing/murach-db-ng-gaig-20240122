import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LineItem } from 'src/app/model/line-item';
import { LineItemService } from 'src/app/service/line-item.service';

@Component({
  selector: 'app-line-item-list',
  templateUrl: './line-item-list.component.html',
  styleUrls: ['./line-item-list.component.css']
})
export class LineItemListComponent implements OnInit, OnDestroy{
  title: string = "LineItem-List";
  lis: LineItem[] = [];
  subscription: Subscription | undefined;

  constructor(private lineItemSvc: LineItemService) {}

  ngOnInit(): void {
    this.subscription = this.lineItemSvc.list().subscribe({
      next: (resp) => {
        this.lis = resp;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
