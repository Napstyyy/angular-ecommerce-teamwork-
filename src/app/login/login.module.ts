import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { UpdateProductComponent } from './update-product/update-product.component';

//Materials

@NgModule({
  declarations: [
    LoginComponentComponent,
    RegisterComponent,
    UpdateAdminComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    LoginComponentComponent
  ]
})
export class LoginModule { }
