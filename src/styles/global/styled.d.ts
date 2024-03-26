import 'styled-components'

interface IThemeProject {
  screens: {
    mobile: { width: string }
    tablet: { width: string }
    desktop: { width: string }
  }
  colors: {
    black: {
      100: string
      80: string
      60: string
      50: string
      40: string
      10: string
      5: string
    }
    white: {
      100: string
      80: string
      60: string
      50: string
      40: string
      10: string
      5: string
    }
    other: {
      ff4646: string
      bb20a2: string
      ffdf35: string
      ff42e0: string
      c53030: string
      f65a5a: string
      '0a0e68': string
    }
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeProject {}
}
