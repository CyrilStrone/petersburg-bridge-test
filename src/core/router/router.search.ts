export type ILayoutRouteRootSearch = Record<string, unknown>;

export const validateILayoutRouteRootSearch = (
  search: Record<keyof ILayoutRouteRootSearch, unknown>,
): ILayoutRouteRootSearch => {
  return search;
};
