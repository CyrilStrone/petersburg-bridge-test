import {
  ENUMRubyTowerLevel,
  LevelList,
  RubyTowerDiamond,
  RubyTowerLevel,
  RubyTowerLevelContainer,
  RubyTowerLevelFull,
  RubyTowerLevelLine,
  RubyTowerProps,
  RubyTowerStar,
  RubyTowerWrapper,
} from '.'
import DiamondPattern from '@assets/library-pattern/diamond.png'
import RubyTowerPattern from '@assets/library-pattern/ruby-tower.png'
import StarPattern from '@assets/library-pattern/star.png'
import { FC } from 'react'

export const RubyTower: FC<RubyTowerProps> = (props) => {
  return (
    <RubyTowerWrapper $backgroundURL={RubyTowerPattern}>
      <RubyTowerLevelFull $isActive={props.level === ENUMRubyTowerLevel.RED_2}>
        <RubyTowerStar
          $isShow={props.level === ENUMRubyTowerLevel.RED_2}
          $backgroundURL={StarPattern}
        />
        <RubyTowerDiamond $backgroundURL={DiamondPattern} />
      </RubyTowerLevelFull>
      <RubyTowerLevelContainer>
        {LevelList.map((e) => (
          <RubyTowerLevel
            $height={e.height}
            $width={e.width}
            $color={e.color}
            $defaultColor={e.defaultColor}
            $isActive={props.level && e.level <= props.level}
          >
            <RubyTowerLevelLine $position="horizontal" />
            <RubyTowerLevelLine $position="vertical" />
          </RubyTowerLevel>
        ))}
      </RubyTowerLevelContainer>
    </RubyTowerWrapper>
  )
}
