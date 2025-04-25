import React, { useEffect, useRef, useState, CSSProperties } from "react";
import heroSectionStyles, {
  heroSectionMediaStyles,
} from "../styles/sections/heroSection";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import WaitlistForm from "../components/WaitlistForm";
import MockupDisplay from "../components/MockupDisplay";
import { ChevronDown } from "lucide-react";
import mockup1Image from "../assets/images/mockup1.png";
import mockup2Image from "../assets/images/mockup2.png";

// Textos rotativos para os objetivos fitness
const rotatingTexts = [
  "alcançar seus objetivos",
  "construir músculos",
  "perder peso",
  "melhorar sua saúde",
  "manter a consistência",
  "acompanhar progresso",
];

// Duração da animação em milissegundos
const ANIMATION_DURATION = 250; // 250ms para a transição
const TEXT_DISPLAY_DURATION = 1000; // 2 segundos para exibir cada texto

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animationsApplied, setAnimationsApplied] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isChangingText, setIsChangingText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const heroSectionStyle = useResponsiveStyles(
    heroSectionStyles,
    heroSectionMediaStyles,
    "heroSection"
  );
  const heroContentStyle = useResponsiveStyles(
    heroSectionStyles,
    heroSectionMediaStyles,
    "heroContent"
  );
  const heroTitleStyle = useResponsiveStyles(
    heroSectionStyles,
    heroSectionMediaStyles,
    "heroTitle"
  );
  const heroDescriptionStyle = useResponsiveStyles(
    heroSectionStyles,
    heroSectionMediaStyles,
    "heroDescription"
  );
  const scrollIndicatorStyle = useResponsiveStyles(
    heroSectionStyles,
    heroSectionMediaStyles,
    "scrollIndicator"
  );
  const scrollIndicatorIconStyle = useResponsiveStyles(
    heroSectionStyles,
    heroSectionMediaStyles,
    "scrollIndicatorIcon"
  );
  const mockupsContainerStyle = useResponsiveStyles(
    heroSectionStyles,
    heroSectionMediaStyles,
    "mockupsContainer"
  );

  // Detectar quando a seção está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Aplicar animações após um pequeno atraso para evitar flashes
  useEffect(() => {
    if (isVisible) {
      // Pequeno atraso para garantir que o DOM esteja pronto
      const timer = setTimeout(() => {
        setAnimationsApplied(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Efeito para alternar entre os textos rotativos
  useEffect(() => {
    if (!animationsApplied) return;

    const interval = setInterval(() => {
      setIsChangingText(true);

      // Aguardar a animação de saída
      setTimeout(() => {
        setCurrentTextIndex(
          (prevIndex) => (prevIndex + 1) % rotatingTexts.length
        );

        // Aguardar um pouco antes de iniciar a animação de entrada
        setTimeout(() => {
          setIsChangingText(false);
        }, 30);
      }, ANIMATION_DURATION);
    }, TEXT_DISPLAY_DURATION + ANIMATION_DURATION * 2); // Tempo total = duração do texto + duração das duas animações

    return () => clearInterval(interval);
  }, [animationsApplied]);

  // Detectar scroll para animar o indicador de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Função para rolar para a próxima seção
  const scrollToNextSection = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Estilos para o conteúdo com transição suave
  const contentTransitionStyle = {
    ...heroContentStyle,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    willChange: "opacity, transform",
  };

  // Estilo para o texto rotativo
  const rotatingTextStyle: CSSProperties = {
    display: "inline-block",
    minWidth: isMobile ? "200px" : "300px", // Largura ajustada para mobile
    minHeight: isMobile ? "40px" : "60px", // Altura ajustada para mobile
    position: "relative",
    textAlign: "left",
  };

  // Estilo para o texto atual
  const currentTextStyle: CSSProperties = {
    opacity: isChangingText ? 0 : 1,
    transform: isChangingText ? "translateY(8px)" : "translateY(0)", // Reduzido de 10px para 8px
    transition: `opacity ${ANIMATION_DURATION}ms ease-out, transform ${ANIMATION_DURATION}ms ease-out`,
    position: "relative",
    display: "inline-block",
    willChange: "opacity, transform",
  };

  return (
    <section style={heroSectionStyle} ref={heroRef}>
      <div ref={contentRef} style={contentTransitionStyle}>
        <h1 style={heroTitleStyle}>
          <span
            style={{
              display: "block",
              opacity: animationsApplied ? 1 : 0,
              transform: animationsApplied
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            Fitfolio te ajuda a
          </span>
          <span
            style={{
              display: "block",
              opacity: animationsApplied ? 1 : 0,
              transform: animationsApplied
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              transitionDelay: "0.2s",
            }}
          >
            <span style={heroSectionStyles.heroTitleHighlight}>
              <span style={rotatingTextStyle}>
                <span style={currentTextStyle}>
                  {rotatingTexts[currentTextIndex]}
                </span>
              </span>
              <span
                style={{
                  ...heroSectionStyles.heroTitleUnderline,
                  width: animationsApplied ? "100%" : "0%",
                  left: animationsApplied ? "0" : "50%",
                  transition: "width 0.8s ease-out, left 0.8s ease-out",
                  transitionDelay: "0.7s",
                }}
              ></span>
            </span>
          </span>
        </h1>

        <p
          style={{
            ...heroDescriptionStyle,
            opacity: animationsApplied ? 1 : 0,
            transform: animationsApplied ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            transitionDelay: "0.3s",
          }}
        >
          Acompanhe cada treino, monitore sua dieta, mantenha a consistência e
          veja resultados reais. De graça.
        </p>

        <div
          style={{
            opacity: animationsApplied ? 1 : 0,
            transform: animationsApplied ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            transitionDelay: "0.4s",
          }}
        >
          <WaitlistForm disableAnimations={true} />
        </div>

        <div
          style={{
            ...mockupsContainerStyle,
            opacity: animationsApplied ? 1 : 0,
            transform: animationsApplied ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            transitionDelay: "0.5s",
          }}
        >
          <MockupDisplay mockup1Src={mockup1Image} mockup2Src={mockup2Image} />
        </div>
      </div>

      {/* Background com gradiente */}
      <div style={heroSectionStyles.heroBackground}></div>

      {/* Indicador de scroll */}
      <div
        style={{
          ...scrollIndicatorStyle,
          opacity: isVisible && !scrolled ? 1 : 0,
          transition: "opacity 0.5s ease-out",
        }}
        onClick={scrollToNextSection}
      >
        <ChevronDown
          style={{
            ...scrollIndicatorIconStyle,
            animation: "bounce 2s infinite",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
