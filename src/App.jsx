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
          color: "#0b0b0b",
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
            textAlign: "left",
            padding: "0",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="homeBg" />

          <div className="heroContainer">
            <div className="heroLeft">
              <div className="heroLabel">FORMULA STUDENT / ELECTRIC RACING</div>

              <img src="/VELYXION.png" alt="VELYXION" className="heroLogo" />

              <h1 className="heroTitle">VELYXION</h1>

              <div className="heroHeadline">ELECTRIC PERFORMANCE,<br/>ENGINEERED BY STUDENTS.</div>

              <div className="heroLead">A student-built electric race car driven by engineering, innovation and the pursuit of performance.</div>

              <a href="#car" className="heroCTA">Explore The Car</a>
            </div>

            <div className="heroRight">
              <div className="carWrap">
                <div className="heroVisual" aria-hidden="true" />
              </div>
            </div>

            <div className="scrollIndicator">Scroll ↓</div>
          </div>

          <style>{`
            .homeBg{position:absolute;inset:0;z-index:0;background:#ffffff;}

            .heroContainer{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1200px;padding:88px 6vw;box-sizing:border-box;margin:0 auto}

            .heroLeft{flex:1;min-width:320px}
            .heroRight{flex:1;display:flex;align-items:center;justify-content:center}

            .heroLabel{color:#00c2ff;font-weight:700;letter-spacing:4px;font-size:12px;margin-bottom:20px}
            .heroLogo{width:260px;max-width:60%;height:auto;margin-bottom:14px;filter:drop-shadow(0 12px 30px rgba(0,194,255,0.12))}

            .heroTitle{margin:0;font-size:clamp(48px,9vw,110px);letter-spacing:10px;font-weight:800;color:#0b0b0b;line-height:0.9;margin-bottom:8px}

            .heroHeadline{font-size:clamp(20px,3.2vw,28px);font-weight:700;color:#263238;letter-spacing:2px;margin-bottom:18px}

            .heroLead{max-width:620px;color:#475057;line-height:1.8;margin-bottom:28px}

            .heroCTA{display:inline-block;padding:14px 22px;background:#00c2ff;color:#021016;font-weight:700;border-radius:8px;text-decoration:none;box-shadow:0 10px 30px rgba(0,194,255,0.18);transition:transform .18s ease,box-shadow .18s ease}
            .heroCTA:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(0,194,255,0.22)}

            .carWrap{position:relative;width:760px;max-width:88vw;display:flex;align-items:center;justify-content:center}
            .heroVisual{width:100%;height:360px;border-radius:12px;background:linear-gradient(180deg,#031018, #0b1220);box-shadow:0 30px 80px rgba(2,10,18,0.5);position:relative;overflow:hidden;transform-origin:center;animation:carEntrance 1s cubic-bezier(.2,.9,.2,1) both,carFloat 6s ease-in-out infinite}
            .heroVisual::after{content:"";position:absolute;inset:0;background:radial-gradient(40% 60% at 50% 40%, rgba(0,194,255,0.12), rgba(0,194,255,0.04) 25%, transparent 60%);filter:blur(18px);pointer-events:none}

            @keyframes carEntrance{from{transform:translateY(40px) scale(.98);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
            @keyframes carFloat{0%{transform:translateY(0px)}50%{transform:translateY(-8px)}100%{transform:translateY(0px)}}

            .scrollIndicator{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);z-index:2;color:#66747c;font-weight:700;letter-spacing:3px}

            @media (max-width:900px){
              .heroContainer{flex-direction:column;padding:48px 6vw}
              .heroRight{order:2;margin-top:26px}
              .heroLeft{order:1;text-align:center}
              .heroLogo{max-width:45%}
              .heroTitle{font-size:clamp(36px,10vw,64px);text-align:center}
              .heroHeadline{text-align:center}
              .heroLead{text-align:center}
              .carWrap{width:92vw}
            }
          `}</style>
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