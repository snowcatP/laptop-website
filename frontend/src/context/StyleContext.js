// src/contexts/StyleContext.js
import { createContext, useContext, useEffect } from 'react';

const StyleContext = createContext();

export function useStyle() {
  return useContext(StyleContext);
}

export const StyleProvider = ({ children }) => {
  useEffect(() => {
    // Function to remove all CSS links
    const removeAllCss = () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      cssLinks.forEach(link => {
        if (link.href.includes("/static/css/")) {
          document.head.removeChild(link);
        }
      });
    };

    // Function to load CSS
    const loadCss = (href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.href = href;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    };

    const currentPath = window.location.pathname;
    removeAllCss(); 
    if (currentPath.startsWith('/admin')) {
      loadCss('./assets/css/bootstrap-admin.min.css')
      loadCss('./assets/css/admin.css');
    } else {
      loadCss('./assets/css/client.css');
    }

    // Cleanup to remove CSS on component unmount
    return () => {
      removeAllCss();
    };
  }, []);

  return (
    <StyleContext.Provider value={{}}>
      {children}
    </StyleContext.Provider>
  );
};
