import { ThemeStorage } from './../Models/interfaces-types/theme-storage.interface';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Theme } from '../Models/interfaces-types/theme.type';
import { ThemeOwner } from '../Models/interfaces-types/theme-owner.type';
import { ThemeChose } from '../Models/interfaces-types/theme-chose.type';



@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

  private _theme = signal<Theme>(this.getOsDefaultTheme())

  private _themeOwner = signal<ThemeOwner>("OS")

  private _chosenTheme = signal<ThemeChose>("OS")

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

  public set chooseTheme(chose: ThemeChose) {
    this._chosenTheme.set(chose)
    this._themeOwner.set(chose === "OS" ? chose : "User")
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
    if (this._chosenTheme() === "OS") this.clearThemeConfig()
    if (this.isThereThemeConfig()) this.restoreThemeConfig()
    this.applyTheme(this._theme())
  }

  private getOsDarkModeMediaQuery(): MediaQueryList {
    return window?.matchMedia('(prefers-color-scheme: dark)')
  }

  private getOsDefaultTheme(): Theme {
    return this.getOsDarkModeMediaQuery().matches ? "dark" : "light"
  }

  private applyTheme(theme: Theme): void {
    if (typeof document !== "undefined") {
      switch (theme) {
        case "dark":
          document.documentElement.classList.add("dark")
          break
        case "light":
          if (document.documentElement.classList.contains("dark")) document.documentElement.classList.remove("dark")
      }
    }
  }

  private saveThemeConfig(theme: Theme): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("__tw_mat_theme", theme)
    }
  }

  private restoreThemeConfig(): void {
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
      this._theme.set(this.getOsDefaultTheme())
      this._themeOwner.set("OS")
    }
  }

  private isThereThemeConfig(): boolean {
    if (typeof localStorage !== "undefined") {
      return !!localStorage.getItem("__tw_mat_theme")
    }
    return false
  }

}


