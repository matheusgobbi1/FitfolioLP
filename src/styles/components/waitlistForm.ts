import { CSSProperties } from 'react';
import { colors, typography, spacing } from '../appStyles';

export const waitlistFormStyles: Record<string, CSSProperties> = {
  waitlistForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    maxWidth: '28rem',
    margin: `${spacing.xl} auto 0`,
    position: 'relative',
    zIndex: 1,
  },

  inputEmail: {
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: '0.5rem',
    border: `2px solid #000000`,
    fontSize: typography.fontSizes.base,
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.8)',
    fontFamily: "'Geist', sans-serif",
  },

  inputEmailFocus: {
    borderColor: colors.primary,
    outline: 'none',
    transform: 'translateY(-2px)',
    boxShadow: '3px 3px 0px 0px rgba(0, 0, 0, 0.8)',
  },

  inputEmailDisabled: {
    backgroundColor: `${colors.grayLight}50`,
    cursor: 'not-allowed',
    opacity: 0.7,
  },

  statusMessage: {
    marginTop: spacing.md,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },

  statusSuccess: {
    color: colors.success,
  },

  statusError: {
    color: colors.error,
  },

  statusLoading: {
    color: colors.gray,
  },

  waitlistFormContainer: {
    position: 'relative',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    maxWidth: '32rem',
    margin: '0 auto',
  },

  waitlistFormTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.dark,
    marginBottom: spacing.md,
    textAlign: 'center',
    fontFamily: "'Geist', sans-serif",
  },

  waitlistFormDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.gray,
    marginBottom: spacing.lg,
    textAlign: 'center',
    lineHeight: 1.6,
    fontFamily: "'Geist', sans-serif",
  },
};

// Estilos para media queries
export const waitlistFormMediaStyles = {
  sm: {
    waitlistForm: {
      flexDirection: 'row' as const,
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    inputEmail: {
      flex: '1',
      marginBottom: 0,
    },
  },
  md: {
    waitlistFormTitle: {
      fontSize: typography.fontSizes['2xl'],
    },
    waitlistFormDescription: {
      fontSize: typography.fontSizes.lg,
    },
    waitlistForm: {
      gap: spacing.lg,
    },
  },
};

export default waitlistFormStyles; 