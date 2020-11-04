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
import { SellProductsComponent } from './sell-products/sell-products.component';
import { ShoppingChartComponent } from './shopping-chart/shopping-chart.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import {MatRadioModule} from '@angular/material/radio';
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { ShopCatalogueComponent } from "./shop-catalogue/shop-catalogue.component";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProductAuthorizationComponent } from './product-authorization/product-authorization.component';
import {MatTableModule} from "@angular/material/table";
import {AdminGuard} from "./admin-guard";
import {LoginGuard} from "./login-guard";
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MyOffersComponent } from './sell-products/my-offers/my-offers.component';

const routes: Routes= [
  {path: 'Login', component: UserLoginComponent},
  {path: 'Registration', component: UserRegistrationComponent},
  {path: '', component: WelcomePageComponent},
  {path: 'Shop', component: ShopCatalogueComponent},
  {path: 'Sell', component: SellProductsComponent, canActivate: [LoginGuard]},
  {path: 'Authorize', component: ProductAuthorizationComponent, canActivate: [AdminGuard]}

]

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    SellProductsComponent,
    ShoppingChartComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    HomeComponent,
    ShopCatalogueComponent,
    WelcomePageComponent,
    ProductAuthorizationComponent,
    MyOffersComponent,
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
        RouterModule.forRoot(routes),
        MatTableModule,
        MatSliderModule
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
