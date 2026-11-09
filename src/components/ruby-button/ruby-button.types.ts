import { IRubyTowerProps } from '@local/components/ruby-tower/ruby-tower.types';

export interface IRubyButtonProps extends IRubyTowerProps {
  isActive?: boolean;
  isStart?: boolean;
  handleReset: () => void;
  handleStart: () => void;
  handleHit: () => void;
}
