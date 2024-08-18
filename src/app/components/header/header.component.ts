import { Component, effect } from '@angular/core';
import { ThemeManagerService } from '../../services/theme-manager.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { Theme } from '../../Models/interfaces-types/theme.type';

@Component({
  selector: '#toolbar',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected logoSrc!: string
  protected titleSrc!: string

  protected path!: string

  private onlyOnce = true

  private routerSubscription!: Subscription

  constructor(
    protected readonly themeManager: ThemeManagerService,
    private readonly router: Router
  ) {
    effect(() => {
      this.setLogoByTheme = this.themeManager.getTheme
    })
  }




  private osThemeChangeListener(): void {
    const mq = this.themeManager.getOsDarkModeMediaQuery()
    mq.addEventListener('change', () => {
      this.themeManager.updateOsTheme()
      this.setLogoByTheme = this.themeManager.getTheme
    })
  }

  private set setLogoByTheme(theme: Theme) {
    this.logoSrc = this.themeManager.getTheme === "light" ? "logo-light.png" : "logo-dark.png"
    this.titleSrc = this.themeManager.getTheme === "light" ? "title-light.png" : "title-dark.png"
  }

  ngOnInit(): void {
    this.osThemeChangeListener()
    this.setLogoByTheme = this.themeManager.getTheme
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
