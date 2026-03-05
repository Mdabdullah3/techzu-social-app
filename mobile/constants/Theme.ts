// constants/Theme.ts
import { Dimensions } from "react-native";
import { PALETTE } from "./Colors";

const { width } = Dimensions.get("window");

export const COLORS = {
  primary: PALETTE.primary,
  background: PALETTE.black,
  surface: PALETTE.darkGrey,
  border: PALETTE.border,
  text: PALETTE.white,
  textMuted: PALETTE.muted,
  error: PALETTE.error,
};

export const SIZES = {
  radius: 12, // Sharp, modern corners
  padding: 20,
  isTablet: width > 600,
};

export const FONTS = {
  sm: 13,
  md: 16,
  lg: 22,
  xl: 34,
  bold: "800" as any,
};
