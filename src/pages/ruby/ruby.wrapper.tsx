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
import { FC } from 'react'

export const RubyWrapper: FC<RubyWrapperProps> = (props) => {
  return (
    <StyledRubyWrapper>
      <RubyWallpaperCircle />
      <RubyWallpaperBuilding $backgroundURL={BuildingPattern} />
      <RubyWallpaperCloud $backgroundURL={CloudPattern} />
      <RubyWallpaperBottom />
      <RubyWallpaperRoad $backgroundURL={RoadPattern} />
      <StyledRubyChildren>{props.children}</StyledRubyChildren>
    </StyledRubyWrapper>
  )
}
