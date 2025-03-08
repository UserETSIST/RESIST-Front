import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/auth/components/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FAQsComponent } from './pages/faqs/faqs.component';
import { AdminComponent } from './pages/admin-dashboard/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { Error404Component } from './pages/error-404/error-404.component';
import { ForibddenComponent } from './pages/foribdden/foribdden.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RequestResetPasswordComponent } from './pages/request-reset-password/request-reset-password.component';
import { Blog1Component } from './pages/blogs/blog-1/blog-1.component';
import { Blog2Component } from './pages/blogs/blog-2/blog-2.component';
import { Blog3Component } from './pages/blogs/blog-3/blog-3.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component:LoginComponent },
    {path: 'product', component:ProductComponent},
    // {path: 'product', component:ProductComponent, canActivate: [authGuard] },
    {path: 'contact-us', component:ContactUsComponent },
    {path: 'request-reset-password', component:RequestResetPasswordComponent },
    {path: 'reset-password', component:ResetPasswordComponent },
    {path: 'about-us', component:AboutUsComponent },
    {path: 'faqs', component:FAQsComponent },
    {path: '403-forbidden', component:ForibddenComponent},
    {path: 'admin', component:AdminComponent},
    {path: 'blogs/blog-1', component:Blog1Component},
    {path: 'blogs/blog-2', component:Blog2Component},
    {path: 'blogs/blog-3', component:Blog3Component},
    // {path: 'admin', component:AdminComponent, canActivate: [adminGuard]},
    {path: '**', component: Error404Component},
];
