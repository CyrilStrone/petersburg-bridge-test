import styled, { css, keyframes } from 'styled-components'

/****************************************** RubyThermometer *************************************************/
export const RubyThermometerWrapper = styled.div`
  width: 40px;
  height: 147px;
  border: 1px solid #0a0e68;
  background-color: #c3e5f5;
  border-radius: 4px;
  padding: 7px 10px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

export const RubyThermometerFillingWrapper = styled.div`
  position: absolute;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  bottom: 3px;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const height = keyframes`
   0% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
`

export const RubyThermometerFilling = styled.div<{
  $height?: number | null
  $duration: number
  $isStart?: boolean
}>`
  width: 100%;
  transition: height 0.1s;
  background-color: #00d355;
  border-radius: 2px;
  position: relative;
  display: flex;
  justify-content: center;
  ${(props) =>
    !props.$height && props.$isStart
      ? css`
          animation: ${props.$duration}s linear 0s normal none infinite running
            ${height};
          -webkit-animation: ${props.$duration}s linear 0s normal none infinite
            running ${height};
        `
      : css`
          height: ${props.$height}px;
        `}
`

export const RubyThermometerFillingLine = styled.div`
  width: 130%;
  min-width: 130%;
  background-color: ${(props) => props.theme.colors.white[100]};
  height: 3px;
  border-radius: 3px;
`

export const RubyThermometerBackground = styled.div`
  position: absolute;
  height: calc(100% - 9px);
  width: 14px;
  left: 4px;
  top: 4px;
  background-color: ${(props) => props.theme.colors.white[60]};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`

export const RubyThermometerLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  z-index: 2;
`

export const RubyThermometerLineItem = styled.div`
  width: 20px;
  border: 0.5px solid #63b6df;
`
