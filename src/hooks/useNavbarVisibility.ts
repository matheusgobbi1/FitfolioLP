import { useState, useEffect, useRef } from "react";

interface NavbarVisibilityState {
  isScrolled: boolean;
  isHidden: boolean;
  isMobile: boolean;
}

// Breakpoint personalizado para o navbar
const customNavbarBreakpoint = "(min-width: 1300px)";

export const useNavbarVisibility = (
  isMobileMenuOpen: boolean
): NavbarVisibilityState => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prevScrollPos = useRef(0);
  const isHiddenRef = useRef(isHidden); // Ref para guardar o estado isHidden atual

  // Efeito para manter a ref sincronizada com o estado
  useEffect(() => {
    isHiddenRef.current = isHidden;
  }, [isHidden]);

  // Verificar se está em viewport mobile
  useEffect(() => {
    const checkViewport = () => {
      // Usamos o breakpoint personalizado (1299px) para o navbar
      setIsMobile(!window.matchMedia(customNavbarBreakpoint).matches);
    };

    // Verificar na inicialização
    checkViewport();

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkViewport);

    // Remover estilos de links padrão que podem causar problema
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `
        a, a:hover, a:visited, a:focus {
          text-decoration: none !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  // Enquanto o menu mobile estiver aberto, forçar isHidden a false
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHidden(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error(
        "Elemento #root não encontrado para adicionar listener de scroll."
      );
      return;
    }

    // Inicializar a posição de scroll no elemento root
    prevScrollPos.current = rootElement.scrollTop;

    // Função que controla a visibilidade da navbar
    const handleScroll = () => {
      // Se o menu mobile estiver aberto, não esconder a navbar
      if (isMobileMenuOpen) {
        setIsHidden(false);
        return;
      }

      const currentScrollPos = rootElement.scrollTop;
      const scrollDelta = Math.abs(currentScrollPos - prevScrollPos.current);
      const isScrollingDown = currentScrollPos > prevScrollPos.current;
      const currentIsHidden = isHiddenRef.current; // Ler o valor atual da ref

      // Log detalhado do estado atual do scroll
      console.log(
        `[useNavbarVisibility] Scroll Info: current=${currentScrollPos}, prev=${prevScrollPos.current}, delta=${scrollDelta}, down=${isScrollingDown}, isHidden=${currentIsHidden}, isMobile=${isMobile}`
      );

      // Determina o próximo estado de visibilidade
      let nextIsHidden = currentIsHidden; // Começa com o estado atual da ref

      if (isMobile) {
        if (isScrollingDown && currentScrollPos > 50) {
          nextIsHidden = true; // Esconder ao rolar para baixo (mobile)
        } else if (!isScrollingDown && scrollDelta > 5) {
          nextIsHidden = false; // Mostrar ao rolar para cima (mobile)
        }
      } else {
        // Desktop
        if (isScrollingDown && currentScrollPos > 100) {
          nextIsHidden = true; // Esconder ao rolar para baixo (desktop)
        } else if (!isScrollingDown && scrollDelta > 10) {
          nextIsHidden = false; // Mostrar ao rolar para cima (desktop)
        }
      }

      // Lógica para manter visível se o menu mobile estiver aberto (sobrescreve a decisão anterior)
      if (isMobileMenuOpen && nextIsHidden) {
        console.log(
          "[useNavbarVisibility] Overriding HIDE decision because mobile menu is open."
        );
        nextIsHidden = false;
      }

      // Aplica a mudança de estado apenas se necessário
      if (nextIsHidden !== currentIsHidden) {
        // Comparar com o valor da ref
        console.log(
          `[useNavbarVisibility] State Change: isHidden changing from ${currentIsHidden} to ${nextIsHidden}`
        );
        setIsHidden(nextIsHidden);
      } else {
        console.log(
          `[useNavbarVisibility] State No Change: isHidden remains ${currentIsHidden}`
        );
      }

      // Atualiza a posição anterior do scroll para a próxima iteração
      // Apenas atualiza se a mudança não for muito grande (evita problemas com saltos)
      if (scrollDelta < 200) {
        prevScrollPos.current = currentScrollPos;
      } else {
        console.log(
          `[useNavbarVisibility] Large scroll delta (${scrollDelta}), not updating prevScrollPos immediately.`
        );
      }

      // Atualiza o estado isScrolled (pode ser útil para outros estilos)
      setIsScrolled(currentScrollPos > 50);
    };

    // Usar requestAnimationFrame para melhor performance
    let ticking = false;

    const scrollHandler = () => {
      console.log("[useNavbarVisibility] Scroll event detected!");
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Adicionar o listener de scroll ao elemento #root
    rootElement.addEventListener("scroll", scrollHandler, { passive: true });

    // Configurar estado inicial
    handleScroll();

    // Limpar listener ao desmontar
    return () => {
      rootElement.removeEventListener("scroll", scrollHandler);
    };
  }, [isMobileMenuOpen, isMobile]);

  return { isScrolled, isHidden, isMobile };
};
