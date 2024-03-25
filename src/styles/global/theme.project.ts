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
    product: {
      100: '#5555E4ff',
      20: '#5555E41a',
    },
    danger: {
      100: '#FC5D5D',
      10: '#FC5D5D1a',
    },
    other: {
      f8f9fb: '#f8f9fbff',
      eef3fc: '#eef3fcff',
      f8f8f8: '#f8f8f8ff',
      e3e3e6: '#e3e3e6ff',
      cccccc: '#ccccccff',
      f3f5f7: '#f3f5f7ff',
      505050: '#505050ff',
      828282: '#828282ff',
      f5f5f5: '#f5f5f5ff',
      b7cbd7: '#b7cbd7ff',
      '8a8a8a': '#8a8a8aff',
      '1f1f1f': '#1f1f1fff',
      '2a2f3d': '#2a2f3dff',
    },
  },
}
