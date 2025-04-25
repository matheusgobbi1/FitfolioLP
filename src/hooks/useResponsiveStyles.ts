import { useState, useEffect, CSSProperties } from 'react';
import { mergeStyles, breakpoints } from '../styles/utils';

// Hook para obter estilos responsivos
export const useResponsiveStyles = (
  baseStyles: Record<string, CSSProperties>,
  mediaStyles: Record<string, Record<string, CSSProperties>> = {},
  styleName: string
): CSSProperties => {
  const [responsiveStyle, setResponsiveStyle] = useState<CSSProperties>(baseStyles[styleName] || {});

  useEffect(() => {
    // Função para atualizar os estilos com base nas media queries
    const updateStyles = () => {
      let newStyle = { ...baseStyles[styleName] };

      // Aplicar estilos para cada breakpoint ativo
      if (window.matchMedia(breakpoints.sm).matches && 
          mediaStyles.sm && 
          mediaStyles.sm[styleName]) {
        newStyle = mergeStyles(newStyle, mediaStyles.sm[styleName]);
      }
      
      if (window.matchMedia(breakpoints.md).matches && 
          mediaStyles.md && 
          mediaStyles.md[styleName]) {
        newStyle = mergeStyles(newStyle, mediaStyles.md[styleName]);
      }
      
      if (window.matchMedia(breakpoints.lg).matches && 
          mediaStyles.lg && 
          mediaStyles.lg[styleName]) {
        newStyle = mergeStyles(newStyle, mediaStyles.lg[styleName]);
      }

      setResponsiveStyle(newStyle);
    };

    // Atualizar estilos inicialmente
    updateStyles();

    // Configurar listeners para mudanças de tamanho de tela
    const mediaQueryLists = Object.values(breakpoints).map(query => window.matchMedia(query));
    const listeners = mediaQueryLists.map(mql => {
      const listener = () => updateStyles();
      mql.addEventListener('change', listener);
      return { mql, listener };
    });

    // Limpar listeners quando o componente for desmontado
    return () => {
      listeners.forEach(({ mql, listener }) => {
        mql.removeEventListener('change', listener);
      });
    };
  }, [baseStyles, mediaStyles, styleName]);

  return responsiveStyle;
}; 