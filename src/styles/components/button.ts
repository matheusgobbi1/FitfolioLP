import { CSSProperties } from 'react';
import { colors, typography, spacing } from '../appStyles';

export const buttonStyles: Record<string, CSSProperties> = {
  btnPrimary: {
    backgroundColor: colors.primary,
    color: colors.light,
    padding: `${spacing.sm} ${spacing['2xl']}`,
    borderRadius: '0.5rem',
    border: '2px solid #000000',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '140px',
    fontWeight: typography.fontWeights.semibold,
    fontSize: typography.fontSizes.base,
    transition: 'all 0.3s ease',
    boxShadow: '3px 3px 0px 0px rgba(0, 0, 0, 0.8)',
    position: 'relative',
    overflow: 'visible',
    letterSpacing: '0.01em',
    textTransform: 'none',
    fontFamily: "'Geist', sans-serif",
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },

  btnPrimaryHover: {
    transform: 'translateY(-2px)',
    boxShadow: '5px 5px 0px 0px rgba(0, 0, 0, 0.8)',
  },

  btnPrimaryDisabled: {
    backgroundColor: colors.grayLight,
    color: colors.gray,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.3)',
    opacity: 0.7,
  },

  // Botão secundário
  btnSecondary: {
    backgroundColor: 'transparent',
    color: colors.primary,
    padding: `${spacing.sm} ${spacing['2xl']}`,
    borderRadius: '0.5rem',
    border: `2px solid ${colors.primary}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '140px',
    fontWeight: typography.fontWeights.semibold,
    fontSize: typography.fontSizes.base,
    transition: 'all 0.3s ease',
    boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    overflow: 'visible',
    letterSpacing: '0.01em',
    textTransform: 'none',
    fontFamily: "'Geist', sans-serif",
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },

  btnSecondaryHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.5)',
  },

  btnSecondaryDisabled: {
    borderColor: colors.grayLight,
    color: colors.gray,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '1px 1px 0px 0px rgba(0, 0, 0, 0.2)',
    opacity: 0.7,
  },

  // Efeito de ripple para os botões
  btnRipple: {
    position: 'absolute',
    borderRadius: '50%',
    transform: 'scale(0)',
    animation: 'ripple 0.6s linear',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
};

// Estilos para media queries
export const buttonMediaStyles = {
  sm: {
    btnPrimary: {
      fontSize: typography.fontSizes.sm,
      padding: `${spacing.sm} ${spacing.xl}`,
      minWidth: '120px',
    },
    btnSecondary: {
      fontSize: typography.fontSizes.sm,
      padding: `${spacing.sm} ${spacing.xl}`,
      minWidth: '120px',
    },
  },
  md: {
    btnPrimary: {
      fontSize: typography.fontSizes.base,
      padding: `${spacing.sm} ${spacing['2xl']}`,
      minWidth: '140px',
    },
    btnSecondary: {
      fontSize: typography.fontSizes.base,
      padding: `${spacing.sm} ${spacing['2xl']}`,
      minWidth: '140px',
    },
  },
  lg: {
    btnPrimary: {
      fontSize: typography.fontSizes.lg,
      padding: `${spacing.md} ${spacing['2xl']}`,
      minWidth: '160px',
    },
    btnSecondary: {
      fontSize: typography.fontSizes.lg,
      padding: `${spacing.md} ${spacing['2xl']}`,
      minWidth: '160px',
    },
  },
};

export default buttonStyles; 