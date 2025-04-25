import React, { useState, useRef } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import navbarStyles, { navbarMediaStyles } from "../styles/components/navbar";
import { mergeStyles } from "../styles/utils";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import logoImage from "../assets/images/fitfolio-icon.png";
import { useNavbarVisibility } from "../hooks/useNavbarVisibility";
import { typography } from "../styles/appStyles";

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
  const navbarMobileToggleStyle = useResponsiveStyles(
    navbarStyles,
    navbarMediaStyles,
    "navbarMobileToggle"
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

  // Alternar entre abrir e fechar o menu mobile
  const toggleMobileMenu = () => {
    // Impedir scroll quando o menu está aberto
    document.body.style.overflow = isMobileMenuOpen ? "" : "hidden";
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  // Obter estilo do ícone CTA
  const getCTAIconStyle = () => {
    return hoverStates.cta
      ? mergeStyles(navbarStyles.navbarCTAIcon, navbarStyles.navbarCTAIconHover)
      : navbarStyles.navbarCTAIcon;
  };

  // Obter estilo do menu mobile
  const getMobileMenuStyle = () => {
    return isMobileMenuOpen
      ? mergeStyles(
          navbarStyles.navbarMobileMenu,
          navbarStyles.navbarMobileMenuOpen
        )
      : navbarStyles.navbarMobileMenu;
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

  // Obter estilo do botão CTA mobile
  const getMobileCTAStyle = () => {
    return hoverStates.mobileCta
      ? mergeStyles(
          navbarStyles.navbarMobileCTA,
          navbarStyles.navbarMobileCTAHover
        )
      : navbarStyles.navbarMobileCTA;
  };

  // Calcular os estilos da navbar com base nos estados
  const getNavbarStyles = () => {
    if (isScrolled && isHidden && !isMobileMenuOpen) {
      return mergeStyles(navbarStyle, navbarScrolledStyle, navbarHiddenStyle);
    }

    if (isScrolled) {
      return mergeStyles(navbarStyle, navbarScrolledStyle, navbarVisibleStyle);
    }

    if (isHidden && !isMobileMenuOpen) {
      return mergeStyles(navbarStyle, navbarHiddenStyle);
    }

    return mergeStyles(navbarStyle, navbarVisibleStyle);
  };

  // Componente de logo
  const LogoComponent = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={logoImage}
        alt="FitFolio Logo"
        width={35}
        height={35}
        style={{ marginRight: "8px" }}
      />
      <span
        style={{
          ...navbarStyles.navbarLogoText,
          fontWeight: typography.fontWeights.bold,
          letterSpacing: "0.05em",
          fontSize: isMobile ? "1rem" : "1.25rem",
          color: "#000",
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
          href="#home"
          style={navbarLogoStyle}
          onClick={() => handleLinkClick("home")}
        >
          <LogoComponent />
        </a>
      )}

      {/* Navbar */}
      <nav ref={navbarRef} style={getNavbarStyles()}>
        {/* Logo para mobile (incorporada na navbar) */}
        {isMobile && (
          <a
            href="#home"
            onClick={() => handleLinkClick("home")}
            style={{ display: "flex", alignItems: "center" }}
          >
            <LogoComponent />
          </a>
        )}

        {/* Links de navegação desktop (flutuantes) */}
        {!isMobile && (
          <div style={navbarFloatingLinksContainerStyle}>
            <a
              href="#home"
              style={getLinkStyle("home")}
              onMouseEnter={() => handleMouseEnter("home")}
              onMouseLeave={() => handleMouseLeave("home")}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </a>

            <a
              href="#recursos"
              style={getLinkStyle("recursos")}
              onMouseEnter={() => handleMouseEnter("recursos")}
              onMouseLeave={() => handleMouseLeave("recursos")}
              onClick={() => handleLinkClick("recursos")}
            >
              Recursos
            </a>

            <a
              href="#como-funciona"
              style={getLinkStyle("como")}
              onMouseEnter={() => handleMouseEnter("como")}
              onMouseLeave={() => handleMouseLeave("como")}
              onClick={() => handleLinkClick("como")}
            >
              Como
            </a>

            <a
              href="#sobre"
              style={getLinkStyle("sugestao")}
              onMouseEnter={() => handleMouseEnter("sugestao")}
              onMouseLeave={() => handleMouseLeave("sugestao")}
              onClick={() => handleLinkClick("sugestao")}
            >
              Sugestão
            </a>

            <button
              style={getCTAStyle()}
              onMouseEnter={() => handleMouseEnter("cta")}
              onMouseLeave={() => handleMouseLeave("cta")}
              onClick={() => handleLinkClick("cta")}
            >
              Começar
              <ChevronRight size={14} style={getCTAIconStyle()} />
            </button>
          </div>
        )}

        {/* Botão do menu mobile */}
        {isMobile && !isMobileMenuOpen && (
          <button
            style={navbarMobileToggleStyle}
            onClick={toggleMobileMenu}
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>
        )}
      </nav>

      {/* Botão X para fechar o menu (fixo na tela quando menu aberto) */}
      {isMobile && isMobileMenuOpen && (
        <button
          style={mergeStyles(
            navbarMobileToggleStyle,
            navbarStyles.navbarMobileToggleActive
          )}
          onClick={toggleMobileMenu}
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
      )}

      {/* Menu Mobile */}
      <div style={getMobileMenuStyle()}>
        <div style={navbarStyles.navbarMobileContent}>
          <a
            href="#home"
            style={getMobileLinkStyle("home")}
            onClick={() => handleLinkClick("home")}
          >
            Home
          </a>

          <a
            href="#recursos"
            style={getMobileLinkStyle("recursos")}
            onClick={() => handleLinkClick("recursos")}
          >
            Recursos
          </a>

          <a
            href="#como-funciona"
            style={getMobileLinkStyle("como")}
            onClick={() => handleLinkClick("como")}
          >
            Como Usar
          </a>

          <a
            href="#sobre"
            style={getMobileLinkStyle("sugestao")}
            onClick={() => handleLinkClick("sugestao")}
          >
            Sugestão
          </a>

          <a
            href="#cta"
            style={getMobileLinkStyle("sobre")}
            onClick={() => handleLinkClick("sobre")}
          >
            Sobre
          </a>

          <button
            style={getMobileCTAStyle()}
            onMouseEnter={() => handleMouseEnter("mobileCta")}
            onMouseLeave={() => handleMouseLeave("mobileCta")}
            onClick={() => handleLinkClick("cta")}
          >
            Começar <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
