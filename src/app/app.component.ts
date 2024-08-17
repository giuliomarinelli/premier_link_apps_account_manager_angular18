import { Component, OnInit, WritableSignal } from '@angular/core';
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

  constructor(protected readonly themeManager: ThemeManagerService) { }

  protected active1 = false
  protected active2 = false

  protected setActive(n: number) {
    this.active1 = false
    this.active2 = false
    switch (n) {
      case 1:
        this.active1 = true
        break
      case 2:
        this.active2 = true
    }
  }

  // private osThemeChangeListener(): void {
  //   const mq = this.themeManager.getOsMediaQueryList()
  //   mq.addEventListener('change', () => {
  //     this.themeManager.setReverseTheme("OS")
  //   })
  // }

  ngOnInit(): void {
    // console.log("tema corrente = " + this.themeManager.getTheme)
    // console.log("proprietario tema = " + this.themeManager.getThemeOwner)
    // console.log("impostazioni tema = " + this.themeManager.getChosenTheme)
    this.themeManager.chooseTheme = "light"
    // console.log("tema corrente = " + this.themeManager.getTheme)
    // console.log("proprietario tema = " + this.themeManager.getThemeOwner)
    // console.log("impostazioni tema = " + this.themeManager.getChosenTheme)
    // this.themeManager.chooseTheme = "OS"
    // console.log("tema corrente = " + this.themeManager.getTheme)
    // console.log("proprietario tema = " + this.themeManager.getThemeOwner)
    // console.log("impostazioni tema = " + this.themeManager.getChosenTheme)
    // this.themeManager.chooseTheme = "light"
    // console.log("tema corrente = " + this.themeManager.getTheme)
    // console.log("proprietario tema = " + this.themeManager.getThemeOwner)
    // console.log("impostazioni tema = " + this.themeManager.getChosenTheme)
    // this.themeManager.chooseTheme = "OS"
    // console.log("tema corrente = " + this.themeManager.getTheme)
    // console.log("proprietario tema = " + this.themeManager.getThemeOwner)
    // console.log("impostazioni tema = " + this.themeManager.getChosenTheme)
  }



}
