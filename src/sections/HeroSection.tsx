import React, { useReducer, useRef, useCallback } from "react";
import heroSectionStyles, {
  heroSectionMediaStyles,
} from "../styles/sections/heroSection";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import WaitlistForm from "../components/WaitlistForm";
import MockupDisplay from "../components/MockupDisplay";
import { ChevronDown } from "lucide-react";
import mockup1Image from "../assets/images/mockup1.png";
import mockup2Image from "../assets/images/mockup2.png";
import { useTranslation } from "react-i18next";
import { typography, colors } from "../styles/appStyles";

// Componente para as partículas de fundo
const ParticlesBackground: React.FC = React.memo(() => {
  // Gerar partículas com posições aleatórias
  const particles = React.useMemo(() => {
    const count = 20; // Número de partículas
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1; // Tamanho entre 1px e 4px
      const opacity = Math.random() * 0.1 + 0.1; // Opacidade entre 0.1 e 0.2
      const left = Math.random() * 100; // Posição X entre 0% e 100%
      const top = Math.random() * 100; // Posição Y entre 0% e 100%
      const animationDuration = Math.random() * 50 + 30; // Duração entre 30s e 80s
      const animationDelay = Math.random() * 10; // Atraso entre 0s e 10s

      const styles: React.CSSProperties = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor:
          Math.random() > 0.5 ? colors.primaryLight : colors.primary,
        opacity,
        borderRadius: "50%",
        left: `${left}%`,
        top: `${top}%`,
        animation: `float ${animationDuration}s infinite ease-in-out ${animationDelay}s`,
      };

      return <div key={i} style={styles} />;
    });
  }, []);

  return <>{particles}</>;
});

// Definir a animação de flutuação
const FloatingAnimation = React.memo(() => {
  const keyframes = `
    @keyframes float {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(10px, 10px) rotate(5deg);
      }
      50% {
        transform: translate(-5px, 15px) rotate(-5deg);
      }
      75% {
        transform: translate(-10px, 5px) rotate(2deg);
      }
      100% {
        transform: translate(0, 0) rotate(0deg);
      }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-8px);
      }
      60% {
        transform: translateY(-4px);
      }
    }
  `;

  return <style>{keyframes}</style>;
});

// Textos rotativos para o título
const rotatingTextsEN = [
  "Track your workouts",
  "Manage your diet",
  "Reach your goals",
  "Transform your body",
];

const rotatingTextsPT = [
  "Acompanhar seus treinos",
  "Gerenciar sua dieta",
  "Atingir seus objetivos",
  "Transformar seu corpo",
];

// Duração da animação em milissegundos
const ANIMATION_DURATION = 200;
const TEXT_DISPLAY_DURATION = 1000;

// Interface do estado
interface HeroState {
  isVisible: boolean;
  scrolled: boolean;
  animationsApplied: boolean;
  currentTextIndex: number;
  isChangingText: boolean;
  isMobile: boolean;
  parallaxOffset: number;
  i18nInitialized: boolean;
}

// Tipo das ações do reducer
type HeroAction =
  | { type: "SET_VISIBLE"; payload: boolean }
  | { type: "SET_SCROLLED"; payload: boolean }
  | { type: "SET_ANIMATIONS_APPLIED"; payload: boolean }
  | { type: "SET_TEXT_INDEX"; payload: number }
  | { type: "SET_CHANGING_TEXT"; payload: boolean }
  | { type: "SET_MOBILE"; payload: boolean }
  | { type: "SET_PARALLAX_OFFSET"; payload: number }
  | { type: "SET_I18N_INITIALIZED"; payload: boolean };

// Estado inicial
const initialState: HeroState = {
  isVisible: false,
  scrolled: false,
  animationsApplied: false,
  currentTextIndex: 0,
  isChangingText: false,
  isMobile: false,
  parallaxOffset: 0,
  i18nInitialized: false,
};

// Reducer para gerenciar o estado
const heroReducer = (state: HeroState, action: HeroAction): HeroState => {
  switch (action.type) {
    case "SET_VISIBLE":
      return { ...state, isVisible: action.payload };
    case "SET_SCROLLED":
      return { ...state, scrolled: action.payload };
    case "SET_ANIMATIONS_APPLIED":
      return { ...state, animationsApplied: action.payload };
    case "SET_TEXT_INDEX":
      return { ...state, currentTextIndex: action.payload };
    case "SET_CHANGING_TEXT":
      return { ...state, isChangingText: action.payload };
    case "SET_MOBILE":
      return { ...state, isMobile: action.payload };
    case "SET_PARALLAX_OFFSET":
      return { ...state, parallaxOffset: action.payload };
    case "SET_I18N_INITIALIZED":
      return { ...state, i18nInitialized: action.payload };
    default:
      return state;
  }
};

// Componente principal
const HeroSection: React.FC = () => {
  const [state, dispatch] = useReducer(heroReducer, initialState);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { t, i18n } = useTranslation();

  // Verificar se o i18n está inicializado
  React.useEffect(() => {
    if (i18n.isInitialized) {
      dispatch({ type: "SET_I18N_INITIALIZED", payload: true });
    } else {
      const handleInitialized = () => {
        dispatch({ type: "SET_I18N_INITIALIZED", payload: true });
      };
      i18n.on("initialized", handleInitialized);
      return () => {
        i18n.off("initialized", handleInitialized);
      };
    }
  }, [i18n]);

  // Forçar atualização quando o idioma mudar
  React.useEffect(() => {
    const handleLanguageChanged = () => {
      // Reiniciar o índice do texto rotativo quando mudar de idioma
      dispatch({ type: "SET_TEXT_INDEX", payload: 0 });
      // Limpar e reiniciar o intervalo de rotação
      if (textRotationIntervalRef.current) {
        clearInterval(textRotationIntervalRef.current);
        textRotationIntervalRef.current = null;
      }
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  // Garantir que estamos usando o idioma correto
  const actualLanguage = state.i18nInitialized ? i18n.language : "pt";
  // Selecionar o array de textos rotativos com base no idioma atual
  const rotatingTexts =
    actualLanguage === "en" ? rotatingTextsEN : rotatingTextsPT;

  // Estilo responsivo para vários elementos
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
  const heroTitleStyle = {
    ...useResponsiveStyles(
      heroSectionStyles,
      heroSectionMediaStyles,
      "heroTitle"
    ),
    fontFamily: typography.titleFontFamily,
    textTransform: "uppercase" as const,
    letterSpacing: "0.01em",
  };
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

  // Observador de interseção para detectar visibilidade
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch({ type: "SET_VISIBLE", payload: true });

          // Aplicar animações após um pequeno atraso
          setTimeout(() => {
            dispatch({ type: "SET_ANIMATIONS_APPLIED", payload: true });
          }, 100);

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Gerenciar rotação do texto
  React.useEffect(() => {
    if (!state.animationsApplied || !state.i18nInitialized) return;

    // Configurar intervalo para trocar o texto
    textRotationIntervalRef.current = setInterval(() => {
      dispatch({ type: "SET_CHANGING_TEXT", payload: true });

      // Aguardar a animação de saída
      setTimeout(() => {
        dispatch({
          type: "SET_TEXT_INDEX",
          payload: (state.currentTextIndex + 1) % rotatingTexts.length,
        });

        // Aguardar antes de iniciar a animação de entrada
        setTimeout(() => {
          dispatch({ type: "SET_CHANGING_TEXT", payload: false });
        }, 50); // Aumentado para timing mais suave
      }, ANIMATION_DURATION);
    }, TEXT_DISPLAY_DURATION + ANIMATION_DURATION * 2);

    return () => {
      if (textRotationIntervalRef.current) {
        clearInterval(textRotationIntervalRef.current);
      }
    };
  }, [
    state.animationsApplied,
    state.currentTextIndex,
    rotatingTexts.length,
    state.i18nInitialized,
  ]);

  // Detectar scroll para animar o indicador e efeito parallax
  React.useEffect(() => {
    const handleScroll = () => {
      // Atualizar estado de scroll
      dispatch({ type: "SET_SCROLLED", payload: window.scrollY > 100 });

      // Calcular offset de parallax (movimento mais lento do fundo)
      const scrollY = window.scrollY;
      const parallaxValue = scrollY * 0.15; // Velocidade do efeito parallax
      dispatch({ type: "SET_PARALLAX_OFFSET", payload: parallaxValue });
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

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Detectar se é dispositivo móvel
  React.useEffect(() => {
    const checkIfMobile = () => {
      dispatch({ type: "SET_MOBILE", payload: window.innerWidth < 768 });
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Função para rolar para a próxima seção
  const scrollToNextSection = useCallback(() => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Estilos para o conteúdo com transição suave
  const contentTransitionStyle = {
    ...heroContentStyle,
    opacity: state.isVisible ? 1 : 0,
    transform: state.isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    willChange: "opacity, transform",
  };

  // Estilo específico para o primeiro texto (Fitfolio te ajuda a)
  const mainTitleTextStyle: React.CSSProperties = {
    display: "block",
    opacity: state.animationsApplied ? 1 : 0,
    transform: state.animationsApplied ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    whiteSpace: !state.isMobile ? "nowrap" : "normal",
  };

  // Estilo para o bloco do texto alternante
  const rotatingBlockStyle: React.CSSProperties = {
    display: "block",
    opacity: state.animationsApplied ? 1 : 0,
    transform: state.animationsApplied ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    transitionDelay: "0.2s",
    textAlign: "center",
    marginTop: state.isMobile ? "-1rem" : "-2.5rem",
  };

  // Estilo para o texto rotativo com fonte itálica elegante
  const rotatingTextStyle: React.CSSProperties = {
    display: "inline-block",
    minWidth: state.isMobile ? "200px" : "400px",
    minHeight: state.isMobile ? "40px" : "70px",
    position: "relative",
    textAlign: "center",
    fontFamily: "'Crimson Pro', serif",
    fontStyle: "italic",
    textTransform: "none",
    letterSpacing: "0.01em",
    fontSize: state.isMobile ? "2.3rem" : "5.2rem",
    width: "100%",
    whiteSpace: state.isMobile ? "normal" : "nowrap",
    color: colors.primaryDark,
    fontWeight: 400,
    lineHeight: "1.2",
  };

  // Estilo para o container do texto alternante
  const highlightContainerStyle: React.CSSProperties = {
    ...heroSectionStyles.heroTitleHighlight,
    display: "block",
    width: "100%",
    textAlign: "center",
  };

  // Estilo para o texto atual
  const currentTextStyle: React.CSSProperties = {
    opacity: state.isChangingText ? 0 : 1,
    transform: state.isChangingText ? "translateY(12px)" : "translateY(0)",
    transition: `opacity ${ANIMATION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${ANIMATION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    position: "relative",
    display: "inline-block",
    willChange: "opacity, transform",
    textShadow: "0px 0px 1px rgba(0,0,0,0.1)",
    fontWeight: typography.fontWeights.normal,
  };

  // Estilo para o sublinhado do texto rotativo
  const underlineStyle: React.CSSProperties = {
    ...heroSectionStyles.heroTitleUnderline,
    width: state.animationsApplied ? "100%" : "0%",
    left: state.animationsApplied ? "0" : "50%",
    transition: "width 0.8s ease-out, left 0.8s ease-out",
    transitionDelay: "0.7s",
    height: "1.5px",
    background:
      "linear-gradient(90deg, transparent, rgba(17, 24, 39, 0.6), transparent)",
    marginTop: state.isMobile ? "-5px" : "-8px",
  };

  // Estilo para o background com efeito parallax
  const backgroundStyle: React.CSSProperties = {
    ...heroSectionStyles.heroBackground,
    transform: `translateY(${state.parallaxOffset}px)`,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), 
      radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 60%)
    `,
    transition: "transform 0.05s cubic-bezier(0.33, 1, 0.68, 1)",
  };

  // Estilo para partículas decorativas sutis
  const particlesContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: -1,
    opacity: 0.7,
    transform: `translateY(${state.parallaxOffset * 0.5}px)`, // Movimento parallax mais lento que o fundo
    transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
  };

  // Estilo para o container dos mockups com parallax
  const mockupsWithParallaxStyle = {
    ...mockupsContainerStyle,
    opacity: state.animationsApplied ? 1 : 0,
    transform: state.animationsApplied
      ? `translateY(${-state.parallaxOffset * 0.2}px)` // Movimento contrário ao scroll para efeito paralaxe
      : "translateY(20px)",
    transition:
      "opacity 0.8s ease-out, transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)",
    transitionDelay: state.animationsApplied ? "0" : "0.5s",
  };

  return (
    <section style={heroSectionStyle} ref={heroRef}>
      <FloatingAnimation />
      <div ref={contentRef} style={contentTransitionStyle}>
        <h1 style={heroTitleStyle}>
          <span style={mainTitleTextStyle}>
            {actualLanguage === "en"
              ? "Fitfolio helps you"
              : "Fitfolio te ajuda a"}
          </span>
          <span style={rotatingBlockStyle}>
            <span style={highlightContainerStyle}>
              <span style={rotatingTextStyle}>
                <span style={currentTextStyle}>
                  {rotatingTexts[state.currentTextIndex]}
                </span>
              </span>
              <span style={underlineStyle}></span>
            </span>
          </span>
        </h1>

        <p
          style={{
            ...heroDescriptionStyle,
            opacity: state.animationsApplied ? 1 : 0,
            transform: state.animationsApplied
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            transitionDelay: "0.3s",
          }}
        >
          {t("hero.subtitle")}
        </p>

        <div
          style={{
            opacity: state.animationsApplied ? 1 : 0,
            transform: state.animationsApplied
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            transitionDelay: "0.4s",
          }}
        >
          <WaitlistForm disableAnimations={true} />
        </div>

        <div style={mockupsWithParallaxStyle}>
          <MockupDisplay mockup1Src={mockup1Image} mockup2Src={mockup2Image} />
        </div>
      </div>

      {/* Background com gradiente e parallax */}
      <div style={backgroundStyle}></div>

      {/* Container para partículas decorativas */}
      <div style={particlesContainerStyle}>
        <ParticlesBackground />
      </div>

      {/* Indicador de scroll */}
      <div
        style={{
          ...scrollIndicatorStyle,
          opacity: state.isVisible && !state.scrolled ? 1 : 0,
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

// Memo para evitar re-renderizações desnecessárias
export default React.memo(HeroSection);
