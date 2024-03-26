import styled from 'styled-components'

/****************************************** Ruby *************************************************/
export const RubyBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  z-index: 1;
  position: relative;
`

/****************************************** RubyWrapper *************************************************/
export const StyledRubyWrapper = styled.div`
  width: 360px;
  height: 640px;
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 100dvw;
  max-height: 100dvh;
  @media (max-width: ${(props) => props.theme.screens.tablet.width}) {
  }
`

export const StyledRubyChildren = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 100dvw;
  max-height: 100dvh;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  z-index: 1;
  gap: 36px;
`

export const RubyWallpaperBottom = styled.div`
  height: 490px;
  background: linear-gradient(
    rgba(5, 6, 35, 1) 0%,
    rgba(20, 24, 147, 1) 50%,
    rgba(20, 24, 147, 1) 60%,
    #0b0f71 100%
  );
  position: absolute;
  top: 370px;
  width: 100dvw;
`

export const RubyWallpaperCloud = styled.div<{ $backgroundURL: string }>`
  position: absolute;
  top: 60px;
  background-image: url(${(props) => props.$backgroundURL});
  height: 427px;
  width: 100dvw;
  background-repeat: repeat-x;
  background-position: center;
`

export const RubyWallpaperBuilding = styled.div<{ $backgroundURL: string }>`
  position: absolute;
  top: calc(370px - 171.57px);
  background-image: url(${(props) => props.$backgroundURL});
  height: 171.57px;
  min-height: 171.57px;
  width: calc(100dvw + 285px);
  background-repeat: repeat-x;
  background-position: center;
  margin-left: -220px;
`

export const RubyWallpaperCircle = styled.div`
  position: absolute;
  width: 640px;
  height: 640px;
  background: radial-gradient(
    closest-side,
    rgba(235, 38, 120, 1) 0%,
    rgba(142, 27, 203, 1) 45.83333432674408%,
    rgba(11, 15, 113, 1) 100%
  );
`

export const RubyWallpaperRoad = styled.div<{ $backgroundURL: string }>`
  position: absolute;
  background-image: url(${(props) => props.$backgroundURL});
  height: 169.6px;
  top: 370px;
  background-repeat: no-repeat;
  background-position: center;
  width: 100dvw;
`
