import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/page-sections/header/header.component';
import { FooterComponent } from './components/page-sections/footer/footer.component';
import { FlowbiteService } from './services/flowbite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  flowbiteLoaded: boolean = false;
  title = 'RESIST-app';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');

    // Load Flowbite once when the application starts
    this.flowbiteService.loadFlowbite((flowbite: any) => {
      console.log('Flowbite loaded globally in AppComponent:', flowbite);
      this.flowbiteLoaded = true; // Set a flag indicating Flowbite is loaded
    });
  }
}
