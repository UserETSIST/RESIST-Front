import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/page-sections/header/header.component';
import { FooterComponent } from '../../components/page-sections/footer/footer.component';
import { HeroSectionComponent } from '../../components/page-sections/hero-section/hero-section.component';
import { FeaturesComponent } from '../../components/page-sections/features/features.component';
import { BlogComponent } from '../../components/page-sections/blog/blog.component';
import { CustomersComponent } from '../../components/page-sections/customers/customers.component';


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, HeroSectionComponent,FeaturesComponent, BlogComponent, CustomersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() {}

  

}
