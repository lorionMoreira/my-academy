// constants/colors.ts

export const COLORS = {
  redDark: "#7B1E22",
  redMedium: "#C63F4F",
  pinkLight: "#E3A2BA",
  pinkMedium: "#DC728C",
  white: "#FDFDFE",
  blueGrayLight: "#DBE7EC",
};

export const PALETTE = [
  COLORS.redDark,
  COLORS.redMedium,
  COLORS.pinkLight,
  COLORS.pinkMedium,
  COLORS.white,
  COLORS.blueGrayLight,
];

export const TABLE_COLORS = {
  white: "#FEFEFE",
  grayDark: "#939597",
  grayLight: "#EEEDEF",
  grayMedium: "#C4C5C9",
  grayNeutral: "#D8D9DB",
  graySoft: "#AEAFB1",
};

export const TABLE_PALETTE = [
  TABLE_COLORS.white,
  TABLE_COLORS.grayLight,
  TABLE_COLORS.grayMedium,
  TABLE_COLORS.grayNeutral,
  TABLE_COLORS.graySoft,
  TABLE_COLORS.grayDark,
];

/*
How to use it anywhere in your app:
import { COLORS, PALETTE } from "../constants/colors";

<View style={{ backgroundColor: COLORS.redMedium }}>
  <Text style={{ color: COLORS.white }}>Hello World</Text>
</View>

*/