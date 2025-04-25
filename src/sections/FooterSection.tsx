import React, { useState, useRef, useEffect } from "react";
import { Instagram, ChevronRight, ArrowUp, Mail } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import footerSectionStyles, {
  footerSectionMediaStyles,
} from "../styles/sections/footerSection";
import { mergeStyles } from "../styles/utils";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import { colors } from "../styles/appStyles";
import { addToWaitlist } from "../services/waitlistService";

type NewsletterStatus = "idle" | "loading" | "success" | "error";

const FooterSection: React.FC = () => {
  const [hoverStates, setHoverStates] = useState({
    instagram: false,
    tiktok: false,
    gmail: false,
  });

  const [navLinkHoverStates, setNavLinkHoverStates] = useState({
    recursos: false,
    contato: false,
    privacidade: false,
    termos: false,
  });

  const [inputFocused, setInputFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [newsletterStatus, setNewsletterStatus] =
    useState<NewsletterStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [buttonHovered, setButtonHovered] = useState(false);
  const [backToTopHovered, setBackToTopHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const footerRef = useRef<HTMLElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const footerStyle = useResponsiveStyles(
    footerSectionStyles,
    footerSectionMediaStyles,
    "footer"
  );
  const footerBottomStyle = useResponsiveStyles(
    footerSectionStyles,
    footerSectionMediaStyles,
    "footerBottom"
  );
  const newsletterFormStyle = useResponsiveStyles(
    footerSectionStyles,
    footerSectionMediaStyles,
    "newsletterForm"
  );

  // Efeito para detectar quando o footer entra na viewport
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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = (social: keyof typeof hoverStates) => {
    setHoverStates((prev) => ({ ...prev, [social]: true }));
  };

  const handleMouseLeave = (social: keyof typeof hoverStates) => {
    setHoverStates((prev) => ({ ...prev, [social]: false }));
  };

  const getSocialLinkStyle = (social: keyof typeof hoverStates) => {
    return hoverStates[social]
      ? mergeStyles(
          footerSectionStyles.socialLink,
          footerSectionStyles.socialLinkHover
        )
      : footerSectionStyles.socialLink;
  };

  const getNavLinkStyle = (isHovered: boolean) => {
    return isHovered
      ? mergeStyles(
          footerSectionStyles.footerNavLink,
          footerSectionStyles.footerNavLinkHover
        )
      : footerSectionStyles.footerNavLink;
  };

  const getInputStyle = () => {
    if (newsletterStatus === "loading") {
      return mergeStyles(footerSectionStyles.newsletterInput, {
        opacity: 0.7,
        backgroundColor: `${colors.grayLight}50`,
        cursor: "not-allowed",
      });
    }
    if (inputFocused) {
      return mergeStyles(
        footerSectionStyles.newsletterInput,
        footerSectionStyles.newsletterInputFocus
      );
    }
    return footerSectionStyles.newsletterInput;
  };

  const getButtonStyle = () => {
    if (newsletterStatus === "loading") {
      return mergeStyles(footerSectionStyles.newsletterButton, {
        opacity: 0.7,
        cursor: "not-allowed",
      });
    }
    if (buttonHovered) {
      return mergeStyles(
        footerSectionStyles.newsletterButton,
        footerSectionStyles.newsletterButtonHover
      );
    }
    return footerSectionStyles.newsletterButton;
  };

  const getStatusStyle = () => {
    const baseStyle = {
      fontSize: "14px",
      margin: "10px 0 0",
      transition: "opacity 0.3s ease",
      opacity: newsletterStatus === "idle" ? 0 : 1,
    };

    if (newsletterStatus === "success") {
      return {
        ...baseStyle,
        color: "#4CAF50", // Verde
      };
    } else if (newsletterStatus === "error") {
      return {
        ...baseStyle,
        color: "#F44336", // Vermelho
      };
    }

    return baseStyle;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setNewsletterStatus("loading");

    try {
      const result = await addToWaitlist(email);

      if (result.success) {
        setNewsletterStatus("success");
        setEmail("");
        setStatusMessage(
          "Obrigado por se inscrever! Você receberá nossas novidades."
        );
        setTimeout(() => {
          setNewsletterStatus("idle");
        }, 3000);
      } else {
        setNewsletterStatus("error");
        setErrorMessage(result.message);
        setTimeout(() => {
          setNewsletterStatus("idle");
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao adicionar à lista de espera:", error);
      setNewsletterStatus("error");
      setErrorMessage("Ocorreu um erro. Tente novamente mais tarde.");
      setTimeout(() => {
        setNewsletterStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (newsletterStatus !== "idle") {
      setNewsletterStatus("idle");
      setStatusMessage("");
    }
  };

  // Função para rolar suavemente para o topo da página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backToTopStyle = mergeStyles(
    footerSectionStyles.backToTopButton,
    backToTopHovered ? footerSectionStyles.backToTopButtonHover : {}
  );

  const currentYear = new Date().getFullYear();

  // Estilos com animação
  const animatedFooterStyle = mergeStyles(
    footerStyle,
    footerSectionStyles.footerAnimated
  );

  const animatedTitleStyle = mergeStyles(
    footerSectionStyles.footerTitle,
    footerSectionStyles.footerTitleAnimated,
    isVisible
      ? { opacity: 1, transform: "translateY(0)" }
      : { opacity: 0, transform: "translateY(20px)" }
  );

  const animatedContentStyle = mergeStyles(
    footerSectionStyles.footerContent,
    footerSectionStyles.footerContentAnimated,
    isVisible
      ? { opacity: 1, transform: "translateY(0)" }
      : { opacity: 0, transform: "translateY(20px)" }
  );

  const animatedBottomStyle = mergeStyles(
    footerBottomStyle,
    footerSectionStyles.footerBottomAnimated,
    isVisible
      ? { opacity: 1, transform: "translateY(0)" }
      : { opacity: 0, transform: "translateY(20px)" }
  );

  const handleNavLinkMouseEnter = (name: string) => {
    setNavLinkHoverStates((prev) => ({ ...prev, [name]: true }));
  };

  const handleNavLinkMouseLeave = (name: string) => {
    setNavLinkHoverStates((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <footer style={animatedFooterStyle} ref={footerRef}>
      {/* Elementos decorativos */}
      <div
        style={mergeStyles(
          footerSectionStyles.footerDecoration,
          footerSectionStyles.footerDecorationLeft
        )}
      />
      <div
        style={mergeStyles(
          footerSectionStyles.footerDecoration,
          footerSectionStyles.footerDecorationRight
        )}
      />

      {/* Botão Voltar ao Topo */}
      <div
        style={backToTopStyle}
        onClick={scrollToTop}
        onMouseEnter={() => setBackToTopHovered(true)}
        onMouseLeave={() => setBackToTopHovered(false)}
        aria-label="Voltar ao topo"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            scrollToTop();
          }
        }}
      >
        <ArrowUp size={20} />
      </div>

      <div style={animatedContentStyle}>
        <h1 style={animatedTitleStyle}>
          FITFOLIO
          <span style={footerSectionStyles.footerTitleUnderline} />
        </h1>

        <p style={footerSectionStyles.footerText}>
          Acompanhe cada treino, monitore sua dieta e seus macros, mantenha a
          consistência e veja resultados reais. Transforme sua jornada para uma
          vida mais saudável com o Fitfolio.
        </p>

        {/* Formulário de Newsletter */}
        <div style={footerSectionStyles.newsletterContainer}>
          <h3 style={footerSectionStyles.newsletterTitle}>Entre para o teste beta</h3>
          <p style={footerSectionStyles.newsletterText}>
            Teste o FitFolio antes do lançamento oficial.
          </p>

          <form style={newsletterFormStyle} onSubmit={handleSubscribe}>
            <input
              ref={emailInputRef}
              type="email"
              placeholder="Seu melhor e-mail"
              required
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={getInputStyle()}
              disabled={newsletterStatus === "loading"}
              aria-label="Endereço de email"
            />
            <button
              type="submit"
              style={getButtonStyle()}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              disabled={newsletterStatus === "loading"}
            >
              {newsletterStatus === "loading" ? "Enviando..." : "Inscrever-se"}
              {newsletterStatus !== "loading" && (
                <ChevronRight size={16} style={{ marginLeft: "4px" }} />
              )}
            </button>
          </form>

          {/* Mensagem de status */}
          {newsletterStatus !== "idle" && (
            <p style={getStatusStyle()}>
              {newsletterStatus === "error" ? errorMessage : statusMessage}
            </p>
          )}
        </div>

        <div style={footerSectionStyles.socialLinks}>
          <a
            href="https://instagram.com/fitfolio.app"
            target="_blank"
            rel="noopener noreferrer"
            style={getSocialLinkStyle("instagram")}
            aria-label="Instagram"
            onMouseEnter={() => handleMouseEnter("instagram")}
            onMouseLeave={() => handleMouseLeave("instagram")}
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            style={getSocialLinkStyle("tiktok")}
            aria-label="TikTok"
            onMouseEnter={() => handleMouseEnter("tiktok")}
            onMouseLeave={() => handleMouseLeave("tiktok")}
          >
            <FaTiktok size={20} />
          </a>
          <a
            href="mailto:fitfolio.app.br@gmail.com"
            rel="noopener noreferrer"
            style={getSocialLinkStyle("gmail")}
            aria-label="Email"
            onMouseEnter={() => handleMouseEnter("gmail")}
            onMouseLeave={() => handleMouseLeave("gmail")}
          >
            <Mail size={20} />
          </a>
        </div>

        <div style={animatedBottomStyle}>
          <nav style={footerSectionStyles.footerNav}>
            {[
              { name: "Recursos", href: "#recursos", id: "recursos" },
              {
                name: "Contato",
                href: "mailto:fitfolio.app.br@gmail.com",
                id: "contato",
              },
              {
                name: "Política de Privacidade",
                href: "#privacidade",
                id: "privacidade",
              },
              { name: "Termos de Uso", href: "#termos", id: "termos" },
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                style={getNavLinkStyle(
                  navLinkHoverStates[item.id as keyof typeof navLinkHoverStates]
                )}
                onMouseEnter={() => handleNavLinkMouseEnter(item.id)}
                onMouseLeave={() => handleNavLinkMouseLeave(item.id)}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <p style={footerSectionStyles.footerCopyright}>
            © {currentYear} Fitfolio. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
