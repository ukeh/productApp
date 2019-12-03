import { Component, OnInit } from '@angular/core';
import { IProduct } from '../products/product.model';
import { ProductService } from '../ProductService';
import { Router } from '@angular/router';
import { LocalStorageService } from "angular-web-storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const key = "Status";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  ProductItem = new IProduct(null, null, null, null, null, null, null, null);
  registerForm: FormGroup;
  submitted = false;
  id: String;
  data: any = {};
  constructor(private productService: ProductService, private router: Router, private local: LocalStorageService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    if (this.local.get(key) != "Success") {
      this.router.navigate(['']);
    }

    else {
      this.id = this.productService.getId();
      this.productService.editProduct(this.id)
        .subscribe((result) => {
          this.data = JSON.parse(JSON.stringify(result));
          if (this.data.Status == "Success") {
            this.ProductItem = this.data.product;
            this.registerForm = this.formBuilder.group({
              productId: [this.ProductItem.productId, Validators.required],
              productName: [this.ProductItem.productName, Validators.required],
              productCode: [this.ProductItem.productCode, Validators.required],
              releaseDate: [this.ProductItem.releaseDate, Validators.required],
              description: [this.ProductItem.description, Validators.required],
              price: [this.ProductItem.price, Validators.required],
              starRating: [this.ProductItem.starRating, Validators.required],
              imageUrl: [this.ProductItem.imageUrl, Validators.required]
            });
          }
          else {
            alert("Error");
          }
        });




    }
  }
  onUpdate() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.ProductItem.productId = this.registerForm.get('productId').value;
    this.ProductItem.productName = this.registerForm.get('productName').value;
    this.ProductItem.productCode = this.registerForm.get('productCode').value;
    this.ProductItem.releaseDate = this.registerForm.get('releaseDate').value;
    this.ProductItem.description = this.registerForm.get('description').value;
    this.ProductItem.price = this.registerForm.get('price').value;
    this.ProductItem.starRating = this.registerForm.get('starRating').value;
    this.ProductItem.imageUrl = this.registerForm.get('imageUrl').value;

    this.productService.updateProduct(this.ProductItem)
      .subscribe((result) => {
        if (JSON.parse(JSON.stringify(result)).Status == "Success") {
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['products'])
          });
        }
        else {
          alert("Failed");
        }
      })
  }


}
