export type DesignTokens = {
  colors: {
    primary: string;
    primaryForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  sidebar: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    ring: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  typography: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
};

export const tokens: DesignTokens = {
  colors: {
    primary: "#3366FF",
    primaryForeground: "#FFFFFF",
    background: "#1A1D29",
    foreground: "#F0F2FF",
    card: "#22263A",
    cardForeground: "#F0F2FF",
    popover: "#22263A",
    popoverForeground: "#F0F2FF",
    secondary: "#2A2F45",
    secondaryForeground: "#B0B8D8",
    muted: "#2A2F45",
    mutedForeground: "#7A85A8",
    accent: "#F5C542",
    accentForeground: "#1A1D29",
    destructive: "#FF4545",
    destructiveForeground: "#FFFFFF",
    border: "#2F3552",
    input: "#2A2F45",
    ring: "#3366FF",
  },
  sidebar: {
    background: "#14172240",
    foreground: "#F0F2FF",
    primary: "#3366FF",
    primaryForeground: "#FFFFFF",
    accent: "#2A2F45",
    accentForeground: "#F0F2FF",
    border: "#2F3552",
    ring: "#3366FF",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  typography: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
};

export default tokens;
