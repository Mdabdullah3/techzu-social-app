export const PALETTE = {
  indigo: {
    500: "#6366f1",
    950: "#1e1b4b",
  },
  zinc: {
    800: "#262626",
    900: "#121212",
    950: "#000000",
  },
  slate: {
    400: "#94a3b8",
  },
  red: "#ef4444",
  green: "#22c55e",
  white: "#FFFFFF",
  black: "#000000",
  blue: "#2f95dc",
};

export default {
  light: {
    text: PALETTE.black,
    background: PALETTE.white,
    tint: PALETTE.indigo[500],
    tabIconDefault: "#ccc",
    tabIconSelected: PALETTE.indigo[500],
  },
  dark: {
    text: PALETTE.white,
    background: PALETTE.black,
    tint: PALETTE.white,
    tabIconDefault: "#ccc",
    tabIconSelected: PALETTE.white,
  },
};
