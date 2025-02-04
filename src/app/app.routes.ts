import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '##', component: HomeComponent},
    {path: 'login', component:LoginComponent },
    {path: 'product', component:ProductComponent },
    {path: '**', component: HomeComponent},
];
