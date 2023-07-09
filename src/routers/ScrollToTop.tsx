import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface ScrollToTopProps {}

const ScrollToTop: React.FC<ScrollToTopProps> = () => {
  const locationPathName = useLocation().pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationPathName]);

  return null;
};

export default ScrollToTop;
