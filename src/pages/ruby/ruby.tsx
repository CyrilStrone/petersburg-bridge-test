import { RubyBottom } from '.'
import { RubyButton } from '@components/ruby-button'
import { RubyRobot } from '@components/ruby-robot'
import {
  ENUMRubyTowerLevel,
  LevelList,
  RubyTower,
} from '@components/ruby-tower'
import { useRubyThermometer } from '@hooks/use-ruby-thermometer'
import { FC, useState } from 'react'

export const Ruby: FC = () => {
  /****************************************** useState *************************************************/
  const [isStart, setIsStart] = useState<boolean>(false)
  const [actualLevel, setActualLevel] = useState<ENUMRubyTowerLevel | null>(
    null
  )

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
    setActualLevel(level)
  }
  const handleReset = () => {
    resetRubyThermometer()
    setActualLevel(null)
  }
  const handleStart = () => {
    setIsStart(true)
  }

  return (
    <>
      <RubyTower level={actualLevel} />
      <RubyBottom>
        <RubyThermometerComponent />
        <RubyButton
          handleReset={handleReset}
          handleStart={handleStart}
          handleHit={handleHit}
          level={actualLevel}
          duration={0}
          isActive={!!actualLevel}
          isStart={isStart}
        />
        <RubyRobot level={actualLevel} />
      </RubyBottom>
    </>
  )
}
