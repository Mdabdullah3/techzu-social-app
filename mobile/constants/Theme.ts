// constants/Theme.ts
import { Dimensions } from "react-native";
import { PALETTE } from "./Colors";

const { width, height } = Dimensions.get("window");

// Design Tokens
export const COLORS = {
  primary: PALETTE.indigo[500],
  background: PALETTE.black,
  surface: PALETTE.zinc[900],
  surfaceLight: PALETTE.zinc[800],
  text: PALETTE.white,
  textMuted: PALETTE.slate[400],
  error: PALETTE.red,
  success: PALETTE.green,
  border: PALETTE.zinc[800],
};

export const SIZES = {
  radius: 12,
  padding: 16,
  windowWidth: width,
  windowHeight: height,
  isTablet: width > 600,
};

export const FONTS = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  bold: "700",
};
