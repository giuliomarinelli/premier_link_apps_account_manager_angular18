import { Injectable, Signal, signal } from '@angular/core';
import { Theme } from '../Models/enums/theme.enum';
import { Utils } from '../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme: Signal<Theme> = signal<Theme>(Theme.Light)

  constructor() {
    this.themeInit()
  }

  private themeInit(): void {
    console.log(this.detectOsTheme())
    console.log(this.isSavedCustomTheme())
  }

  private isSavedCustomTheme(): boolean {
    if (localStorage != undefined) {
      const strTheme: string | null = localStorage.getItem("__tw_theme")
      if (!strTheme || !Utils.getEnumFromValue(Theme, "__tw_theme")) return false
      return !!(strTheme as string)
    }
    return false
  }

  private get getSavedCustomThemeSignal(): Signal<Theme> {
    if (localStorage != undefined) {
      const strTheme: string | null = localStorage.getItem("__tw_theme")
      if (!strTheme || !Utils.getEnumFromValue(Theme, "__tw_theme")) return signal(Theme.Light)
    }
    return signal(Theme.Light)
  }

  private set setThemeSignal(theme: Theme) {
    this._theme = signal<Theme>(theme)
  }

  public get getThemeSignal(): Signal<Theme> {
    return this._theme
  }

  public detectOsTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
  }

  public setCustomTheme(theme: Theme): void {
    if (localStorage != undefined) {
      localStorage.setItem("__tw_theme", <string>Utils.getValueFromEnum(Theme, theme))
      if (document != undefined) {
        switch (theme) {
          case Theme.Light:

        }
      }
    }
  }


}
