import { CSSProperties, useEffect, useState } from "react";
import { useSyncExternalStore } from "react";

// Função para mesclar estilos
export const mergeStyles = (...styles: CSSProperties[]): CSSProperties => {
  return Object.assign({}, ...styles);
};

// Definindo os breakpoints
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
};

// Função para aplicar estilos de media query
export const useMediaQuery = (query: string): boolean => {
  // Função para criar uma store que sincroniza com o estado do MediaQueryList
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};

    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  // Função para obter o snapshot do estado atual
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  // Função para servidor (SSR)
  const getServerSnapshot = () => false;

  // Usar useSyncExternalStore para sincronizar com o estado do MediaQueryList
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
