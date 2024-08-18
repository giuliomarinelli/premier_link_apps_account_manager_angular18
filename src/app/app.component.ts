import { Component, effect, OnInit, WritableSignal } from '@angular/core';
import { Theme } from './Models/interfaces-types/theme.type';
import { ThemeManagerService } from './services/theme-manager.service';
import { ThemeOwner } from './Models/interfaces-types/theme-owner.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'premier_link_apps_account_manager';

  protected src!: string


  constructor(protected readonly themeManager: ThemeManagerService) {
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
    this.src = this.themeManager.getTheme === "light" ? "logo-light.png" : "logo-dark.png"
  }

  ngOnInit(): void {
    this.osThemeChangeListener()
    this.setLogoByTheme = this.themeManager.getTheme
    this.themeManager.chooseTheme = "light"
    this.themeManager.chooseTheme = "light"
    this.themeManager.chooseTheme = "light"
    this.themeManager.chooseTheme = "light"
    this.themeManager.chooseTheme = "light"
    this.themeManager.chooseTheme = "light"
    this.themeManager.chooseTheme = "light"
    this.themeManager.chooseTheme = "OS"
    this.themeManager.chooseTheme = "light"




  }



}
