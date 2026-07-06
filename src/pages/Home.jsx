import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import SearchExperience from "../components/SearchExperience.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Contact from "../components/Contact.jsx";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [hash]);

  return (
    <>
      <Hero />
      <SearchExperience />
      <Features />
      <HowItWorks />
    </>
  );
}
