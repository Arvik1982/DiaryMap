export const allowedSnapIndexes = [-1, 0, 1, 2, 3];
export const SNAP_NDX_VALUES = [10, 50, 80]
export const isAllowedSnapIndex = (index: number | null): SnapIndex =>
    index === null ? null : allowedSnapIndexes.includes(index) ? (index as -1 | 0 | 1 | 2 | 3) : null;
export const SNAP_MAX = 3;
export const SNAP_MIDLE = 2;
export const SNAP_CLOSE = -1;
export const MOSCOW_COORDINATES = [55.751244, 37.618423];
export const LAT_INDEX = 0;
export const LON_INDEX = 1;