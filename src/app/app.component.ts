import { Component, effect, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  protected logoSrc!: string
  protected titleSrc!: string

  protected path!: string

  private onlyOnce: boolean = true

  private routerSubscription!: Subscription

  constructor(private readonly router: Router) { }


  ngOnInit(): void {
    setTimeout(() => {
      const html: HTMLElement = document.documentElement
      const body: HTMLElement = document.body
      if (html.classList.contains("first-load")) html.classList.remove("first-load")
      if (body.classList.contains("first-load")) body.classList.remove("first-load")
    }, 100)
    this.routerSubscription = this.router.events.subscribe(e => {
      if (e instanceof RoutesRecognized && this.onlyOnce) {
        this.path = e.url
        this.onlyOnce = false
      }
    })
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe()
  }




}
