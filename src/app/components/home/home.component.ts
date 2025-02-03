import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { FeaturesComponent } from '../features/features.component';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, HeroSectionComponent,FeaturesComponent, BlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
