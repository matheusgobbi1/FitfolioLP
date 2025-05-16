import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface NavbarVisibilityState {
  isScrolled: boolean;
  isHidden: boolean;
  isMobile: boolean;
}

export const useNavbarVisibility = (isMobileMenuOpen: boolean = false): NavbarVisibilityState => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  // Verificar responsividade
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Cria um efeito para o resize
  const handleResize = () => {
    checkMobile();
  };

  // Criar um efeito para o scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Verificamos se estamos na página de registro de eventos
    const isEventPage = location.pathname.includes('evento-fitfolio-run');
    
    // Lógica diferente baseada na página atual
    if (isEventPage) {
      // Na página do evento, simplesmente mostrar a navbar quando no topo e esconder quando rolar para baixo
      setIsHidden(currentScrollY > 100);
      setIsScrolled(currentScrollY > 50);
    } else {
      // Na página principal, usar a lógica original
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
  
      // Se menu mobile estiver aberto, sempre mostrar
      if (isMobileMenuOpen) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }
  
      // Esconder quando rolar para baixo, mostrar quando rolar para cima
      if (currentScrollY > lastScrollY.current + 10) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsHidden(false);
      }
    }
    
    lastScrollY.current = currentScrollY;
  };

  // Configurar e limpar event listeners
  useEffect(() => {
    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen, location.pathname]);

  // Reset da visibilidade quando a localização muda
  useEffect(() => {
    setIsHidden(false);
    setIsScrolled(false);
    lastScrollY.current = 0;
  }, [location.pathname]);

  return { isScrolled, isHidden, isMobile };
};
