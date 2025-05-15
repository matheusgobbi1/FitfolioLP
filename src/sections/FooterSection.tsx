import React from "react";
import { Instagram, ChevronRight, ArrowUp, Mail } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import footerSectionStyles, {
  footerSectionMediaStyles,
} from "../styles/sections/footerSection";
import { mergeStyles } from "../styles/utils";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import { colors, typography } from "../styles/appStyles";
import { addToWaitlist } from "../services/waitlistService";
import { useTranslation } from "react-i18next";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import { useInView } from "react-intersection-observer";

type NewsletterStatus = "idle" | "loading" | "success" | "error";

const FooterSection: React.FC = () => {
  const { t } = useTranslation();
  const [hoverStates, setHoverStates] = React.useState({
    instagram: false,
    tiktok: false,
    gmail: false,
  });

  const [navLinkHoverStates, setNavLinkHoverStates] = React.useState({
    recursos: false,
    contato: false,
    privacidade: false,
    termos: false,
  });

  const [inputFocused, setInputFocused] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [newsletterStatus, setNewsletterStatus] = React.useState<NewsletterStatus>("idle");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [buttonHovered, setButtonHovered] = React.useState(false);
  const [backToTopHovered, setBackToTopHovered] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPrivacyPolicy, setShowPrivacyPolicy] = React.useState(false);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const { ref: footerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
        setStatusMessage(t("footer.newsletter.success"));
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

  const closePrivacyPolicy = () => {
    setShowPrivacyPolicy(false);
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
    inView
      ? { opacity: 1, transform: "translateY(0)" }
      : { opacity: 0, transform: "translateY(20px)" }
  );

  const animatedContentStyle = mergeStyles(
    footerSectionStyles.footerContent,
    footerSectionStyles.footerContentAnimated,
    inView
      ? { opacity: 1, transform: "translateY(0)" }
      : { opacity: 0, transform: "translateY(20px)" }
  );

  const animatedBottomStyle = mergeStyles(
    footerBottomStyle,
    footerSectionStyles.footerBottomAnimated,
    inView
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
      {/* Modal de Política de Privacidade */}
      <PrivacyPolicyModal 
        isOpen={showPrivacyPolicy} 
        onClose={closePrivacyPolicy} 
      />

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
        aria-label={t("footer.backToTop")}
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
        <h1
          style={{
            ...animatedTitleStyle,
            fontFamily: typography.serifFontFamily,
            fontWeight: typography.fontWeights.bold,
            letterSpacing: "0.03em",
            fontSize: "2rem",
          }}
        >
          FITFOLIO
          <span style={footerSectionStyles.footerTitleUnderline} />
        </h1>

        <p style={footerSectionStyles.footerText}>{t("footer.description")}</p>

        {/* Formulário de Newsletter */}
        <div style={footerSectionStyles.newsletterContainer}>
          <h3 style={footerSectionStyles.newsletterTitle}>
            {t("footer.newsletter.title")}
          </h3>
          <p style={footerSectionStyles.newsletterText}>
            {t("footer.newsletter.description")}
          </p>

          <form style={newsletterFormStyle} onSubmit={handleSubscribe}>
            <input
              ref={emailInputRef}
              type="email"
              placeholder={t("footer.newsletter.placeholder")}
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
              {newsletterStatus === "loading"
                ? t("footer.newsletter.loading")
                : t("footer.newsletter.button")}
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
              {
                name: t("footer.nav.features"),
                href: "#recursos",
                id: "recursos",
              },
              {
                name: t("footer.nav.contact"),
                href: "mailto:fitfolio.app.br@gmail.com",
                id: "contato",
              },
              {
                name: t("footer.nav.privacy"),
                href: "/privacy-policy.html",
                id: "privacidade",
              },
              { name: t("footer.nav.terms"), href: "#termos", id: "termos" },
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                style={getNavLinkStyle(
                  navLinkHoverStates[item.id as keyof typeof navLinkHoverStates]
                )}
                onMouseEnter={() => handleNavLinkMouseEnter(item.id)}
                onMouseLeave={() => handleNavLinkMouseLeave(item.id)}
                target={item.id === "privacidade" ? "_blank" : undefined}
                rel={item.id === "privacidade" ? "noopener noreferrer" : undefined}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <p style={footerSectionStyles.footerCopyright}>
            {t("footer.copyright").replace("2024", currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
