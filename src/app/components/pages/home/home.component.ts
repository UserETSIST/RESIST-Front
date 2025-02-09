import { Component } from '@angular/core';
import { HeaderComponent } from '../../page-sections/header/header.component';
import { FooterComponent } from '../../page-sections/footer/footer.component';
import { HeroSectionComponent } from '../../page-sections/hero-section/hero-section.component';
import { FeaturesComponent } from '../../page-sections/features/features.component';
import { BlogComponent } from '../../page-sections/blog/blog.component';
import { CustomersComponent } from '../../page-sections/customers/customers.component';


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, HeroSectionComponent,FeaturesComponent, BlogComponent, CustomersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() {}

  

}
