import { CSSProperties } from 'react';
import { colors, typography, spacing } from '../appStyles';

// Keyframes para animações básicas - mantidos apenas os essenciais
const keyframes = `
@keyframes bounceUp {
  0% { transform: translateY(50px); opacity: 0; }
  70% { transform: translateY(-10px); }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes modalFadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

// Adicionar estilos ao head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

export const ctaSectionStyles: Record<string, CSSProperties> = {
  ctaSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing.lg,
    marginTop: spacing['2xl'],
    marginBottom: spacing['2xl'],
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
    maxWidth: '1200px',
    position: 'relative',
    overflow: 'hidden',
  },

  ctaContainer: {
    display: 'flex',
    width: '100%',
    position: 'relative',
  },

  ctaContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    flex: 1,
    width: '100%',
    position: 'relative',
  },

  ctaCard: {
    backgroundColor: colors.light,
    borderRadius: '20px',
    padding: 0,
    boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    textAlign: 'left',
    transition: 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.2s ease',
    border: `2px solid #000000`,
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    gap: 0,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
  },

  ctaCardContent: {
    width: '100%',
    paddingRight: 0,
    paddingBottom: 0,
    padding: spacing.lg,
  },

  ctaTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.dark,
    marginBottom: spacing.md,
  },

  ctaDescription: {
    color: colors.gray,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    fontSize: typography.fontSizes.sm,
    lineHeight: 1.6,
  },

  ctaButton: {
    marginTop: spacing.lg,
    display: 'flex',
    justifyContent: 'flex-start',
  },

  ctaInput: {
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: '0.5rem',
    border: `2px solid #000000`,
    fontSize: typography.fontSizes.sm,
    width: '100%',
    marginBottom: spacing.md,
    boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.8)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },

  ctaImageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: '200px',
    overflow: 'hidden',
    padding: 0,
    margin: 0,
    alignSelf: 'stretch',
  },

  ctaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
    objectPosition: 'center 20%',
    transform: 'scale(0.5)',
    filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3))',
    display: 'block',
    margin: 0,
    padding: 0,
    borderRadius: 0,
    transition: 'transform 0.5s ease',
  },
};

// Estilos para media queries
export const ctaSectionMediaStyles = {
  sm: {
    ctaSection: {
      padding: spacing.xl,
      marginTop: spacing['3xl'],
      marginBottom: spacing['3xl'],
      marginLeft: spacing.md,
      marginRight: spacing.md,
    },
    ctaCard: {
      padding: 0,
      gap: 0,
    },
    ctaCardContent: {
      padding: spacing.xl,
    },
    ctaTitle: {
      fontSize: typography.fontSizes['2xl'],
    },
    ctaDescription: {
      fontSize: typography.fontSizes.base,
    },
    ctaInput: {
      fontSize: typography.fontSizes.base,
      padding: `${spacing.md} ${spacing.lg}`,
    },
    ctaImageContainer: {
      minHeight: '250px',
    },
  },
  md: {
    ctaSection: {
      padding: spacing['2xl'],
      marginTop: spacing['4xl'],
      marginBottom: spacing['4xl'],
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    ctaTitle: {
      fontSize: typography.fontSizes['3xl'],
    },
    ctaCard: {
      flexDirection: 'row' as const,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      padding: 0,
      gap: 0,
      overflow: 'hidden',
    },
    ctaCardContent: {
      paddingRight: 0,
      paddingBottom: 0,
      flex: '1',
      width: 'auto',
      padding: spacing['2xl'],
    },
    ctaImageContainer: {
      flex: '0 0 45%',
      width: 'auto',
      minHeight: 'auto',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
      borderRadius: 0,
    },
    ctaImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as 'cover',
      objectPosition: 'center 25%',
      transform: 'scale(2.2)',
      borderRadius: 0,
    },
  },
  lg: {
    ctaTitle: {
      fontSize: typography.fontSizes['4xl'],
    },
    ctaImageContainer: {
      flex: '0 0 50%',
    },
  },
};

export default ctaSectionStyles; 