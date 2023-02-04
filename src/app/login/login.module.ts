import { NgModule } from '@angular/core';//decorador para los modulos
import { CommonModule } from '@angular/common';//importacion para los modulos
import { LoginComponentComponent } from './login-component/login-component.component';//importacion del componente d elogin
import { ReactiveFormsModule } from '@angular/forms';//importacion de materials
import { MatFormFieldModule } from '@angular/material/form-field';//importacion de material
import { MatButtonModule } from '@angular/material/button';//importacion de material
import {MatInputModule} from '@angular/material/input';//importacioon de material
import { RegisterComponent } from './register/register.component';//componente del register
import { UpdateAdminComponent } from './update-admin/update-admin.component';//componente del updateAdmin
import { UpdateProductComponent } from './update-product/update-product.component';//componente de updateProduct

//Materials
@NgModule({
  declarations: [//inicio de declaraciones
    LoginComponentComponent,
    RegisterComponent,
    UpdateAdminComponent,
    UpdateProductComponent
  ],//fin de declaraciones
  imports: [//comienzo importaciones
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],//fin de importaciones
  exports: [//inicio de la exportaciones
    LoginComponentComponent
  ]//fin de la exportaciones
})
export class LoginModule { }
