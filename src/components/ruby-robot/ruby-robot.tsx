import { publicAsset } from '@local/core/functions';

import { FC, memo } from 'react';

import { RubyRobotImg, RubyRobotWrapper } from './ruby-robot.styles';
import { IRubyRobotProps } from './ruby-robot.types';
import { RubyTowerLevel } from '../ruby-tower/ruby-tower.types';

const ROBOT_DEFAULT_PICTURE = publicAsset('library-gif/robot-default.gif');
const ROBOT_WIN_PICTURE = publicAsset('library-gif/robot-win.gif');
const ROBOT_WIN_SUPER_PICTURE = publicAsset('library-gif/robot-win-super.gif');

export const RubyRobot: FC<IRubyRobotProps> = memo((props) => {
  return (
    <RubyRobotWrapper>
      {props.level === null ? (
        <RubyRobotImg src={ROBOT_DEFAULT_PICTURE} alt='Robot' />
      ) : props.level !== RubyTowerLevel.RED_2 ? (
        <RubyRobotImg src={ROBOT_WIN_PICTURE} alt='Robot' />
      ) : (
        <RubyRobotImg src={ROBOT_WIN_SUPER_PICTURE} alt='Robot' />
      )}
    </RubyRobotWrapper>
  );
});
