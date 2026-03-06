export const PALETTE = {
  primary: "#08FFFF", // Electric Violet
  primaryGlow: "rgba(168, 85, 247, 0.15)",
  background: "#050505", // Pure Black
  surface: "#0F0F0F", // Base Surface
  elevated: "#161618", // Input/Card Surface
  border: "#242426", // Sophisticated Border
  text: "#FFFFFF",
  textMuted: "#71717A", // Zinc-400
  error: "#FF3B30",
};

export default {
  light: { text: "#000", background: "#fff", tint: PALETTE.primary },
  dark: { text: "#fff", background: PALETTE.background, tint: PALETTE.primary },
};
