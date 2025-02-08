import { Component } from '@angular/core';
import { HeaderComponent } from '../../page-sections/header/header.component';
import { FooterComponent } from '../../page-sections/footer/footer.component';
import { HeroSectionComponent } from '../../page-sections/hero-section/hero-section.component';
import { FeaturesComponent } from '../../page-sections/features/features.component';
import { BlogComponent } from '../../page-sections/blog/blog.component';


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, HeroSectionComponent,FeaturesComponent, BlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() {}

  

}
