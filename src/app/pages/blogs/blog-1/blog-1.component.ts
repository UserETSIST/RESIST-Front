import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/page-sections/header/header.component';
import { FooterComponent } from '../../../components/page-sections/footer/footer.component';

@Component({
  selector: 'app-blog-1',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './blog-1.component.html',
  styleUrl: './blog-1.component.css'
})
export class Blog1Component {

}
