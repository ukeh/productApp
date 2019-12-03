import { Component, OnInit } from '@angular/core';
import { IProduct } from '../products/product.model';
import { ProductService } from '../ProductService';
import { Router } from '@angular/router';
import { LocalStorageService } from "angular-web-storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const key = "Status";

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  ProductItem = new IProduct(null, null, null, null, null, null, null, null);
  registerForm: FormGroup;
  submitted = false;
  constructor(private productService: ProductService, private router: Router, private local: LocalStorageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.local.get(key) != "Success") {
      this.router.navigate(['']);
    }
    else {
      this.registerForm = this.formBuilder.group({
        productId: ['', Validators.required],
        productName: ['', Validators.required],
        productCode: ['', Validators.required],
        releaseDate: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        starRating: ['', Validators.required],
        imageUrl: ['', Validators.required]
      });
    }
  }
  status: String;

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.ProductItem.productId=this.registerForm.get('productId').value;
    this.ProductItem.productName=this.registerForm.get('productName').value;
    this.ProductItem.productCode=this.registerForm.get('productCode').value;
    this.ProductItem.releaseDate=this.registerForm.get('releaseDate').value;
    this.ProductItem.description=this.registerForm.get('description').value;
    this.ProductItem.price=this.registerForm.get('price').value;
    this.ProductItem.starRating=this.registerForm.get('starRating').value;
    this.ProductItem.imageUrl=this.registerForm.get('imageUrl').value;

    this.productService.addProducts(this.ProductItem)
      .subscribe((data) => {
        console.log(JSON.parse(JSON.stringify(data)).Status);
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status == "Success") {
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['products']);})
        }
        else {
          alert(this.status);
        }


      });
      
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }



}
