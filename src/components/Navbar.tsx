import React, { useState, useRef } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import navbarStyles, { navbarMediaStyles } from "../styles/components/navbar";
import { mergeStyles } from "../styles/utils";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import logoImage from "../assets/images/fitfolio-icon.png";
import { useNavbarVisibility } from "../hooks/useNavbarVisibility";
import { typography, colors, spacing } from "../styles/appStyles";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  // Estados principais
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hoverStates, setHoverStates] = useState({
    home: false,
    recursos: false,
    como: false,
    sugestao: false,
    sobre: false,
    cta: false,
    mobileCta: false,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Usar hook customizado para controlar visibilidade da navbar
  const { isScrolled, isHidden, isMobile } =
    useNavbarVisibility(isMobileMenuOpen);

  // Refs
  const navbarRef = useRef<HTMLElement>(null);

  // Estilos responsivos
  const navbarStyle = useResponsiveStyles(
    navbarStyles,
    navbarMediaStyles,
    "navbar"
  );
  const navbarScrolledStyle = useResponsiveStyles(
    navbarStyles,
    navbarMediaStyles,
    "navbarScrolled"
  );
  const navbarHiddenStyle = useResponsiveStyles(
    navbarStyles,
    navbarMediaStyles,
    "navbarHidden"
  );
  const navbarVisibleStyle = useResponsiveStyles(
    navbarStyles,
    navbarMediaStyles,
    "navbarVisible"
  );
  const navbarFloatingLinksContainerStyle = useResponsiveStyles(
    navbarStyles,
    navbarMediaStyles,
    "navbarFloatingLinksContainer"
  );
  const navbarLogoStyle = useResponsiveStyles(
    navbarStyles,
    navbarMediaStyles,
    "navbarLogo"
  );

  // Manipular o hover nos links
  const handleMouseEnter = (link: keyof typeof hoverStates) => {
    setHoverStates((prev) => ({ ...prev, [link]: true }));
  };

  const handleMouseLeave = (link: keyof typeof hoverStates) => {
    setHoverStates((prev) => ({ ...prev, [link]: false }));
  };

  // Manipular o clique nos links
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";

    // Se estiver na página inicial, rola até a seção
    if (isHomePage) {
      // Mapeamento para direcionar para as seções corretas
      const linkToSectionMap: Record<string, string> = {
        sugestao: "sobre",
        como: "como-funciona",
      };

      // Verificar se há um mapeamento especial para este link
      const targetSection = linkToSectionMap[link] || link;

      // Scroll suave para a seção correspondente
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Se estiver em outra página, navega para a home e adiciona o hash
      const linkToSectionMap: Record<string, string> = {
        sugestao: "sobre",
        como: "como-funciona",
      };
      const targetSection = linkToSectionMap[link] || link;
      navigate(`/#${targetSection}`);
    }
  };

  // Navegar para a página inicial
  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    setActiveLink("home");
  };

  // Obter o estilo do link
  const getLinkStyle = (link: keyof typeof hoverStates) => {
    const isActive = activeLink === link;
    const isHovered = hoverStates[link];

    if (isActive && isHovered) {
      return mergeStyles(
        navbarStyles.navbarLink,
        navbarStyles.navbarLinkActive,
        navbarStyles.navbarLinkHover
      );
    }

    if (isActive) {
      return mergeStyles(
        navbarStyles.navbarLink,
        navbarStyles.navbarLinkActive
      );
    }

    if (isHovered) {
      return mergeStyles(navbarStyles.navbarLink, navbarStyles.navbarLinkHover);
    }

    return navbarStyles.navbarLink;
  };

  // Obter estilo do botão CTA
  const getCTAStyle = () => {
    return hoverStates.cta
      ? mergeStyles(navbarStyles.navbarCTA, navbarStyles.navbarCTAHover)
      : navbarStyles.navbarCTA;
  };

  // Obter estilo do link mobile
  const getMobileLinkStyle = (link: string) => {
    const isActive = activeLink === link;

    return isActive
      ? mergeStyles(
          navbarStyles.navbarMobileLink,
          navbarStyles.navbarMobileLinkActive
        )
      : navbarStyles.navbarMobileLink;
  };

  // Calcular os estilos da navbar com base nos estados
  const getNavbarStyles = (): React.CSSProperties => {
    let finalStyle: React.CSSProperties;
    if (isScrolled && isHidden && !isMobileMenuOpen) {
      finalStyle = mergeStyles(
        navbarStyle,
        navbarScrolledStyle,
        navbarHiddenStyle
      );
    } else if (isScrolled) {
      finalStyle = mergeStyles(
        navbarStyle,
        navbarScrolledStyle,
        navbarVisibleStyle
      );
    } else if (isHidden && !isMobileMenuOpen) {
      finalStyle = mergeStyles(navbarStyle, navbarHiddenStyle);
    } else {
      finalStyle = mergeStyles(navbarStyle, navbarVisibleStyle);
    }
    console.log(
      "[Navbar] isHidden:",
      isHidden,
      "isScrolled:",
      isScrolled,
      "isMobileMenuOpen:",
      isMobileMenuOpen,
      "isMobile:",
      isMobile,
      "Final Style:",
      finalStyle
    );
    return finalStyle;
  };

  // Componente de logo
  const LogoComponent = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={logoImage}
        alt="FitFolio Logo"
        width={45}
        height={45}
        style={{ marginRight: "10px" }}
      />
      <span
        style={{
          ...navbarStyles.navbarLogoText,
          fontFamily: typography.serifFontFamily,
          fontWeight: typography.fontWeights.bold,
          letterSpacing: "0.03em",
          fontSize: isMobile ? "1.25rem" : "1.5rem",
          color: "#000",
          textDecoration: "none",
          borderBottom: "none",
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
      >
        FITFOLIO
      </span>
    </div>
  );

  return (
    <>
      {/* Logo flutuante apenas no desktop */}
      {!isMobile && (
        <a
          href="/"
          style={navbarLogoStyle}
          onClick={navigateToHome}
        >
          <LogoComponent />
        </a>
      )}

      {/* Seletor de idioma minimalista no desktop */}
      {!isMobile && <LanguageSwitcher isMinimal={true} />}

      {/* Navbar */}
      <nav ref={navbarRef} style={getNavbarStyles()}>
        {/* Logo para mobile (incorporada na navbar) */}
        {isMobile && (
          <a
            href="/"
            onClick={navigateToHome}
            style={{ display: "flex", alignItems: "center" }}
          >
            <LogoComponent />
          </a>
        )}

        {/* Links de navegação desktop (flutuantes) */}
        {!isMobile && (
          <div style={navbarFloatingLinksContainerStyle}>
            <a
              href={isHomePage ? "#home" : "/"}
              style={getLinkStyle("home")}
              onMouseEnter={() => handleMouseEnter("home")}
              onMouseLeave={() => handleMouseLeave("home")}
              onClick={(e) => {
                e.preventDefault();
                if (!isHomePage) {
                  navigate("/");
                } else {
                  handleLinkClick("home");
                }
              }}
            >
              {t("navbar.home")}
            </a>

            <a
              href={isHomePage ? "#recursos" : "/#recursos"}
              style={getLinkStyle("recursos")}
              onMouseEnter={() => handleMouseEnter("recursos")}
              onMouseLeave={() => handleMouseLeave("recursos")}
              onClick={(e) => {
                e.preventDefault();
                if (!isHomePage) {
                  navigate("/#recursos");
                } else {
                  handleLinkClick("recursos");
                }
              }}
            >
              {t("navbar.features")}
            </a>

            <a
              href={isHomePage ? "#como-funciona" : "/#como-funciona"}
              style={getLinkStyle("como")}
              onMouseEnter={() => handleMouseEnter("como")}
              onMouseLeave={() => handleMouseLeave("como")}
              onClick={(e) => {
                e.preventDefault();
                if (!isHomePage) {
                  navigate("/#como-funciona");
                } else {
                  handleLinkClick("como");
                }
              }}
            >
              {t("navbar.howItWorks")}
            </a>

            <a
              href={isHomePage ? "#sobre" : "/#sobre"}
              style={getLinkStyle("sugestao")}
              onMouseEnter={() => handleMouseEnter("sugestao")}
              onMouseLeave={() => handleMouseLeave("sugestao")}
              onClick={(e) => {
                e.preventDefault();
                if (!isHomePage) {
                  navigate("/#sobre");
                } else {
                  handleLinkClick("sugestao");
                }
              }}
            >
              {t("navbar.about")}
            </a>

            <a
              href={isHomePage ? "#cta" : "/#cta"}
              style={getLinkStyle("sobre")}
              onMouseEnter={() => handleMouseEnter("sobre")}
              onMouseLeave={() => handleMouseLeave("sobre")}
              onClick={(e) => {
                e.preventDefault();
                if (!isHomePage) {
                  navigate("/#cta");
                } else {
                  handleLinkClick("sobre");
                }
              }}
            >
              {t("navbar.contact")}
            </a>

            <button
              style={getCTAStyle()}
              onMouseEnter={() => handleMouseEnter("cta")}
              onMouseLeave={() => handleMouseLeave("cta")}
              onClick={() => {
                if (!isHomePage) {
                  navigate("/#cta");
                } else {
                  handleLinkClick("cta");
                }
              }}
            >
              {t("hero.ctaButton")}
            </button>
          </div>
        )}
      </nav>

      {/* Botão toggle para exibir menu em dispositivos móveis (agora fora do <nav>) */}
      {isMobile && (
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: isMobileMenuOpen ? "#ffffff" : "transparent",
            border: "none",
            color: colors.primary,
            cursor: "pointer",
            padding: spacing.sm,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            position: "fixed", // Sempre fixo agora, posição controlada pelos ternários abaixo
            top: "10px", // Posição quando menu está aberto ou fechado
            right: "20px", // Posição quando menu está aberto ou fechado
            zIndex: 1500, // Garante que fique acima de tudo
            boxShadow: isMobileMenuOpen
              ? "0 2px 8px rgba(0, 0, 0, 0.1)"
              : "none", // Sombra só quando aberto
            transition:
              "background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Adicionada transição para transform e opacity
            // Aplicar a mesma lógica de transformação e visibilidade que a navbar
            transform:
              isHidden && !isMobileMenuOpen
                ? "translateY(-100%)"
                : "translateY(0)",
            opacity: isHidden && !isMobileMenuOpen ? 0 : 1,
            pointerEvents: isHidden && !isMobileMenuOpen ? "none" : "auto",
          }}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
          }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Menu para dispositivos móveis */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          transform: isMobileMenuOpen ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 1005,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.xl,
            padding: spacing["2xl"],
            paddingTop: "80px",
            width: "100%",
            maxWidth: "500px",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
          }}
        >
          <a
            href={isHomePage ? "#home" : "/"}
            style={getMobileLinkStyle("home")}
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate("/");
              } else {
                handleLinkClick("home");
              }
            }}
          >
            {t("navbar.home")}
          </a>

          <a
            href={isHomePage ? "#recursos" : "/#recursos"}
            style={getMobileLinkStyle("recursos")}
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate("/#recursos");
              } else {
                handleLinkClick("recursos");
              }
            }}
          >
            {t("navbar.features")}
          </a>

          <a
            href={isHomePage ? "#como-funciona" : "/#como-funciona"}
            style={getMobileLinkStyle("como")}
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate("/#como-funciona");
              } else {
                handleLinkClick("como");
              }
            }}
          >
            {t("navbar.howItWorks")}
          </a>

          <a
            href={isHomePage ? "#sobre" : "/#sobre"}
            style={getMobileLinkStyle("sugestao")}
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate("/#sobre");
              } else {
                handleLinkClick("sugestao");
              }
            }}
          >
            {t("navbar.about")}
          </a>

          <a
            href={isHomePage ? "#cta" : "/#cta"}
            style={getMobileLinkStyle("sobre")}
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate("/#cta");
              } else {
                handleLinkClick("sobre");
              }
            }}
          >
            {t("navbar.contact")}
          </a>

          <LanguageSwitcher />

          <button
            style={{
              backgroundColor: colors.primary,
              color: colors.light,
              border: "none",
              borderRadius: "25px",
              padding: `${spacing.md} ${spacing.lg}`,
              fontSize: typography.fontSizes.lg,
              fontWeight: typography.fontWeights.semibold,
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "80%",
              maxWidth: "300px",
              marginTop: spacing.lg,
              marginBottom: "100px", // Espaço extra para o botão não ficar coberto
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.sm,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              letterSpacing: "0.05em",
              position: "relative",
              zIndex: 1006,
            }}
            onMouseEnter={() => handleMouseEnter("mobileCta")}
            onMouseLeave={() => handleMouseLeave("mobileCta")}
            onClick={() => {
              if (!isHomePage) {
                navigate("/#cta");
              } else {
                handleLinkClick("cta");
              }
            }}
          >
            {t("hero.ctaButton")} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
