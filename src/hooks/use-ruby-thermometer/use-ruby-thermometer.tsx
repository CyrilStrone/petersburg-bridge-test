import {
  RubyThermometerBackground,
  RubyThermometerFilling,
  RubyThermometerFillingLine,
  RubyThermometerFillingWrapper,
  RubyThermometerLineContainer,
  RubyThermometerLineItem,
  RubyThermometerProps,
  RubyThermometerWrapper,
} from '.'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'

export const useRubyThermometer = (props: RubyThermometerProps) => {
  /****************************************** useRef *************************************************/
  const containerRef = useRef<HTMLDivElement>(null)
  const fillingRef = useRef<HTMLDivElement>(null)
  const fillingWrapperRef = useRef<HTMLDivElement>(null)

  /****************************************** useState *************************************************/
  const [items, setItems] = useState<ReactElement[]>([])
  const [height, setHeight] = useState<number | null>(null)

  /****************************************** useEffect *************************************************/
  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.clientHeight
      const numberOfItems = Math.floor(
        height / (props.distanceBetweenLines ?? 12)
      )
      const items = Array.from({ length: numberOfItems }, (_, index) => (
        <RubyThermometerLineItem key={index} />
      ))
      setItems(items)
    }
  }, [containerRef, props.distanceBetweenLines])

  /****************************************** useCallback *************************************************/
  const getFillingPercent = useCallback(() => {
    if (fillingRef.current && fillingWrapperRef.current) {
      const result =
        (fillingRef.current.clientHeight /
          fillingWrapperRef.current.clientHeight) *
        100
      setHeight(fillingRef.current.clientHeight)
      return result
    }
    return 0
  }, [])

  const resetRubyThermometer = useCallback(() => {
    setHeight(null)
  }, [])

  const RubyThermometerComponent = () => (
    <RubyThermometerWrapper>
      <RubyThermometerFillingWrapper ref={fillingWrapperRef}>
        <RubyThermometerFilling
          $isStart={props.isStart}
          ref={fillingRef}
          $height={height}
          $duration={props.duration}
        >
          <RubyThermometerFillingLine />
        </RubyThermometerFilling>
      </RubyThermometerFillingWrapper>
      <RubyThermometerBackground />
      <RubyThermometerLineContainer ref={containerRef}>
        {items}
      </RubyThermometerLineContainer>
    </RubyThermometerWrapper>
  )

  return { RubyThermometerComponent, getFillingPercent, resetRubyThermometer }
}
