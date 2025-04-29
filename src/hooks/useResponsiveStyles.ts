import { CSSProperties, useMemo } from "react";
import { mergeStyles, breakpoints, useMediaQuery } from "../styles/utils";

// Hook para obter estilos responsivos sem useState e useEffect
export const useResponsiveStyles = (
  baseStyles: Record<string, CSSProperties>,
  mediaStyles: Record<string, Record<string, CSSProperties>> = {},
  styleName: string
): CSSProperties => {
  // Verificar se cada breakpoint está ativo usando o hook useMediaQuery
  const isSmScreen = useMediaQuery(breakpoints.sm);
  const isMdScreen = useMediaQuery(breakpoints.md);
  const isLgScreen = useMediaQuery(breakpoints.lg);

  // Calcular os estilos responsivos usando useMemo para evitar recálculos desnecessários
  const responsiveStyle = useMemo(() => {
    let newStyle = { ...baseStyles[styleName] };

    // Aplicar estilos para cada breakpoint ativo
    if (isSmScreen && mediaStyles.sm && mediaStyles.sm[styleName]) {
      newStyle = mergeStyles(newStyle, mediaStyles.sm[styleName]);
    }

    if (isMdScreen && mediaStyles.md && mediaStyles.md[styleName]) {
      newStyle = mergeStyles(newStyle, mediaStyles.md[styleName]);
    }

    if (isLgScreen && mediaStyles.lg && mediaStyles.lg[styleName]) {
      newStyle = mergeStyles(newStyle, mediaStyles.lg[styleName]);
    }

    return newStyle;
  }, [baseStyles, mediaStyles, styleName, isSmScreen, isMdScreen, isLgScreen]);

  return responsiveStyle;
};
