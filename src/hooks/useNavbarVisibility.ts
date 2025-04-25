import { useState, useEffect, useRef } from "react";
import { breakpoints } from "../styles/utils";

interface NavbarVisibilityState {
  isScrolled: boolean;
  isHidden: boolean;
  isMobile: boolean;
}

export const useNavbarVisibility = (
  isMobileMenuOpen: boolean
): NavbarVisibilityState => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prevScrollPos = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  // Verificar se está em viewport mobile
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(!window.matchMedia(breakpoints.md).matches);
    };

    // Verificar na inicialização
    checkViewport();

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkViewport);

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  useEffect(() => {
    // Inicializar a posição de scroll
    prevScrollPos.current = window.scrollY;

    // Função que controla a visibilidade da navbar
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Detectar quando o usuário scrollou além do limiar
      setIsScrolled(currentScrollPos > 50);

      // Se o menu mobile estiver aberto, não esconda a navbar
      if (isMobileMenuOpen) {
        setIsHidden(false);
        prevScrollPos.current = currentScrollPos;
        return;
      }

      // Detectar a direção do scroll
      const isScrollingDown = currentScrollPos > prevScrollPos.current;
      const scrollDelta = Math.abs(currentScrollPos - prevScrollPos.current);

      // Comportamentos diferentes para mobile e desktop
      if (isMobile) {
        // No mobile, oculta a navbar mais rapidamente ao rolar para baixo
        if (isScrollingDown && currentScrollPos > 50) {
          setIsHidden(true);
        } else if (!isScrollingDown && scrollDelta > 5) {
          // Mostrar a navbar quando rolar para cima significativamente
          setIsHidden(false);
        }
      } else {
        // No desktop, a navbar é flutuante e também deve sumir ao rolar para baixo
        if (isScrollingDown && currentScrollPos > 100) {
          setIsHidden(true);
        } else if (!isScrollingDown && scrollDelta > 10) {
          // Mostrar a navbar quando rolar para cima significativamente
          setIsHidden(false);
        }
      }

      // Atualizar a posição para a próxima verificação
      prevScrollPos.current = currentScrollPos;

      // Configurar um timeout para mostrar a navbar após um período de inatividade
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      if (isHidden) {
        // Se a navbar estiver oculta e o usuário parar de rolar, mostrar após 3 segundos
        scrollTimeout.current = window.setTimeout(() => {
          setIsHidden(false);
        }, 3000);
      }
    };

    // Usar requestAnimationFrame para melhor performance
    let ticking = false;

    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Adicionar o listener de scroll
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Configurar estado inicial
    handleScroll();

    // Limpar listener e timeout ao desmontar
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [isMobileMenuOpen, isMobile, isHidden]);

  return { isScrolled, isHidden, isMobile };
};
