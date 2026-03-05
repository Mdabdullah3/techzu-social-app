// constants/Colors.ts
export const PALETTE = {
  primary: "#00BAFF", // Electric Sky Blue
  black: "#000000", // Pure OLED Black
  darkGrey: "#16181C", // Surface
  border: "#2F3336", // Thin Border (X-style)
  white: "#FFFFFF",
  muted: "#71767B", // X-style muted text
  error: "#F4212E", // Alert Red
};

export default {
  light: { text: "#000", background: "#fff", tint: PALETTE.primary },
  dark: { text: "#fff", background: "#000", tint: "#fff" },
};
