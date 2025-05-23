import React, { useState, useRef, useEffect } from "react";
import valuePropositionStyles, {
  valuePropositionMediaStyles,
} from "../styles/sections/valuePropositionSection";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import { Utensils, Dumbbell, LineChart } from "lucide-react";
import { mergeStyles } from "../styles/utils";
import { useTranslation } from "react-i18next";
import { typography } from "../styles/appStyles";

const ValuePropositionSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const valuePropositionStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueProposition"
  );
  const valueTitleStyle = mergeStyles(
    useResponsiveStyles(
      valuePropositionStyles,
      valuePropositionMediaStyles,
      "valueTitle"
    ),
    {
      fontFamily: typography.titleFontFamily,
      textTransform: "uppercase",
      letterSpacing: "0.01em",
      whiteSpace: isDesktop ? "nowrap" : "normal",
      maxWidth: isDesktop ? "100%" : "800px",
    }
  );
  const valueDescriptionStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueDescription"
  );
  const valueCardsContainerStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueCardsContainer"
  );
  const valueCardStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueCard"
  );
  const valueCardHoverStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueCardHover"
  );
  const valueCardIconStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueCardIcon"
  );
  const valueCardTitleStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueCardTitle"
  );
  const valueCardDescriptionStyle = useResponsiveStyles(
    valuePropositionStyles,
    valuePropositionMediaStyles,
    "valueCardDescription"
  );

  // Dados dos cards de funcionalidades
  const featureCards = [
    {
      icon: <Utensils size={24} />,
      iconBg: "#B794F6", // Roxo claro
      translationKey: "feature1",
    },
    {
      icon: <Dumbbell size={24} />,
      iconBg: "#90CDF4", // Azul claro
      translationKey: "feature2",
    },
    {
      icon: <LineChart size={24} />,
      iconBg: "#9AE6B4", // Verde claro
      translationKey: "feature3",
    },
  ];

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

  // Configurar observadores para cada elemento
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px 0px -50px 0px", // Reduzido para iniciar animação mais cedo
      threshold: 0.01, // Reduzido para iniciar animação com apenas 1% do elemento visível
    };

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      elementId: string
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => new Set(prev).add(elementId));
        }
      });
    };

    // Criar observadores para cada elemento
    const observers: IntersectionObserver[] = [];

    // Observador para o título
    if (titleRef.current) {
      const titleObserver = new IntersectionObserver(
        (entries) => handleIntersection(entries, "title"),
        observerOptions
      );
      titleObserver.observe(titleRef.current);
      observers.push(titleObserver);
    }

    // Observador para a descrição
    if (descriptionRef.current) {
      const descriptionObserver = new IntersectionObserver(
        (entries) => handleIntersection(entries, "description"),
        observerOptions
      );
      descriptionObserver.observe(descriptionRef.current);
      observers.push(descriptionObserver);
    }

    // Observadores para os cards
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const cardObserver = new IntersectionObserver(
          (entries) => handleIntersection(entries, `card-${index}`),
          observerOptions
        );
        cardObserver.observe(cardRef);
        observers.push(cardObserver);
      }
    });

    // Limpar observadores
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Verificar se um elemento está visível
  const isElementVisible = (elementId: string) => {
    return visibleElements.has(elementId);
  };

  return (
    <section style={valuePropositionStyle} ref={sectionRef}>
      {/* Elementos decorativos de fundo removidos */}

      <h2
        ref={titleRef}
        style={{
          ...valueTitleStyle,
          opacity: isElementVisible("title") ? 1 : 0,
          transform: isElementVisible("title")
            ? "translateY(0) translateZ(0)"
            : "translateY(20px) translateZ(0)",
          transition:
            "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
          willChange: "opacity, transform",
        }}
      >
        {t("valueProposition.title")}
      </h2>

      <p
        ref={descriptionRef}
        style={{
          ...valueDescriptionStyle,
          opacity: isElementVisible("description") ? 1 : 0,
          transform: isElementVisible("description")
            ? "translateY(0) translateZ(0)"
            : "translateY(20px) translateZ(0)",
          transition:
            "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
          transitionDelay: "0.1s",
          willChange: "opacity, transform",
        }}
      >
        {t("valueProposition.description")}
      </p>

      <div style={valueCardsContainerStyle}>
        {featureCards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            style={mergeStyles(
              valueCardStyle,
              hoveredCard === index ? valueCardHoverStyle : {},
              {
                opacity: isElementVisible(`card-${index}`) ? 1 : 0,
                transform: isElementVisible(`card-${index}`)
                  ? hoveredCard === index
                    ? "translateY(-5px) translateZ(0)"
                    : "translateY(0) translateZ(0)"
                  : "translateY(30px) translateZ(0)",
                transition:
                  "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.2s ease",
                transitionDelay: `${0.1 + index * 0.1}s`,
                willChange: "opacity, transform",
              }
            )}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={mergeStyles(valueCardIconStyle, {
                backgroundColor: card.iconBg,
                color: "#FFFFFF",
                opacity: isElementVisible(`card-${index}`) ? 1 : 0,
                transform: isElementVisible(`card-${index}`)
                  ? "scale(1) translateZ(0)"
                  : "scale(0.5) translateZ(0)",
                transition:
                  "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                transitionDelay: `${0.2 + index * 0.1}s`,
                willChange: "opacity, transform",
              })}
            >
              {card.icon}
            </div>

            <h3 style={valueCardTitleStyle}>
              {/* @ts-expect-error - Ignorando temporariamente problema de tipagem com as chaves de tradução */}
              {t(`valueProposition.${card.translationKey}.title`)}
            </h3>

            <p style={valueCardDescriptionStyle}>
              {/* @ts-expect-error - Ignorando temporariamente problema de tipagem com as chaves de tradução */}
              {t(`valueProposition.${card.translationKey}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuePropositionSection;
