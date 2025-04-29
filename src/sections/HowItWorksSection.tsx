import React, { useState, useRef, useEffect } from "react";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import { mergeStyles } from "../styles/utils";
import howItWorksStyles, {
  howItWorksMediaStyles,
} from "../styles/sections/howItWorksSection";
import { useTranslation } from "react-i18next";
import { typography } from "../styles/appStyles";

// Importando novos mockups
import mockupOnboarding from "../assets/images/mockup-onboarding.png";
import mockupSummary from "../assets/images/mockup-summary.png";
import mockupPlan from "../assets/images/mockup-plan.png";
import mockupMeals from "../assets/images/mockup-meals.png";
import mockupFood from "../assets/images/mockup-food.png";
import mockupWorkout from "../assets/images/mockup-workout.png";
import mockupExercices from "../assets/images/mockup-exercices.png";
import mockupReps from "../assets/images/mockup-reps.png";
import mockupProgress from "../assets/images/mockup-progress.png";
import mockupGrafico from "../assets/images/mockup-grafico.png";

// Dados dos passos do storytelling
const storyStepsMockups = [
  mockupOnboarding,
  mockupSummary,
  mockupMeals,
  mockupFood,
  mockupPlan,
  mockupWorkout,
  mockupExercices,
  mockupReps,
  mockupProgress,
  mockupGrafico,
];

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Estados para controle de animações
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animateTitle, setAnimateTitle] = useState(false);
  const [animateCarousel, setAnimateCarousel] = useState(false);
  const [animateControls, setAnimateControls] = useState(false);

  // Adicionando verificação para tela extra grande
  const [isExtraLarge, setIsExtraLarge] = useState(false);

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Ref para as imagens pré-carregadas
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

  // Pré-carregar todas as imagens quando o componente montar
  useEffect(() => {
    // Criar elementos de imagem para cada mockup e pré-carregá-los
    const storySteps = t("howItWorks.steps", { returnObjects: true }) as {
      title: string;
    }[];
    storySteps.forEach((_, index) => {
      const img = new Image();
      img.src = storyStepsMockups[index];
      preloadedImagesRef.current[index] = img;
    });
  }, [t]);

  // Verificar se estamos em um desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // considerando 1024px como ponto de quebra para desktop
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  // Adicionando verificação para tela extra grande
  useEffect(() => {
    const checkIsExtraLarge = () => {
      setIsExtraLarge(window.innerWidth >= 1440); // considerando 1440px como ponto de quebra para telas extra grandes
    };

    checkIsExtraLarge();
    window.addEventListener("resize", checkIsExtraLarge);

    return () => {
      window.removeEventListener("resize", checkIsExtraLarge);
    };
  }, []);

  // Navegar para o próximo slide
  const nextSlide = () => {
    if (isAnimating) return;

    const storySteps = t("howItWorks.steps", { returnObjects: true }) as {
      title: string;
    }[];

    if (activeStep < storySteps.length - 1) {
      setIsAnimating(true);
      setDirection("next");
      setActiveStep((prevStep) => prevStep + 1);

      // Desabilita a animação após completar (reduzido para 300ms)
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  // Navegar para o slide anterior
  const prevSlide = () => {
    if (isAnimating) return;

    if (activeStep > 0) {
      setIsAnimating(true);
      setDirection("prev");
      setActiveStep((prevStep) => prevStep - 1);

      // Desabilita a animação após completar (reduzido para 300ms)
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  // Navegar para um slide específico
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeStep) return;

    setIsAnimating(true);
    setDirection(index > activeStep ? "next" : "prev");
    setActiveStep(index);

    // Desabilita a animação após completar (reduzido para 300ms)
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Detectar quando a seção está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSectionVisible(true);
        } else {
          setIsSectionVisible(false);
        }
      },
      { threshold: 0.3 } // Considerar visível quando 30% da seção está visível
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Controlar animações de entrada quando a seção fica visível
  useEffect(() => {
    if (isSectionVisible && !hasAnimated) {
      // Sequência de animações
      setTimeout(() => setAnimateTitle(true), 100);
      setTimeout(() => setAnimateCarousel(true), 300);
      setTimeout(() => setAnimateControls(true), 500);
      setHasAnimated(true);
    }
  }, [isSectionVisible, hasAnimated]);

  // Lidar com eventos de toque (swipe) para navegação mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe da direita para a esquerda - próximo slide
        nextSlide();
      } else {
        // Swipe da esquerda para a direita - slide anterior
        prevSlide();
      }
    }

    // Limpar estados de toque
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Lidar com eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSectionVisible) return;

      const storySteps = t("howItWorks.steps", { returnObjects: true }) as {
        title: string;
      }[];

      switch (e.key) {
        case "ArrowRight":
          nextSlide();
          break;
        case "ArrowLeft":
          prevSlide();
          break;
        case "Home":
          // Ir para o primeiro slide
          goToSlide(0);
          break;
        case "End":
          // Ir para o último slide
          goToSlide(storySteps.length - 1);
          break;
        case "PageUp":
          // Voltar 3 slides ou ir para o primeiro
          goToSlide(Math.max(0, activeStep - 3));
          break;
        case "PageDown":
          // Avançar 3 slides ou ir para o último
          goToSlide(Math.min(storySteps.length - 1, activeStep + 3));
          break;
        default: {
          // Navegação numérica (teclas 1-9, 0)
          const numKey = parseInt(e.key);
          if (!isNaN(numKey) && numKey >= 0 && numKey <= 9) {
            // Tecla 0 vai para o slide 10, as outras vão para o slide correspondente
            const targetIndex = numKey === 0 ? 9 : numKey - 1;
            if (targetIndex < storySteps.length) {
              goToSlide(targetIndex);
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStep, isSectionVisible, t]);

  // Obter estilos responsivos
  const sectionStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "section"
  );
  const titleStyle = mergeStyles(
    useResponsiveStyles(howItWorksStyles, howItWorksMediaStyles, "title"),
    {
      fontFamily: typography.titleFontFamily,
      textTransform: "uppercase",
      letterSpacing: "0.01em",
      whiteSpace: isDesktop ? "nowrap" : "normal",
      maxWidth: isDesktop ? "100%" : undefined,
      padding: isDesktop ? "0 20px" : undefined,
    }
  );
  const contentStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "content"
  );
  const mockupSectionStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "mockupSection"
  );
  const mockupImageStyle = mergeStyles(
    useResponsiveStyles(howItWorksStyles, howItWorksMediaStyles, "mockupImage"),
    isExtraLarge ? { maxWidth: "380px" } : {}
  );
  const stepTitleStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "stepTitle"
  );
  const carouselStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "carousel"
  );
  const carouselSlideStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "carouselSlide"
  );
  const indicatorsStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "indicators"
  );
  const indicatorStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "indicator"
  );
  const indicatorActiveStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "indicatorActive"
  );
  const sideNavButtonStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "sideNavButton"
  );
  const prevButtonStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "prevButton"
  );
  const nextButtonStyle = useResponsiveStyles(
    howItWorksStyles,
    howItWorksMediaStyles,
    "nextButton"
  );

  // Estilos de animação
  const fadeInStyle = {
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  };

  const fadeInActiveStyle = {
    opacity: 1,
    transform: "translateY(0)",
  };

  // Renderiza apenas o slide ativo com animação de transição
  const renderActiveSlideOnly = () => {
    const storySteps = t("howItWorks.steps", { returnObjects: true }) as {
      title: string;
    }[];
    const activeSlide = storySteps[activeStep];

    // Animação baseada na direção
    const slideAnimation =
      direction === "next"
        ? "slideInFromRight"
        : direction === "prev"
        ? "slideInFromLeft"
        : "fadeIn";

    return (
      <div
        style={mergeStyles(carouselSlideStyle, {
          width: "100%",
          animation: `${slideAnimation} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`,
        })}
      >
        <div style={mockupSectionStyle}>
          <img
            src={storyStepsMockups[activeStep]}
            alt={activeSlide.title}
            style={mergeStyles(mockupImageStyle, {
              filter: "none",
              boxShadow: "none",
              animation: "floatDevice 6s infinite ease-in-out",
            })}
            key={`mockup-${activeStep}`}
            // Usar as imagens pré-carregadas quando possível
            ref={(el) => {
              if (el && preloadedImagesRef.current[activeStep]) {
                el.style.opacity = "1"; // Garantir que a imagem esteja visível imediatamente
              }
            }}
          />
        </div>
        <h3 style={stepTitleStyle}>{activeSlide.title}</h3>
      </div>
    );
  };

  const storySteps = t("howItWorks.steps", { returnObjects: true }) as {
    title: string;
  }[];

  return (
    <section ref={sectionRef} style={sectionStyle}>
      {/* Título animado com fade-in */}
      <h2
        style={mergeStyles(
          titleStyle,
          fadeInStyle,
          animateTitle ? fadeInActiveStyle : {}
        )}
      >
        {t("howItWorks.title")}
      </h2>

      {/* Carousel */}
      <div
        ref={carouselRef}
        style={mergeStyles(
          contentStyle,
          fadeInStyle,
          animateCarousel ? fadeInActiveStyle : {}
        )}
      >
        <div
          style={mergeStyles(carouselStyle, {
            position: "relative",
            transform: "translateZ(0)", // Força aceleração de hardware
            willChange: "transform", // Otimização para browsers modernos
          })}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botão Anterior - Ajustado para ficar no meio do mockup */}
          <button
            style={mergeStyles(
              sideNavButtonStyle,
              prevButtonStyle,
              {
                opacity: activeStep === 0 ? 0.5 : 1,
                top: "35%", // Ajustado para ficar no meio do mockup
              },
              fadeInStyle,
              animateControls ? fadeInActiveStyle : {}
            )}
            onClick={prevSlide}
            disabled={activeStep === 0}
            aria-label="Slide anterior"
          >
            &#8592;
          </button>

          {/* Renderização do slide ativo */}
          {renderActiveSlideOnly()}

          {/* Botão Próximo - Ajustado para ficar no meio do mockup */}
          <button
            style={mergeStyles(
              sideNavButtonStyle,
              nextButtonStyle,
              {
                opacity: activeStep === storySteps.length - 1 ? 0.5 : 1,
                top: "35%", // Ajustado para ficar no meio do mockup
              },
              fadeInStyle,
              animateControls ? fadeInActiveStyle : {}
            )}
            onClick={nextSlide}
            disabled={activeStep === storySteps.length - 1}
            aria-label="Próximo slide"
          >
            &#8594;
          </button>
        </div>

        {/* Indicadores de slide */}
        <div
          style={mergeStyles(
            indicatorsStyle,
            fadeInStyle,
            animateControls ? fadeInActiveStyle : {}
          )}
        >
          {storySteps.map((_, index) => {
            const isActive = activeStep === index;
            return (
              <div
                key={index}
                style={mergeStyles(
                  indicatorStyle,
                  isActive ? indicatorActiveStyle : {}
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para o slide ${index + 1}`}
                role="button"
                tabIndex={0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
