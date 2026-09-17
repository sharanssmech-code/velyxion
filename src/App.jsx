import React, { useEffect, useRef, useState } from "react";
import ThreeBackground from "./components/ThreeBackground";
import Navbar from "./components/Navbar";
import PowertrainSection from "./components/PowertrainSection";
import EnergySection from "./components/EnergySection";
import ControlSection from "./components/ControlSection";
import AerodynamicsSection from "./components/AerodynamicsSection";
import PerformanceSection from "./components/PerformanceSection";
import TeamSection from "./components/TeamSection";
import FullpageControls from "./components/FullpageControls";

function App() {
  const pages = [
    { id: "home", node: (
      <section
        id="home"
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 20px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "5px",
              color: "#00c2ff",
              marginBottom: "30px",
              fontWeight: "600",
            }}
          >
            FORMULA STUDENT • ELECTRIC
          </div>

          <img
            src="/VELYXION.png"
            alt="VELYXION"
            style={{
              width: "280px",
              maxWidth: "65vw",
              height: "auto",
              marginBottom: "30px",
              filter:
                "drop-shadow(0 0 20px rgba(0, 194, 255, 0.35))",
            }}
          />

          <h1
            style={{
              margin: "0",
              fontSize: "clamp(42px, 7vw, 88px)",
              fontWeight: "700",
              letterSpacing: "10px",
              lineHeight: "1",
            }}
          >
            VELYXION
          </h1>

          <p
            style={{
              margin: "28px 0 0",
              fontSize: "clamp(14px, 2vw, 20px)",
              letterSpacing: "3px",
              lineHeight: "1.8",
              color: "#d8e1e6",
            }}
          >
            ELECTRIC PERFORMANCE,
            <br />
            ENGINEERED BY STUDENTS.
          </p>

          <div
            style={{
              width: "120px",
              height: "1px",
              margin: "36px auto",
              background: "#00c2ff",
              boxShadow: "0 0 14px rgba(0, 194, 255, 0.8)",
            }}
          />

          <p
            style={{
              maxWidth: "620px",
              margin: "0 auto",
              color: "#8e9ba3",
              fontSize: "14px",
              lineHeight: "1.9",
              letterSpacing: "1px",
            }}
          >
            A student-built electric race car driven by engineering,
            innovation, and the pursuit of performance.
          </p>

          <div
            style={{
              marginTop: "55px",
              fontSize: "10px",
              letterSpacing: "4px",
              color: "#66747c",
            }}
          >
            ↓ &nbsp; SCROLL TO EXPLORE
          </div>
        </div>
      </section>
    )},

    { id: "car", node: (
      <section
        id="car"
        style={{
          minHeight: "100vh",
          padding: "120px 8vw",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "#00c2ff",
              fontSize: "11px",
              letterSpacing: "4px",
              marginBottom: "18px",
            }}
          >
            01 / THE MACHINE
          </div>

          <h2
            style={{
              fontSize: "clamp(40px, 6vw, 76px)",
              margin: "0 0 25px",
              letterSpacing: "4px",
            }}
          >
            THE CAR
          </h2>

          <p
            style={{
              maxWidth: "600px",
              color: "#8e9ba3",
              lineHeight: "1.8",
              fontSize: "15px",
            }}
          >
            The VELYXION electric race car brings together mechanical
            engineering, electrical systems, aerodynamics, controls,
            and software into one integrated machine.
          </p>
        </div>
      </section>
    )},

    { id: "technology", node: (
      <section
        id="technology"
        style={{
          minHeight: "65vh",
          padding: "120px 8vw 80px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "#00c2ff",
              fontSize: "11px",
              letterSpacing: "4px",
              marginBottom: "18px",
            }}
          >
            02 / ENGINEERING
          </div>

          <h2
            style={{
              fontSize: "clamp(40px, 6vw, 76px)",
              margin: "0 0 25px",
              letterSpacing: "4px",
            }}
          >
            TECHNOLOGY
          </h2>

          <p
            style={{
              maxWidth: "650px",
              color: "#8e9ba3",
              lineHeight: "1.8",
              fontSize: "15px",
            }}
          >
            Explore the engineering systems behind the vehicle,
            from the electric powertrain and energy systems to
            vehicle dynamics, aerodynamics, and control systems.
          </p>
        </div>
      </section>
    )},

    { id: "powertrain", node: <PowertrainSection /> },
    { id: "energy", node: <EnergySection /> },
    { id: "control", node: <ControlSection /> },
    { id: "aerodynamics", node: <AerodynamicsSection /> },
    { id: "performance", node: <PerformanceSection /> },
    { id: "team", node: <TeamSection /> },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const total = pages.length;
  const containerRef = useRef(null);
  const isLocked = useRef(false);
  const touchStartX = useRef(0);

  const goTo = (index) => {
    if (index < 0 || index >= total) return;
    setCurrentPage(index);
  };

  const navigateToId = (id) => {
    const idx = pages.findIndex((p) => p.id === id);
    if (idx >= 0) goTo(idx);
  };

  const next = () => {
    goTo(Math.min(total - 1, currentPage + 1));
  };

  const prev = () => {
    goTo(Math.max(0, currentPage - 1));
  };

  useEffect(() => {
      const onKey = (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (isLocked.current) return;
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 5) return;
      isLocked.current = true;
      if (delta > 0) next();
      else prev();
      setTimeout(() => (isLocked.current = false), 900);
    };

    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
      const end = e.changedTouches[0].clientX;
      const diff = touchStartX.current - end;
      if (Math.abs(diff) > 40) {
        if (diff > 0) next();
        else prev();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentPage]);

  return (
    <>
      <ThreeBackground />

      <Navbar navigateTo={navigateToId} />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 1,
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${total * 100}vw`,
            display: "flex",
            flexDirection: "row",
            transition: "transform 0.85s cubic-bezier(.2,.9,.2,1)",
            transform: `translateX(-${currentPage * 100}vw)`,
          }}
        >
          {pages.map((p) => (
            <div
              key={p.id}
              style={{
                height: "100vh",
                width: "100vw",
                boxSizing: "border-box",
                overflow: "hidden",
                flex: "0 0 100vw",
              }}
            >
              {p.node}
            </div>
          ))}
        </div>

        <FullpageControls
          current={currentPage}
          total={total}
          onPrev={prev}
          onNext={next}
        />
      </div>
    </>
  );
}

export default App;