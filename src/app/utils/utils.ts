import { Signal } from "@angular/core";

export class Utils {

  public static getEnumFromValue<T extends Record<string, string>>(enumType: T, value: any): T[keyof T] | undefined {
    const enumEntries = Object.entries(enumType) as [keyof T, string][];
    for (const [key, enumValue] of enumEntries) {
      if (enumValue === value) {
        return enumType[key]
      }
    }
    return undefined
  }

  public static getValueFromEnum<T extends Record<string, string>>(enumType: T, enumMember: T[keyof T]): any {
    const enumEntries = Object.entries(enumType) as [keyof T, string][];

    for (const [key, value] of enumEntries) {
      if (value === enumMember) {
        return value
      }
    }
    return undefined

  }

  public static getValuefromSignal<T>(signal: Signal<T>): T {
    return signal()
  }

}
