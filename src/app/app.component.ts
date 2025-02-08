import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/page-sections/header/header.component';
import { FooterComponent } from './components/page-sections/footer/footer.component';
import { TableComponent } from './components/page-sections/table/table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RESIST-app';
}
