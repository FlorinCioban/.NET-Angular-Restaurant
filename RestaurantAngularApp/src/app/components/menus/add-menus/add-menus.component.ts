import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu';
import { MenusService } from 'src/app/services/menus.service';
import { AddMenuDialogComponent } from '../../dialogs/add-menu-dialog/add-menu-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateMenusComponent } from '../update-menus/update-menus.component';

@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.scss'],
})
export class MenusComponent implements OnInit {
  public menus: Menu[] = [];
  public updateMenuGroup: Menu = {};
  public priceFilter = new FormControl('');

  public displayedColumns: string[] = [
    'name',
    'details',
    'preparationTime',
    'price',
    'actions',
  ];

  constructor(
    private menusService: MenusService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMenu();
  }

  private getMenu() {
    this.menusService.getMenus().subscribe((menu) => {
      this.menus = [...menu];
    });
  }

  public addMenu() {
    this.dialog
      .open(AddMenuDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.menusService.addMenu(result).subscribe(() => {
            this.getMenu();
          });
        }
      });
  }

  public updateMenu(menu: Menu) {
    this.dialog
      .open(UpdateMenusComponent, {
        data: menu,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.id = menu.id;
          result.preparationTime = Number(result.preparationTime);
          result.price = Number(result.price);
          this.menusService.updateMenu(result).subscribe(() => {
            this.getMenu();
          });
        }
        this.router.navigate(['/menus/edit', menu.id]);
      });
  }

  public deleteMenu(id: number) {
    this.dialog
      .open(DeleteConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        console.log('result --> ', result);
        if (result) {
          this.menusService.deleteMenu(id).subscribe((value) => {
            this.getMenu();
          });
        }
      });
  }

  public selectItem(menu: Menu) {
    this.updateMenuGroup = menu;
  }

  public handleFilterChange() {
    this.menusService.filterMenu(this.priceFilter.value).subscribe((value) => {
      this.menus = value;
    });
  }

  goToAddPage() {
    this.router.navigate(['menus/add']);
  }

  goToEditPage(menuId: number) {
    console.log('-->', menuId);
    this.router.navigate(['menus/update', menuId]);
  }
}
