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

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '##', component: HomeComponent},
    {path: 'login', component:LoginComponent },
    {path: 'product', component:ProductComponent, canActivate: [authGuard] },
    {path: 'contact-us', component:ContactUsComponent },
    {path: 'about-us', component:AboutUsComponent },
    {path: 'faqs', component:FAQsComponent },
    {path: 'admin', component:AdminComponent, canActivate: [adminGuard]},
    {path: '**', component: HomeComponent},
];
