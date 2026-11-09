import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import {
  RubyThermometerBackground,
  RubyThermometerFilling,
  RubyThermometerFillingLine,
  RubyThermometerFillingWrapper,
  RubyThermometerLineContainer,
  RubyThermometerLineItem,
  RubyThermometerWrapper,
} from './ruby-thermometer.styles';
import { IRubyThermometerHandle, IRubyThermometerProps } from './ruby-thermometer.types';

export const RubyThermometer = forwardRef<IRubyThermometerHandle, IRubyThermometerProps>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillingRef = useRef<HTMLDivElement>(null);
  const fillingWrapperRef = useRef<HTMLDivElement>(null);

  const [lineCount, setLineCount] = useState(0);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const distance = props.distanceBetweenLines ?? 12;
    const update = () => {
      setLineCount(Math.floor(container.clientHeight / distance));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(container);

    return () => observer.disconnect();
  }, [props.distanceBetweenLines]);

  const getPercent = useCallback(() => {
    if (!fillingRef.current || !fillingWrapperRef.current) {
      return 0;
    }

    const currentHeight = fillingRef.current.clientHeight;
    setHeight(currentHeight);

    return (currentHeight / fillingWrapperRef.current.clientHeight) * 100;
  }, []);

  const reset = useCallback(() => {
    setHeight(null);
  }, []);

  useImperativeHandle(ref, () => ({ getPercent, reset }), [getPercent, reset]);

  return (
    <RubyThermometerWrapper>
      <RubyThermometerFillingWrapper ref={fillingWrapperRef}>
        <RubyThermometerFilling $isStart={props.isStart} ref={fillingRef} $height={height} $duration={props.duration}>
          <RubyThermometerFillingLine />
        </RubyThermometerFilling>
      </RubyThermometerFillingWrapper>
      <RubyThermometerBackground />
      <RubyThermometerLineContainer ref={containerRef}>
        {Array.from({ length: lineCount }, (_, index) => (
          <RubyThermometerLineItem key={index} />
        ))}
      </RubyThermometerLineContainer>
    </RubyThermometerWrapper>
  );
});

RubyThermometer.displayName = 'RubyThermometer';
