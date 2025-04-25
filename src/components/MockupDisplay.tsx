import React, { useEffect, useState, useRef } from "react";
import mockupDisplayStyles, {
  mockupDisplayMediaStyles,
} from "../styles/components/mockupDisplay";
import { mergeStyles } from "../styles/utils";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";

interface MockupDisplayProps {
  mockup1Src: string;
  mockup2Src: string;
}

const MockupDisplay: React.FC<MockupDisplayProps> = ({
  mockup1Src,
  mockup2Src,
}) => {
  const mockupsSectionStyle = useResponsiveStyles(
    mockupDisplayStyles,
    mockupDisplayMediaStyles,
    "mockupsSection"
  );
  const mockupContainerStyle = useResponsiveStyles(
    mockupDisplayStyles,
    mockupDisplayMediaStyles,
    "mockupContainer"
  );
  const mockupStyle = useResponsiveStyles(
    mockupDisplayStyles,
    mockupDisplayMediaStyles,
    "mockup"
  );
  const mockup1Style = useResponsiveStyles(
    mockupDisplayStyles,
    mockupDisplayMediaStyles,
    "mockup1"
  );
  const mockup2Style = useResponsiveStyles(
    mockupDisplayStyles,
    mockupDisplayMediaStyles,
    "mockup2"
  );

  // Iniciar com progresso 0 para garantir que os mockups comecem pequenos
  const [scrollProgress, setScrollProgress] = useState(0);
  const [screenSize, setScreenSize] = useState("sm");
  const [isInView, setIsInView] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Efeito para remover o estado de carregamento inicial após um curto período
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Verificar o tamanho da tela
    const checkScreenSize = () => {
      if (window.innerWidth < 480) {
        // Telas muito pequenas (smartphones)
        setScreenSize("xs");
      } else if (window.innerWidth < 640) {
        // Telas pequenas (smartphones maiores)
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        // Tablets
        setScreenSize("md");
      } else {
        // Desktop
        setScreenSize("lg");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Configurar o observador de interseção para detectar quando os mockups estão visíveis
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Se o elemento estiver visível, iniciar com progresso de scroll 0
        if (entry.isIntersecting && scrollProgress === 0) {
          // Chamar handleScroll para calcular o progresso inicial correto
          handleScroll();
        }
      },
      {
        threshold: [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0px 0px -10% 0px", // Detectar um pouco antes do elemento entrar completamente na viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcular o progresso do scroll de forma mais suave
      let progress = 0;

      // Se o elemento ainda não entrou na viewport
      if (rect.top >= windowHeight) {
        progress = 0;
      }
      // Se o elemento já passou completamente pela viewport
      else if (rect.bottom <= 0) {
        progress = 1;
      }
      // Caso contrário, calcular o progresso baseado na posição
      else {
        // Calcular quanto do elemento está visível na viewport
        const visibleHeight =
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const elementHeight = rect.height;

        // Calcular a posição relativa do elemento na viewport
        const elementPosition = 1 - rect.top / windowHeight;

        // Combinar visibilidade e posição para um efeito mais suave
        // Começar com progresso 0 e aumentar gradualmente
        progress = Math.max(
          0,
          Math.min(
            1,
            (visibleHeight / elementHeight) * 0.6 + // Componente baseado na visibilidade (60% do peso)
              elementPosition * 0.4 // Componente baseado na posição (40% do peso)
          )
        );

        // Aplicar uma curva de aceleração para tornar o efeito mais dramático
        // Isso faz com que o progresso comece mais lento e acelere
        progress = Math.pow(progress, 0.7); // Curva de aceleração mais acentuada (0.7 em vez de 0.8)
      }

      setScrollProgress(progress);
    };

    // Adicionar debounce para melhorar a performance
    let scrollTimeout: number | null = null;
    const debouncedHandleScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", debouncedHandleScroll);
    // Chamar uma vez para inicializar
    handleScroll();

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      window.removeEventListener("resize", checkScreenSize);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      observer.disconnect();
    };
  }, []);

  // Calcular os estilos de animação baseados no progresso do scroll
  const getMockup1AnimatedStyle = () => {
    // Se estiver no carregamento inicial, usar valores mínimos
    if (initialLoad) {
      return {
        opacity: 0.5,
        transform: `translateX(-80%) rotate(-15deg) scale(0.15) translateY(60px)`,
        transition: "none",
        boxShadow: "none", // Garantindo que não tenha sombra
      };
    }

    // Opacidade alta para melhor visualização
    const opacity = isInView ? 0.9 + scrollProgress * 0.1 : 0.7;

    let scale;
    let translateY;
    let translateX;
    let rotate;

    if (screenSize === "xs") {
      // Telas muito pequenas (smartphones)
      scale = 0.15 + scrollProgress * 0.6;
      translateY = 40 - scrollProgress * 35;
      translateX = -72 + scrollProgress * 10;
      rotate = -10 + scrollProgress * 4;
    } else if (screenSize === "sm") {
      // Telas pequenas
      scale = 0.2 + scrollProgress * 0.6;
      translateY = 50 - scrollProgress * 45;
      translateX = -85 + scrollProgress * 15;
      rotate = -12 + scrollProgress * 5;
    } else if (screenSize === "md") {
      // Tablet
      scale = 0.25 + scrollProgress * 0.65;
      translateY = 60 - scrollProgress * 50;
      translateX = -90 + scrollProgress * 15;
      rotate = -12 + scrollProgress * 4;
    } else {
      // Desktop
      scale = 0.3 + scrollProgress * 0.7;
      translateY = 70 - scrollProgress * 55;
      translateX = -95 + scrollProgress * 15;
      rotate = -10 + scrollProgress * 3;
    }

    return {
      opacity,
      transform: `translateX(${translateX}%) rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`,
      transition:
        "opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
      boxShadow: "none", // Garantindo que não tenha sombra
    };
  };

  const getMockup2AnimatedStyle = () => {
    // Se estiver no carregamento inicial, usar valores mínimos
    if (initialLoad) {
      return {
        opacity: 0.5,
        transform: `translateX(-40%) rotate(15deg) scale(0.1) translateY(65px)`,
        transition: "none",
        boxShadow: "none", // Garantindo que não tenha sombra
      };
    }

    // Opacidade alta para melhor visualização
    const opacity = isInView ? 0.9 + scrollProgress * 0.1 : 0.7;

    let scale;
    let translateY;
    let translateX;
    let rotate;

    if (screenSize === "xs") {
      // Telas muito pequenas (smartphones)
      scale = 0.1 + scrollProgress * 0.63;
      translateY = 45 - scrollProgress * 40;
      translateX = -32 - scrollProgress * 10;
      rotate = 10 - scrollProgress * 4;
    } else if (screenSize === "sm") {
      // Telas pequenas
      scale = 0.15 + scrollProgress * 0.55;
      translateY = 55 - scrollProgress * 50;
      translateX = -45 - scrollProgress * 10;
      rotate = 12 - scrollProgress * 5;
    } else if (screenSize === "md") {
      // Tablet
      scale = 0.2 + scrollProgress * 0.6;
      translateY = 65 - scrollProgress * 55;
      translateX = -40 - scrollProgress * 10;
      rotate = 12 - scrollProgress * 4;
    } else {
      // Desktop
      scale = 0.25 + scrollProgress * 0.65;
      translateY = 75 - scrollProgress * 60;
      translateX = -35 - scrollProgress * 10;
      rotate = 10 - scrollProgress * 3;
    }

    return {
      opacity,
      transform: `translateX(${translateX}%) rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`,
      transition:
        "opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
      boxShadow: "none", // Garantindo que não tenha sombra
    };
  };

  return (
    <div
      className="mockup-section overflow-visible"
      style={{
        ...mockupsSectionStyle,
        overflow: "visible",
        position: "relative",
        width: "100%",
        maxWidth: "100%",
      }}
      ref={sectionRef}
    >
      <div
        className="mockup-container overflow-visible"
        style={{
          ...mockupContainerStyle,
          overflow: "visible",
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="mockup-image overflow-visible"
          src={mockup1Src}
          alt="Fitfolio App"
          style={{
            ...mergeStyles(
              mockupStyle,
              mockup1Style,
              getMockup1AnimatedStyle()
            ),
            maxWidth: "none",
            pointerEvents: "none",
            filter: "none", // Garantindo que não tenha filtros de sombra ou brilho
          }}
          loading="eager"
        />
        <img
          className="mockup-image overflow-visible"
          src={mockup2Src}
          alt="Fitfolio Workout"
          style={{
            ...mergeStyles(
              mockupStyle,
              mockup2Style,
              getMockup2AnimatedStyle()
            ),
            maxWidth: "none",
            pointerEvents: "none",
            filter: "none", // Garantindo que não tenha filtros de sombra ou brilho
          }}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default MockupDisplay;
