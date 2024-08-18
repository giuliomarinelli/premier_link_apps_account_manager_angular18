import { ThemeStorage } from './../Models/interfaces-types/theme-storage.interface';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Theme } from '../Models/interfaces-types/theme.type';
import { ThemeOwner } from '../Models/interfaces-types/theme-owner.type';
import { ThemeChose } from '../Models/interfaces-types/theme-chose.type';



@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

  private _theme: WritableSignal<Theme> = signal<Theme>(this.getOsDefaultTheme())

  private _themeOwner: WritableSignal<ThemeOwner> = signal<ThemeOwner>("OS")

  private _chosenTheme: WritableSignal<ThemeChose> = signal<ThemeChose>("OS")

  constructor() {
    this.themeInit()
  }

  public get getTheme(): Theme {
    return this._theme()
  }

  public get getThemeOwner(): ThemeOwner {
    return this._themeOwner()
  }

  public get getChosenTheme(): ThemeChose {
    return this._chosenTheme()
  }

  public getEnabledThemeChose(): ThemeChose {
    const { themeOwner, theme } = this.getEnabledThemeStorage()
    return themeOwner === "OS" ? "OS" : theme as ThemeChose
  }

  public updateOsTheme(): void {
    const theme: Theme = this.getOsDarkModeMediaQuery().matches ? "dark" : "light"
    if (this._themeOwner() === "OS") this._theme.set(theme)
    console.log(this._theme())
    this.applyTheme(this._theme())
  }

  public set chooseTheme(chose: ThemeChose) {
    this._chosenTheme.set(chose)
    this._themeOwner.set(chose === "OS" ? chose : "User")
    if (this._themeOwner() === "OS") this.clearThemeConfig()
    let theme: Theme | undefined
    if (chose === "dark" && this._themeOwner() === "User") theme = "dark"
    if (chose === "light" && this._themeOwner() === "User") theme = "light"
    this._theme.set(this._themeOwner() === "User" ? theme as Theme : this.getOsDefaultTheme())
    if (this._themeOwner() === "User") this.saveThemeConfig(this._theme())
    this.applyTheme(this._theme())
  }

  private getThemeStorageList(): ThemeStorage[] {
    const themeList: ThemeStorage[] = [
      {
        theme: "light",
        themeOwner: 'User',
        isEnabled: false
      },
      {
        theme: "dark",
        themeOwner: 'User',
        isEnabled: false
      },
      {
        theme: this.getOsDefaultTheme(),
        themeOwner: 'OS',
        isEnabled: false
      }
    ]

    if (this._themeOwner() === "OS") {
      (themeList.find(ts => ts.themeOwner === this._themeOwner()) as ThemeStorage).isEnabled = true
    } else if (this._themeOwner() === "User") {
      (themeList.find(ts => ts.themeOwner === this._themeOwner() && ts.theme === this._theme()) as ThemeStorage).isEnabled = true
    }

    return themeList

  }

  private getEnabledThemeStorage(): ThemeStorage {
    return this.getThemeStorageList().find(ts => ts.isEnabled === true) as ThemeStorage
  }

  private themeInit(): void {
    if (this.isThereThemeConfig()) {
      this.restoreThemeConfig()
      this.applyTheme(this._theme())
      return
    }
    if (this._chosenTheme() === "OS") this.clearThemeConfig()
    this.applyTheme(this._theme())
  }

  public getOsDarkModeMediaQuery(): MediaQueryList {
    return window?.matchMedia('(prefers-color-scheme: dark)')
  }

  public getOsDefaultTheme(): Theme {
    return this.getOsDarkModeMediaQuery().matches ? "dark" : "light"
  }

  private applyTheme(theme: Theme): void {
    if (typeof document !== "undefined") {
      switch (theme) {
        case "dark":
          document.documentElement.classList.add("dark")
          document.documentElement.setAttribute("data-theme", "dark")
          break
        case "light":
          if (document.documentElement.classList.contains("dark")) document.documentElement.classList.remove("dark")
          if (document.documentElement.getAttribute("data-theme")) document.documentElement.removeAttribute("data-theme")
      }
    }
  }

  public saveThemeConfig(theme: Theme): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("__tw_mat_theme", theme)
    }
  }

  public restoreThemeConfig(): void {
    const themeConfig = localStorage?.getItem("__tw_mat_theme")
    if (typeof localStorage !== "undefined" && themeConfig) {
      const theme: Theme = themeConfig === "dark" || themeConfig === "light" ? themeConfig as Theme : "light"
      this._theme.set(theme)
      this._themeOwner.set("User")
    }
  }

  private clearThemeConfig(): void {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("__tw_mat_theme")
    }
  }

  private isThereThemeConfig(): boolean {
    if (typeof localStorage !== "undefined") {
      return !!localStorage.getItem("__tw_mat_theme")
    }
    return false
  }

}


