import { IThemeProject } from './styled'

export const themeProject: IThemeProject = {
  screens: {
    mobile: { width: '850px' },
    tablet: { width: '1024px' },
    desktop: { width: '2560px' },
  },
  colors: {
    black: {
      100: '#000000ff',
      80: '#000000cc',
      60: '#00000099',
      50: '#00000080',
      40: '#00000066',
      10: '#0000001a',
      5: '#0000000d',
    },
    white: {
      100: '#ffffffff',
      80: '#ffffffcc',
      60: '#ffffff99',
      50: '#ffffff80',
      40: '#ffffff66',
      10: '#ffffff1a',
      5: '#ffffff0d',
    },
    other: {
      ff4646: '#ff4646',
      bb20a2: '#bb20a2',
      ffdf35: '#ffdf35',
      ff42e0: '#ff42e0',
      c53030: '#c53030',
      f65a5a: '#f65a5a',
      '0a0e68': '#0a0e68',
    },
  },
}
