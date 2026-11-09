import { RubyButton } from '@local/components/ruby-button';
import { RubyRobot } from '@local/components/ruby-robot';
import { RubyThermometer } from '@local/components/ruby-thermometer';
import { IRubyThermometerHandle } from '@local/components/ruby-thermometer/ruby-thermometer.types';
import { LevelList, RubyTower } from '@local/components/ruby-tower';
import { RubyTowerLevel } from '@local/components/ruby-tower/ruby-tower.types';

import { useRef, useState } from 'react';

import { RubyBottom, RubyGameRoot } from './game.styles';

export function PagePublicGame() {
  const [isStart, setIsStart] = useState(false);
  const [level, setLevel] = useState<RubyTowerLevel | null>(null);
  const thermometerRef = useRef<IRubyThermometerHandle>(null);

  const handleHit = () => {
    const fillingPercent = thermometerRef.current?.getPercent() ?? 0;
    const nextLevel = LevelList.find((item) => fillingPercent <= item.getMaxPercent())?.level ?? null;
    setLevel(nextLevel);
  };

  const handleReset = () => {
    thermometerRef.current?.reset();
    setLevel(null);
  };

  const handleStart = () => {
    setIsStart(true);
  };

  return (
    <RubyGameRoot>
      <RubyTower level={level} />
      <RubyBottom>
        <RubyThermometer ref={thermometerRef} distanceBetweenLines={12} duration={2} isStart={isStart} />
        <RubyButton
          handleReset={handleReset}
          handleStart={handleStart}
          handleHit={handleHit}
          level={level}
          isActive={!!level}
          isStart={isStart}
        />
        <RubyRobot level={level} />
      </RubyBottom>
    </RubyGameRoot>
  );
}
