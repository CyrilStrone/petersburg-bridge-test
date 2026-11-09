import { publicAsset } from '@local/core/functions';

import { FC, memo } from 'react';

import {
  RubyWallpaperBottom,
  RubyWallpaperBuilding,
  RubyWallpaperChildren,
  RubyWallpaperCircle,
  RubyWallpaperCloud,
  RubyWallpaperRoad,
  RubyWallpaperRoot,
} from './ruby-wallpaper.styles';
import { IRubyWallpaperProps } from './ruby-wallpaper.types';

const BUILDING_PATTERN = publicAsset('library-pattern/building.png');
const CLOUD_PATTERN = publicAsset('library-pattern/cloud.png');
const ROAD_PATTERN = publicAsset('library-pattern/road.png');

export const RubyWallpaper: FC<IRubyWallpaperProps> = (props) => {
  return (
    <RubyWallpaperRoot>
      <MemoizedRubyWallpaper />
      <RubyWallpaperChildren>{props.children}</RubyWallpaperChildren>
    </RubyWallpaperRoot>
  );
};

const MemoizedRubyWallpaper: FC = memo(() => {
  return (
    <>
      <RubyWallpaperCircle />
      <RubyWallpaperBuilding $backgroundURL={BUILDING_PATTERN} />
      <RubyWallpaperCloud $backgroundURL={CLOUD_PATTERN} />
      <RubyWallpaperBottom />
      <RubyWallpaperRoad $backgroundURL={ROAD_PATTERN} />
    </>
  );
});

MemoizedRubyWallpaper.displayName = 'MemoizedRubyWallpaper';
