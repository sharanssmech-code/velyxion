import ThreeBackground from "./components/ThreeBackground";
import Navbar from "./components/Navbar";
import PowertrainSection from "./components/PowertrainSection";
import EnergySection from "./components/EnergySection";
import ControlSection from "./components/ControlSection";
import AerodynamicsSection from "./components/AerodynamicsSection";
import PerformanceSection from "./components/PerformanceSection";
import TeamSection from "./components/TeamSection";

function App() {
  return (
    <>
      {/* ================= 3D BACKGROUND ================= */}
      <ThreeBackground />

      {/* ================= NAVIGATION ================= */}
      <Navbar />

      {/* ================= MAIN WEBSITE ================= */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* ================= HERO ================= */}
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
              position: "relative",
              zIndex: 1,
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

            {/* Full-bleed bright background (electric blue → teal) for HOME */}
            <div className="homeColorBg" />

            <style>{`
              .homeColorBg{position:absolute;inset:0;z-index:0;background:linear-gradient(135deg,#0066ff 0%,#00d2a8 100%);filter:contrast(1.05) saturate(1.1);box-shadow:inset 0 0 120px rgba(0,0,0,0.25)}
              /* subtle slow movement to add depth */
              .homeColorBg{animation:colorFloat 14s ease-in-out infinite}
              @keyframes colorFloat{0%{transform:translateY(0px) scale(1)}50%{transform:translateY(-6px) scale(1.01)}100%{transform:translateY(0px) scale(1)}}

              @media (max-width:720px){
                .homeColorBg{background:linear-gradient(180deg,#0066ff 0%,#00d2a8 100%)}
              }
            `}</style>

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

        {/* ================= THE CAR ================= */}
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

        {/* ================= TECHNOLOGY INTRO ================= */}
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

        {/* ================= TECHNOLOGY MODULES ================= */}

        <PowertrainSection />

        <EnergySection />

        <ControlSection />

        <AerodynamicsSection />

        <PerformanceSection />

        {/* ================= TEAM ================= */}

        <TeamSection />
      </main>
    </>
  );
}

export default App;