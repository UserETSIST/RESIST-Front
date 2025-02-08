import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/auth/components/login/login.component';
import { ProductComponent } from './components/pages/product/product.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '##', component: HomeComponent},
    {path: 'login', component:LoginComponent },
    {path: 'product', component:ProductComponent },
    {path: '**', component: HomeComponent},
];
