export const theme = {
  colors: {
    primary: '#3E64FF',
    secondary: '#5E60CE',
    accent: '#4CB944',
    success: '#4CB944',
    warning: '#F37920',
    error: '#DB4437',
    
    background: '#FFFFFF',
    backgroundLight: '#F5F7FA',
    
    text: '#1F2937',
    textSecondary: '#6B7280',
    textPlaceholder: '#9CA3AF',
    
    disabledBackground: '#E5E7EB',
    disabledText: '#9CA3AF',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
};

export type Theme = typeof theme;