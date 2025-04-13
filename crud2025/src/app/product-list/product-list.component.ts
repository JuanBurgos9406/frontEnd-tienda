import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { Producto } from '../models/model.interface';
import { ProductService } from '../services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [
    ConfirmationService,
    MessageService,
   
  ] ,
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    RatingModule,
    TagModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    IconFieldModule,
    InputIconModule
  ]
})
export default class ProductListComponent implements OnInit {

  private productService = inject(ProductService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  products: Producto[] = [];
  selectedProducts: Producto[] = [];
  productDialog: boolean = false;
  submitted: boolean = false;
  product: Producto = this.initProduct();

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.productService.list()
      .subscribe(products => this.products = products);
  }

  openNew() {
    this.product = this.initProduct();
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Producto) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Producto) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.nombre}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.delete(product.id)
          .subscribe(() => {
            this.loadAll();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          });
      }
    });
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.nombre?.trim()) {
      if (this.product.id) {
        this.productService.update(this.product, this.product.id)
          .subscribe(() => {
            this.loadAll();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          });
      } else {
        this.productService.create(this.product)
          .subscribe(() => {
            this.loadAll();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          });
      }
      this.productDialog = false;
      this.product = this.initProduct();
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  initProduct(): Producto {
    return {
      id: 0, 
      nombre: '',
      descripcion: '',
      precio: 0,
      cantidadDisponible: 0,
      foto: ''
    };
  }
}
