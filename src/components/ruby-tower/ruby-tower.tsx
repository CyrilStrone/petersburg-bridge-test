import { publicAsset } from '@local/core/functions';

import { FC, memo } from 'react';

import { LevelList, LevelListGap } from './ruby-tower.constants';
import {
  RubyTowerDiamond,
  RubyTowerLevelContainer,
  RubyTowerLevelFull,
  RubyTowerLevelItem,
  RubyTowerLevelLine,
  RubyTowerStar,
  RubyTowerWrapper,
} from './ruby-tower.styles';
import { IRubyTowerProps, RubyTowerLevel } from './ruby-tower.types';

const DIAMOND_PICTURE = publicAsset('library-picture/ruby-diamond.png');
const STAR_PICTURE = publicAsset('library-picture/ruby-star.png');
const TOWER_PICTURE = publicAsset('library-picture/ruby-tower.png');

export const RubyTower: FC<IRubyTowerProps> = memo((props) => {
  return (
    <RubyTowerWrapper $backgroundURL={TOWER_PICTURE}>
      <RubyTowerLevelFull $isActive={props.level === RubyTowerLevel.RED_2}>
        <RubyTowerStar $isShow={props.level === RubyTowerLevel.RED_2} $backgroundURL={STAR_PICTURE} />
        <RubyTowerDiamond $backgroundURL={DIAMOND_PICTURE} />
      </RubyTowerLevelFull>
      <RubyTowerLevelContainer $gap={LevelListGap}>
        {LevelList.map((item) => (
          <RubyTowerLevelItem
            key={item.level}
            $height={item.height}
            $width={item.width}
            $color={item.color}
            $defaultColor={item.defaultColor}
            $isActive={props.level ? item.level <= props.level : undefined}
          >
            <RubyTowerLevelLine $position='horizontal' />
            <RubyTowerLevelLine $position='vertical' />
          </RubyTowerLevelItem>
        ))}
      </RubyTowerLevelContainer>
    </RubyTowerWrapper>
  );
});
