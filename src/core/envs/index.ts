const description = import.meta.env.VITE_DEFAULT_DESCRIPTION ?? 'Test task for Petersburg Bridge.';
const version = __APP_VERSION__;
const name = import.meta.env.VITE_DEFAULT_NAME ?? 'Petersburg Bridge Test';
const nameShort = import.meta.env.VITE_DEFAULT_NAME_SHORT ?? 'Petersburg Bridge';
const themeColor = import.meta.env.VITE_DEFAULT_THEME_COLOR ?? '#0b0f71';
const mode = import.meta.env.VITE_NODE_ENV ?? (import.meta.env.PROD ? 'prod' : 'dev');
const basePath = import.meta.env.BASE_URL;
const queryStaleTime = import.meta.env.VITE_QUERY_STALE_TIME;

export const env = {
  description,
  version,
  name,
  nameShort,
  themeColor,
  mode,
  basePath,
  queryStaleTime,
};
