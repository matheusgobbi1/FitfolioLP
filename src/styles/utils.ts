import { CSSProperties } from 'react';

// Função para mesclar estilos
export const mergeStyles = (...styles: CSSProperties[]): CSSProperties => {
  return Object.assign({}, ...styles);
};

// Definindo os breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
};

// Função para aplicar estilos de media query
export const useMediaQuery = (query: string): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}; 