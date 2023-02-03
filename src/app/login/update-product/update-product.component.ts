import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  form: FormGroup;

  constructor(private fb:FormBuilder, private productsService: ProductsService, private router:Router, private route:ActivatedRoute){
    this.form = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      price: ['', Validators.required],
      stockCurrent: ['', Validators.required],
      stockMin: ['', Validators.required],
      stockMax: ['', Validators.required],
    })
  }
  response:Product;

  update():void {
    const name:string = this.form.value.name;
    const details:string = this.form.value.details;
    const price:number = this.form.value.price;
    const stockCurrent:number = this.form.value.stockCurrent;
    const stockMin:number = this.form.value.stockMin;
    const stockMax:number = this.form.value.stockMax;
    this.response = {id:this.route.snapshot.params["id"],name: name, details:details,price: price, stockCurrent: stockCurrent, stockMin:stockMin, stockMax:stockMax}
    this.productsService.updateProduct(this.response).subscribe((data)=> {
      if (typeof data === 'object'){
        alert('Actualización grasosa');
        this.router.navigate(['/shop'])
      }
      //this.userService.setAdmin(data.isAdmin) set the type of users
    })
  }
}
