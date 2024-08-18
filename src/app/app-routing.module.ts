import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, { path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// private themeSignal: WritableSignal<Theme> = signal(Theme.Light);

//   constructor() {
//     this.themeInit()
//   }

//   public get getThemeSignal(): WritableSignal<Theme> {
//     return this.themeSignal
//   }

//   public get getTheme(): Theme {
//     return this.themeSignal()
//   }

//   public themeInit(): void {
//     if (this.isThereThemeInLocalStorage()) {
//       const customTheme = this.detectCustomTheme()
//       if (this.detectCustomTheme()) {
//         const theme: Theme = <Theme>this.detectCustomTheme()
//         if (typeof localStorage !== "undefined") {
//           this.themeSignal.set(theme)
//         }
//       }
//     } else {
//       console.log('Theme' + this.detectOsDefaultTheme())
//       this.themeSignal.set(this.detectOsDefaultTheme())
//     }
//   }


//   public toggleTheme(): void {
//     const theme: Theme = this.themeSignal()
//     this.themeSignal.set(this.getToggleThemeValue(theme))
//     this.saveCustomThemeInLocalStorage(theme)
//   }

//   private getToggleThemeValue(theme: Theme): Theme {
//     if (theme === Theme.Light) return Theme.Light
//     return Theme.Dark
//   }

//   private detectOsDefaultTheme(): Theme {
//     const dark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     return dark ? Theme.Dark : Theme.Light;
//   }

//   private detectCustomTheme(): Theme | null {
//     if (typeof localStorage !== "undefined") {
//       const item: string | null | undefined = localStorage.getItem("__tw_theme")
//       if (!item) return null
//       return <Theme>Utils.getEnumFromValue(Theme, item)
//     }
//     return null
//   }

//   private saveCustomThemeInLocalStorage(theme: Theme): void {
//     if (typeof localStorage !== "undefined") {
//       localStorage.setItem("__tw_theme", Utils.getValueFromEnum(Theme, theme))
//     }
//   }

//   private isThereThemeInLocalStorage(): boolean {
//     return !!this.detectCustomTheme()
//   }



