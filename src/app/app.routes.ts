import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/auth/components/login/login.component';
import { ProductComponent } from './components/pages/product/product.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { FAQsComponent } from './components/pages/faqs/faqs.component';
import { AdminComponent } from './components/pages/AdminDashboard/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { Error404Component } from './components/pages/error-404/error-404.component';
import { ForibddenComponent } from './components/pages/foribdden/foribdden.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component:LoginComponent },
    {path: 'product', component:ProductComponent, canActivate: [authGuard] },
    {path: 'contact-us', component:ContactUsComponent },
    {path: 'about-us', component:AboutUsComponent },
    {path: 'faqs', component:FAQsComponent },
    {path: '403-forbidden', component:ForibddenComponent },
    {path: 'admin', component:AdminComponent, canActivate: [adminGuard]},
    {path: '**', component: Error404Component},
];
