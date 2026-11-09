export interface IRubyThermometerProps {
  distanceBetweenLines?: number;
  duration: number;
  isStart?: boolean;
}

export interface IRubyThermometerHandle {
  getPercent: () => number;
  reset: () => void;
}
