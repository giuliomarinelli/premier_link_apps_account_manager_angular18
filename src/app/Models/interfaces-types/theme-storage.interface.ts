import { ThemeOwner } from "./theme-owner.type";
import { Theme } from "./theme.type";

export interface ThemeStorage {

  theme: Theme | null
  themeOwner: ThemeOwner
  isEnabled: boolean

}
