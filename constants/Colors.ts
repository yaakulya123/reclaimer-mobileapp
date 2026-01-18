// Eco-Professional Palette
const primary = '#10B981'; // Emerald Green
const secondary = '#3B82F6'; // Blue
const warning = '#F59E0B'; // Orange
const danger = '#EF4444'; // Red
const dark = '#1F2937'; // Gray 800
const light = '#F9FAFB'; // Gray 50
const white = '#FFFFFF';

export default {
  light: {
    text: dark,
    background: white,
    backgroundAlt: light,
    tint: primary,
    tabIconDefault: '#9CA3AF', // Gray 400
    tabIconSelected: primary,
    primary,
    secondary,
    warning,
    danger,
    card: white,
    border: '#E5E7EB', // Gray 200
  },
  dark: {
    text: white,
    background: '#111827', // Gray 900
    backgroundAlt: '#1F2937', // Gray 800
    tint: primary,
    tabIconDefault: '#6B7280', // Gray 500
    tabIconSelected: primary,
    primary,
    secondary,
    warning,
    danger,
    card: '#1F2937',
    border: '#374151', // Gray 700
  },
};
