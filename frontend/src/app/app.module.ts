import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { SellProductsComponent } from './product-shop/sell-products/sell-products.component';
import { ProductsCatalogComponent } from './product-shop/products-catalog/products-catalog.component';
import { ShoppingChartComponent } from './product-shop/shopping-chart/shopping-chart.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import {MatRadioModule} from '@angular/material/radio';
import {Routes, RouterModule} from "@angular/router";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegistrationComponent} from "./user-registration/user-registration.component";
import {ProductShopComponent} from "./product-shop/product-shop.component";
import { HomeComponent } from './home/home.component';



const routes: Routes= [
  {path: 'Login', component: UserLoginComponent},
  {path: 'Registration', component: UserRegistrationComponent},
  {path: '', component: ProductShopComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    ProductShopComponent,
    SellProductsComponent,
    ShopCatalogueComponent,
    ShoppingChartComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    ProductShopComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatRadioModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
