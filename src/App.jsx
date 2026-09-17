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
          <div className="homeBg" />

          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
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

            {/* Car image element with subtle 3D float/tilt/glow */}
            <div className="heroImageWrapper">
              <img
                src="/F1.jpg"
                alt="Formula Student electric race car"
                className="heroImage"
              />
            </div>

            <style>{`
              .heroImageWrapper{display:flex;justify-content:center;margin:18px 0 28px;perspective:1200px}
              .heroImage{width:760px;max-width:88vw;height:auto;border-radius:8px;box-shadow:0 30px 70px rgba(0,0,0,0.6),0 0 40px rgba(0,194,255,0.06);filter:drop-shadow(0 12px 30px rgba(0,194,255,0.08));transform-origin:center center;transition:transform 0.5s ease}
              .heroImage{animation:floatTilt 7s ease-in-out infinite}

              @keyframes floatTilt{
                0%{transform: translateY(0px) rotateX(3deg) rotateY(-2deg)}
                25%{transform: translateY(-10px) rotateX(4deg) rotateY(1deg)}
                50%{transform: translateY(-16px) rotateX(3deg) rotateY(2deg)}
                75%{transform: translateY(-10px) rotateX(4deg) rotateY(1deg)}
                100%{transform: translateY(0px) rotateX(3deg) rotateY(-2deg)}
              }

              @media (max-width: 720px){
                .heroImage{width:92vw;border-radius:6px}
              }
            `}</style>

            <h1
              style={{
                margin: "0",
                fontSize: "clamp(64px, 9vw, 120px)",
                fontWeight: "700",
                letterSpacing: "10px",
                lineHeight: "0.95",
                textAlign: "left",
                color: "#ffffff",
                textShadow: "0 6px 30px rgba(0,0,0,0.7), 0 0 18px rgba(0,194,255,0.08)",
                marginLeft: "2vw",
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

            {/* Right side quote */}
            <div className="homeSideQuote">
              Top performers require
              <br /> more than perfect conditions
              <br /> especially just luck
            </div>

            {/* Small center caption */}
            <div className="homeSmallCaption">Experience the new CR - X in top form with increased race track performance</div>

            <style>{`
              .homeBg{position:absolute;inset:0;z-index:0;background:linear-gradient(180deg, rgba(3,6,9,0.35), rgba(3,6,9,0.45)), url('/F1.jpg') center/cover no-repeat;filter:contrast(1.02) saturate(1.05);}
              .homeSideQuote{position:absolute;right:4vw;top:30%;color:#ffffff;text-align:right;font-size:clamp(14px,2.6vw,28px);line-height:1.15;font-weight:700;text-shadow:0 6px 20px rgba(0,0,0,0.6);max-width:340px}
              .homeSmallCaption{position:relative;margin-top:28px;color:#d8e1e6;font-size:14px;text-align:center;opacity:0.95}

              @media (max-width:900px){
                .homeSideQuote{position:relative;right:auto;top:auto;text-align:center;margin-top:18px}
                h1{font-size:clamp(44px,9vw,72px);text-align:center;margin-left:0}
              }
            `}</style>
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