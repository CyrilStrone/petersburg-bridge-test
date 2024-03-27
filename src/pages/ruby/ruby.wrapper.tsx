import {
  RubyWallpaperBottom,
  RubyWallpaperBuilding,
  RubyWallpaperCircle,
  RubyWallpaperCloud,
  RubyWallpaperRoad,
  StyledRubyWrapper,
  RubyWrapperProps,
  StyledRubyChildren,
} from '.'
import BuildingPattern from '/library-pattern/building.png'
import CloudPattern from '/library-pattern/cloud.png'
import RoadPattern from '/library-pattern/road.png'
import { FC, memo } from 'react'

export const RubyWrapper: FC<RubyWrapperProps> = (props) => {
  return (
    <StyledRubyWrapper>
      <MemoizedRubyWallpaper />
      <StyledRubyChildren>{props.children}</StyledRubyChildren>
    </StyledRubyWrapper>
  )
}

export const MemoizedRubyWallpaper: FC = memo(() => {
  return (
    <>
      <RubyWallpaperCircle />
      <RubyWallpaperBuilding $backgroundURL={BuildingPattern} />
      <RubyWallpaperCloud $backgroundURL={CloudPattern} />
      <RubyWallpaperBottom />
      <RubyWallpaperRoad $backgroundURL={RoadPattern} />
    </>
  )
})
