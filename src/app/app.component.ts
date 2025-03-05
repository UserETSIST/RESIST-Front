import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/page-sections/header/header.component';
import { FooterComponent } from './components/page-sections/footer/footer.component';
import { FlowbiteService } from './services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { INITIAL_CONFIG } from '@angular/platform-server';

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
    initFlowbite();
    console.log('AppComponent initialized');
    
  }
}
