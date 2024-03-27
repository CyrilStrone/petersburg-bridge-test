import styled, { css } from 'styled-components'

/****************************************** RubyButton *************************************************/
export const RubyButtonWrapper = styled.div`
  user-select: none;
  width: 172px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
`

export const RubyAnimationContainer = styled.div`
  width: 124px;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
`

export const RubyButtonStand = styled.img`
  width: 124px;
  height: 60px;
  background-size: cover;
`

export const RubyButtonButton = styled.svg<{
  $isActive?: boolean
}>`
  width: 67px;
  height: 36px;
  position: absolute;
  transition: all 0.2s ease;
  & #first {
    transition: all 0.2s ease;
  }
  ${(props) =>
    props.$isActive
      ? css`
          bottom: 20px;
          & #first {
            fill: transparent;
          }
        `
      : css`
          bottom: 34px;
        `}
`

export const RubyButtonHammer = styled.img<{
  $isActive?: boolean
  $isStart?: boolean
}>`
  object-fit: cover;
  width: 100px;
  height: 110px;
  position: absolute;
  transition: 0.1s linear;
  ${(props) =>
    props.$isActive
      ? css`
          transform: translate(22px, -32px) rotate(-90deg);
        `
      : props.$isStart
        ? css`
            transform: translate(52px, -52px) rotate(-38deg);
          `
        : css`
            transform: translate(88px, -50px);
          `};
  z-index: 1;
`

/****************************************** RubyInfo *************************************************/
export const RubyInfoContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  gap: 13px;
`

export const RubyInfoButton = styled.button<{
  $isActive?: boolean
  $isStart?: boolean
}>`
  height: 36px;
  width: 172px;
  user-select: none;
  transition: 0.2s;
  cursor: pointer;
  ${(props) =>
    !props.$isActive && props.$isStart
      ? css`
          border: 1px solid ${props.theme.colors.other.bb20a2};
          background-color: ${props.theme.colors.other.ffdf35};
          & span {
            color: ${props.theme.colors.other.bb20a2};
          }
        `
      : css`
          background-color: ${props.theme.colors.other.ff42e0};
          border: 1px solid ${props.theme.colors.white[100]};
        `};
`

export const RubyInfoText = styled.div`
  height: 32px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
