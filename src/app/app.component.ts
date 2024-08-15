import { Component, OnInit } from '@angular/core';


import { Theme } from './Models/enums/theme.enum';
import { Utils } from './utils/utils';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'premier_link_apps_account_manager';

  constructor(private readonly themeService: ThemeService) { }

  ngOnInit(): void {




  }

}
