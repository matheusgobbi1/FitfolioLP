import { CSSProperties } from 'react';
import { colors } from '../appStyles';

// Estilos das keyframes para as animações
const keyframes = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(30px) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateZ(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateZ(0);
  }
}

@keyframes floatDevice {
  0%, 100% {
    transform: translateY(0) scale(1) translateZ(0);
  }
  50% {
    transform: translateY(-8px) scale(1.01) translateZ(0);
  }
}
`;

// Adicionar keyframe ao cabeçalho
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

const howItWorksStyles: Record<string, CSSProperties> = {
  section: {
    width: '100%',
    padding: '40px 16px', // mobile-first padding
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.background,
    overflow: 'hidden',
    minHeight: '90vh',
    scrollSnapAlign: 'start',
  },
  title: {
    fontSize: '1.75rem', // mobile-first font size
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: '30px',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    width: '100%',
    maxWidth: '800px',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px', // mobile-first padding
    marginBottom: '20px',
    flexDirection: 'column',
  },
  mockupSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    zIndex: 2,
    marginBottom: '20px',
    minHeight: '300px', // mobile-first min height
    background: 'transparent', // Garantir que não haja fundo
    boxShadow: 'none', // Remover qualquer sombra
    backdropFilter: 'none', // Remover qualquer efeito de filtro
  },
  mockupImage: {
    maxWidth: '240px', // mobile-first image size
    height: 'auto',
    maxHeight: '500px',
    borderRadius: '30px',
    transition: 'all 0.3s ease-in-out',
    transform: 'scale(1)',
    willChange: 'transform, opacity',
    filter: 'none',
    zIndex: 5,
  },
  stepTitle: {
    fontSize: '1.1rem', // mobile-first font size
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: '10px',
    transition: 'all 0.2s ease',
    minHeight: '40px', // mobile-first min height
  },
  carousel: {
    width: '100%',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '15px',
    marginBottom: '20px',
    background: 'transparent',
    boxShadow: 'none',
    backdropFilter: 'none',
    perspective: '1000px',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  },
  carouselTrack: {
    display: 'flex',
    width: '100%',
    transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
    flexWrap: 'nowrap', // Impede que os slides quebrem para a próxima linha
    background: 'transparent',
    backdropFilter: 'none',
  },
  carouselSlide: {
    flex: '1 0 100%', // Garante que cada slide ocupe toda a largura visível
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    background: 'transparent', // Garantir que não haja fundo
    backdropFilter: 'none', // Remover qualquer efeito de filtro
    position: 'relative',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap', // Para permitir que os indicadores quebrem para uma nova linha em telas menores
    maxWidth: '320px', // Limita a largura em telas pequenas
    margin: '15px auto', // Centraliza o container
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: colors.grayLight,
    margin: '0 4px 8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  indicatorActive: {
    width: '10px',
    height: '10px',
    backgroundColor: colors.primary,
    transform: 'scale(1.2)',
  },
  // Botões laterais do carousel
  sideNavButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid ' + colors.primary,
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: colors.primary,
    fontSize: '16px',
    outline: 'none',
    zIndex: 5,
    boxShadow: 'none',
  },
  prevButton: {
    left: '5px',
  },
  nextButton: {
    right: '5px',
  },
};

export const howItWorksMediaStyles: Record<string, Record<string, CSSProperties>> = {
  section: {
    lg: {
      padding: '80px 40px',
    },
    md: {
      padding: '60px 30px',
    },
  },
  title: {
    lg: {
      fontSize: '2.5rem',
    },
    md: {
      fontSize: '2.25rem',
    },
  },
  content: {
    lg: {
      padding: '0 40px',
      marginBottom: '30px',
    },
    md: {
      padding: '0 20px',
      marginBottom: '25px',
    },
  },
  mockupSection: {
    lg: {
      minHeight: '400px',
      marginBottom: '30px',
    },
    md: {
      minHeight: '350px',
      marginBottom: '25px',
    },
  },
  mockupImage: {
    lg: {
      maxWidth: '280px',
    },
    md: {
      maxWidth: '260px',
    },
  },
  stepTitle: {
    lg: {
      fontSize: '1.5rem',
      minHeight: '60px',
    },
    md: {
      fontSize: '1.25rem',
      minHeight: '50px',
    },
  },
  indicators: {
    md: {
      maxWidth: '400px',
    },
    lg: {
      maxWidth: '500px',
    },
  },
  indicator: {
    md: {
      width: '10px',
      height: '10px',
      margin: '0 5px 8px',
    },
    lg: {
      width: '12px',
      height: '12px',
      margin: '0 6px 8px',
    },
  },
  indicatorActive: {
    md: {
      width: '12px',
      height: '12px',
    },
    lg: {
      width: '14px',
      height: '14px',
    },
  },
  sideNavButton: {
    md: {
      width: '44px',
      height: '44px',
      fontSize: '18px',
    },
    lg: {
      width: '50px',
      height: '50px',
      fontSize: '20px',
    },
  },
  prevButton: {
    md: {
      left: '10px',
    },
    lg: {
      left: '15px',
    },
  },
  nextButton: {
    md: {
      right: '10px',
    },
    lg: {
      right: '15px',
    },
  },
};

export default howItWorksStyles; 