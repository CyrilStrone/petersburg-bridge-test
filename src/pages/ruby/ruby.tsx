import { RubyBottom, RubyProps, RubyWrapper } from '.'
import { RubyButton } from '@components/ruby-button'
import { RubyRobot } from '@components/ruby-robot'
import { LevelList, RubyTower } from '@components/ruby-tower'
import { useRubyThermometer } from '@hooks/use-ruby-thermometer'
import { FC, useState } from 'react'

export const Ruby: FC<RubyProps> = (props) => {
  /****************************************** useState *************************************************/
  const [isStart, setIsStart] = useState<boolean>(false)

  /****************************************** Another *************************************************/
  const { RubyThermometerComponent, getFillingPercent, resetRubyThermometer } =
    useRubyThermometer({
      distanceBetweenLines: 12,
      duration: 2,
      isStart: isStart,
    })

  /****************************************** Handle functions *************************************************/
  const handleHit = () => {
    const fillingPercent = getFillingPercent()
    const level =
      LevelList.find((level) => fillingPercent <= level.getMaxPercent())
        ?.level || null
    props.setLevel(level)
  }
  const handleReset = () => {
    resetRubyThermometer()
    props.setLevel(null)
  }
  const handleStart = () => {
    setIsStart(true)
  }

  return (
    <RubyWrapper>
      <RubyTower level={props.level} />
      <RubyBottom>
        <RubyThermometerComponent />
        <RubyButton
          handleReset={handleReset}
          handleStart={handleStart}
          handleHit={handleHit}
          level={props.level}
          duration={0}
          isActive={!!props.level}
          isStart={isStart}
        />
        <RubyRobot level={props.level} />
      </RubyBottom>
    </RubyWrapper>
  )
}
