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
    product: {
      100: string
      20: string
    }
    danger: {
      100: string
      10: string
    }
    other: {
      eef3fc: string
      f8f8f8: string
      e3e3e6: string
      cccccc: string
      f3f5f7: string
      505050: string
      828282: string
      f8f9fb: string
      f5f5f5: string
      b7cbd7: string
      '8a8a8a': string
      '1f1f1f': string
      '2a2f3d': string
    }
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeProject {}
}
