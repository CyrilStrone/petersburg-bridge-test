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
  LevelListGap,
} from '.'
import DiamondPicture from '@assets/library-picture/ruby-diamond.png'
import StarPicture from '@assets/library-picture/ruby-star.png'
import RubyTowerPicture from '@assets/library-picture/ruby-tower.png'
import { FC, memo } from 'react'

export const RubyTower: FC<RubyTowerProps> = memo((props) => {
  return (
    <RubyTowerWrapper $backgroundURL={RubyTowerPicture}>
      <RubyTowerLevelFull $isActive={props.level === ENUMRubyTowerLevel.RED_2}>
        <RubyTowerStar
          $isShow={props.level === ENUMRubyTowerLevel.RED_2}
          $backgroundURL={StarPicture}
        />
        <RubyTowerDiamond $backgroundURL={DiamondPicture} />
      </RubyTowerLevelFull>
      <RubyTowerLevelContainer $gap={LevelListGap}>
        {LevelList.map((e, index) => (
          <RubyTowerLevel
            key={index}
            $height={e.height}
            $width={e.width}
            $color={e.color}
            $defaultColor={e.defaultColor}
            $isActive={props.level ? e.level <= props.level : undefined}
          >
            <RubyTowerLevelLine $position="horizontal" />
            <RubyTowerLevelLine $position="vertical" />
          </RubyTowerLevel>
        ))}
      </RubyTowerLevelContainer>
    </RubyTowerWrapper>
  )
})
