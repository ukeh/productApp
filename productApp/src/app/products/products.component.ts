import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "angular-web-storage";
import { Router } from '@angular/router';
import { ProductService } from '../ProductService';
import { IProduct } from './product.model';






const key = "Status";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public local: LocalStorageService, private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
    if (this.local.get(key) != "Success") {
      this.router.navigate(['']);
    } else {
      
      this.productService.getProducts()
        .subscribe((data) => { this.products = JSON.parse(JSON.stringify(data)).products ;
          console.log("data:" + this.products);
        });
    
      
    }
  }
  Status: String;
  products: IProduct[];
  edit:string;
  max:number=5;


  flag: boolean = false;
  buttonText: String = "Show Image";
  buttonClick() {
    if (!this.flag) {
      this.flag = true;
      this.buttonText = "Hide Image";
    }
    else {
      this.flag = false;
      this.buttonText = "Show Image";
    }
  }

  editClick(id){
    //alert("hai"+id);
    this.productService.setId(id);
    this.router.navigate(['edit']);
  }

  deleteClick(id){
    this.productService.deleteProduct(id)
    .subscribe((result)=>{
      if(JSON.parse(JSON.stringify(result)).Status=="Success"){
      
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['products'])});
      }
      else{
        alert("Error");
      }
    })
  }
}
