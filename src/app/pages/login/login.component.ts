import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Input, Ripple, initTWE } from 'tw-elements';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private dataAttrMap: Map<string, string> = new Map()

  ngOnInit(): void {
    initTWE({ Input, Ripple })
  }

}
