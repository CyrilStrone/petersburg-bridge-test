import styled, { css, keyframes } from 'styled-components'

/****************************************** RubyTower *************************************************/
export const RubyTowerWrapper = styled.div<{ $backgroundURL: string }>`
  width: -webkit-fill-available;
  height: min-content;
  background-image: url(${(props) => props.$backgroundURL});
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  padding-top: 22px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 7px;
`

export const RubyTowerLevelContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
`

export const RubyTowerLevel = styled.div<{
  $width: string
  $height: string
  $color: string
  $defaultColor: string
  $isActive?: boolean
}>`
  position: relative;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  ${(props) =>
    props.$isActive
      ? css`
          background-color: ${props.$color};
        `
      : css`
          background-color: ${props.$defaultColor};
        `}
  &:last-child {
    border-radius: 7px 7px 0px 0px;
  }
  transition: background-color 0.2s;
`

export const RubyTowerLevelLine = styled.div<{
  $position?: 'horizontal' | 'vertical'
}>`
  background-color: ${(props) => props.theme.colors.white[40]};
  box-sizing: border-box;
  position: absolute;
  ${(props) =>
    props.$position === 'horizontal'
      ? css`
          top: 2px;
          left: 1px;
          width: calc(100% - 3px);
          height: 3px;
        `
      : props.$position === 'vertical'
        ? css`
            top: 2px;
            right: 2px;
            height: calc(100% - 4px);
            width: 3px;
          `
        : ''};
`

export const RubyTowerLevelFull = styled.div<{
  $isActive?: boolean
}>`
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  width: 73px;
  height: 47px;
  transition: background-color 0.2s;
  ${(props) =>
    props.$isActive
      ? css`
          background: linear-gradient(
              180deg,
              rgba(255, 148, 148, 1) 0%,
              rgba(255, 1, 1, 1) 100%
            ),
            linear-gradient(to left, #080b3a, #080b3a);
        `
      : css`
          background: linear-gradient(
              180deg,
              rgba(182, 118, 203, 1) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            linear-gradient(to left, #080b3a, #080b3a);
        `};
  display: flex;
  align-items: center;
  justify-content: center;
`

const rotate = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const RubyTowerStar = styled.div<{
  $isShow?: boolean
  $backgroundURL?: string
}>`
  position: absolute;
  width: 124px;
  height: 124px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  z-index: 1;
  ${(props) =>
    props.$isShow && props.$backgroundURL
      ? css`
          background-image: url(${props.$backgroundURL});
        `
      : ''};
  animation: 1s linear 0s normal none infinite running ${rotate};
  -webkit-animation: 1s linear 0s normal none infinite running ${rotate};
`

export const RubyTowerDiamond = styled.div<{
  $backgroundURL: string
}>`
  position: absolute;
  width: 68px;
  height: 68px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  z-index: 1;
  background-image: url(${(props) => props.$backgroundURL});
`
