import { RubyRobotImg, RubyRobotProps, RubyRobotWrapper } from '.'
import RobotDefault from '/library-gif/robot-default.gif'
import RobotWinSuper from '/library-gif/robot-win-super.gif'
import RobotWin from '/library-gif/robot-win.gif'
import { ENUMRubyTowerLevel } from '@components/ruby-tower'
import { FC, memo } from 'react'

export const RubyRobot: FC<RubyRobotProps> = memo((props) => {
  return (
    <RubyRobotWrapper>
      {props.level === null ? (
        <RubyRobotImg src={RobotDefault} alt="Robot" />
      ) : props.level !== ENUMRubyTowerLevel.RED_2 ? (
        <RubyRobotImg src={RobotWin} alt="Robot" />
      ) : (
        <RubyRobotImg src={RobotWinSuper} alt="Robot" />
      )}
    </RubyRobotWrapper>
  )
})
