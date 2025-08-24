import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n";
import Stage, { TRANSITION_MS } from "@/components/Stage";
import ScreenWipe from "@/components/ScreenWipe";
import IntroGate from "@/components/IntroGate";
import RadialMenu from "@/components/RadialMenu";
import Modal from "@/components/Modal";
import LanguageToggle from "@/components/LanguageToggle";
import hero from "@/assets/images/hero.png";
import introGif from "@/assets/images/circle.gif";
import MuteToggle from "@/components/MuteToggle";
import Footer from "@/components/Footer";
import AboutPanel from "@/components/AboutPanel";
import ServicesPanel from "@/components/ServicesPanel";
import ContactPanel from "@/components/ContactPanel";



const PAGES = { ABOUT: "about", SERVICES: "services", CONTACT: "contact", BLOG: "blog" };




export default function App() {
  const { t } = useI18n();
  const navigate = useNavigate();

  // intro | intro-out | menu | menu-out | panel
  const location = useLocation();
  const [stage, setStage] = useState(() => (
  location.state?.startAt === "menu" ? "menu" : "intro"
 ));
  const [page, setPage] = useState(null);
  const [wipe, setWipe] = useState(false);
  const [pendingNav, setPendingNav] = useState(null);
  
  const showFooter = stage === "menu" || stage === "menu-out" || stage === "panel";

  const modalOpen = stage === "panel" && !!page;

  useEffect(() => {
    if (modalOpen) {
      const ae = document.activeElement;
      if (ae && typeof ae.blur === "function") ae.blur();
    }
  }, [modalOpen]);

  
  const handleStart = () => {
    setStage("intro-out");
    setWipe(true);
  };

  // Click wedge
  const openPage = (k) => {
    if (k === PAGES.BLOG) {
      
      setPendingNav("/blog");
      setWipe(true);
      return;
    }
    setStage("menu-out");
    setTimeout(() => {
      setPage(k);
      setStage("panel");
    }, TRANSITION_MS);
  };

  const titleFor = (p) =>
    p === PAGES.ABOUT ? t("about.title")
    : p === PAGES.SERVICES ? t("services.title")
    : t("contact.title");

  const descFor = (p) =>
    p === PAGES.ABOUT ? t("about.desc")
    : p === PAGES.SERVICES ? t("services.desc")
    : t("contact.desc");

  return (
    <main className="min-h-dvh flex flex-col relative overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
      <div className="absolute inset-0 -z-10 bg-black/70" />

      {/* Controls (lingua + mute) — nascosti quando c’è la modale */}
      <div
        className={`absolute top-4 right-4 z-40 flex gap-2 transition-opacity ${
          modalOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <MuteToggle />
        <LanguageToggle />
      </div>

      {/* ===== Wrapper CONTENUTI (scene + footer) che cresce ===== */}
      <div
        id="page"
        className={`relative z-10 flex-1 flex flex-col ${modalOpen ? "pointer-events-none" : ""}`}
        inert={modalOpen || undefined}
      >
        {/* Area scene */}
        <section className="relative flex-1 min-h-svh overflow-hidden">
          {/* INTRO (visibile anche in intro-out) */}
          <Stage show={stage === "intro" || stage === "intro-out"}>
            <div className="p-6 grid place-items-center min-h-[60vh]">
              <IntroGate gifSrc={introGif} onStart={handleStart} />
            </div>
          </Stage>

          {/* MENU (visibile anche in menu-out per l'animate-out) */}
          <Stage show={stage === "menu" || stage === "menu-out"}>
            <div className="p-6 grid place-items-center min-h-[60vh]">
              <RadialMenu
                title={t("menu.title")}
                subtitle={t("menu.subtitle")}
                items={[
                  { key: PAGES.ABOUT,    label: t("menu.about") },
                  { key: PAGES.SERVICES, label: t("menu.services") },
                  { key: PAGES.CONTACT,  label: t("menu.contact") },
                  { key: PAGES.BLOG,     label: t("menu.blog") },
                ]}
                onOpen={openPage}
              />
            </div>
          </Stage>
        </section>

        {/* Footer visibile solo dal menu in poi */}
        {showFooter && <Footer />}
      </div>

      {/* MODALE — fuori dal wrapper con inert */}
      <Modal
        open={modalOpen}
        title={titleFor(page)}
        onClose={() => { setStage("menu"); setPage(null); }}
        size="xl"
      >
        {page === PAGES.ABOUT ? (
          <AboutPanel />
        ) : page === PAGES.SERVICES ? (
          <ServicesPanel />
          ) : page === PAGES.CONTACT ? (
          <ContactPanel />
        ) : (
          <p className="text-white/80 text-sm">{descFor(page)}</p>
        )}
      </Modal>

      {/* Overlay FX */}
      <ScreenWipe
        play={wipe}
        mode="both"
        onDone={() => {
          if (pendingNav) {
            const dest = pendingNav;
            setPendingNav(null);
            setWipe(false);
            navigate(dest);
          } else {
            setStage("menu");
            setWipe(false);
          }
        }}
      />
    </main>
  );
}
