import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/page-sections/header/header.component';
import { FooterComponent } from '../../../components/page-sections/footer/footer.component';

@Component({
  selector: 'app-blog-2',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './blog-2.component.html',
  styleUrl: './blog-2.component.css'
})
export class Blog2Component {

}
