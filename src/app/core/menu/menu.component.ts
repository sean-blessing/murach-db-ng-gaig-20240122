import { Component } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title: string = "Menu Component";
  menuItems: MenuItem[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem("Product", "/product/list", "Product List"),
      new MenuItem("Line Item List", "/line-item/list", "Line Item List")
    ];
  }
}
