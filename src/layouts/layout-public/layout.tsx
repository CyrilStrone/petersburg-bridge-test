import { RubyWallpaper } from '@local/components/ruby-wallpaper';

import { Outlet } from '@tanstack/react-router';

import { LayoutPublicRoot } from './layout.styles';

export function LayoutPublic() {
  return (
    <LayoutPublicRoot>
      <RubyWallpaper>
        <Outlet />
      </RubyWallpaper>
    </LayoutPublicRoot>
  );
}
