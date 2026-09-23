import { useEffect, useRef, useState } from "react";
import ThreeBackground from "./components/ThreeBackground";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import TeamSection from "./components/TeamSection";
import EngineeringJourneySection from "./components/EngineeringJourneySection";

const technologySystems = [
  {
    number: "01",
    title: "POWERTRAIN",
    summary:
      "Motor, inverter, and drivetrain systems responsible for delivering electric power to the wheels.",
    details:
      "Electric propulsion is provided by a single IPM motor, supported by a dedicated inverter and drivetrain.",
    elements: ["Motor", "Inverter", "Drivetrain"],
    specifications: [
      ["MOTOR TYPE", "IPM"],
      ["MOTOR MODEL", "15 kW, 96 V"],
      ["NUMBER OF MOTORS", "1"],
      ["PEAK POWER", "25 kW"],
      ["PEAK TORQUE", "130 Nm"],
      ["INVERTER MODEL", "15 kW, 96 V IPM"],
      ["MAXIMUM CURRENT", "300 A"],
    ],
  },
  {
    number: "02",
    title: "ENERGY SYSTEM",
    summary:
      "Battery, battery management, and electrical protection systems supporting the vehicle.",
    details:
      "The vehicle's electrical energy system combines a high-voltage battery with battery management and electrical protection.",
    elements: ["Energy storage", "Battery management", "Electrical protection"],
    specifications: [
      ["BATTERY TYPE", "Lithium Ion Phosphate"],
      ["NOMINAL VOLTAGE", "96 V"],
      ["CAPACITY", "75 Ah"],
      ["ENERGY", "7.2 kWh"],
      ["CELL TYPE", "Cylindrical"],
    ],
  },
  {
    number: "03",
    title: "CONTROL & ELECTRONICS",
    summary:
      "Sensors, control hardware, and telemetry systems used to monitor and manage vehicle operation.",
    details:
      "Electronic systems support vehicle control, battery management, electrical protection, and system monitoring.",
    elements: ["Sensors", "Control hardware", "Telemetry"],
    specifications: [
      ["VCU", "Motor controller"],
      ["BMS", "JK BMS"],
      ["OTHER PROTECTION SYSTEMS", "BSPD, IMD"],
      ["TELEMETRY", "DATA TO BE ADDED"],
    ],
  },
  {
    number: "04",
    title: "AERODYNAMICS",
    summary:
      "Aerodynamic surfaces and airflow management developed to support vehicle behaviour and stability.",
    details:
      "Aerodynamic development focuses on controlling airflow around the vehicle. Aero surfaces and airflow management are considered together with the vehicle's mechanical and structural integration.",
    elements: ["Aero surfaces", "Airflow management", "Vehicle integration"],
    specifications: [
      ["FRONT WING", "DATA TO BE ADDED"],
      ["REAR WING", "DATA TO BE ADDED"],
      ["UNDERBODY / DIFFUSER", "DATA TO BE ADDED"],
      ["OTHER AERO", "DATA TO BE ADDED"],
    ],
  },
  {
    number: "05",
    title: "VEHICLE DYNAMICS",
    summary:
      "Suspension, steering, braking, and tyre systems working together to control vehicle response.",
    details:
      "Vehicle dynamics brings together suspension, steering, braking, and tyre behaviour. These systems determine how the vehicle responds to driver inputs and changes in the track environment.",
    elements: ["Suspension", "Steering", "Braking and tyres"],
    specifications: [
      ["FRONT SUSPENSION", "DATA TO BE ADDED"],
      ["REAR SUSPENSION", "DATA TO BE ADDED"],
    ],
  },
  {
    number: "06",
    title: "CHASSIS & STRUCTURES",
    summary:
      "Structural systems designed to provide stiffness, protection, and integration of vehicle components.",
    details:
      "The chassis provides the structural foundation of the vehicle. Structural design focuses on stiffness, component integration, protection, and efficient use of material.",
    elements: ["Structural foundation", "Component integration", "Protection"],
    specifications: [
      ["STRUCTURAL FRAME", "4130 CHROMOLY"],
      ["SUSPENSION SYSTEM", "Four-wheel independent double wishbone"],
      ["SHOCK ABSORBER", "Coilover DNM shock absorber"],
    ],
  },
];

const vehicleSpecifications = [
  ["VEHICLE MASS", "330 kg"],
  ["WHEELBASE", "1580 mm"],
  ["FRONT TRACK WIDTH", "1200 mm"],
  ["REAR TRACK WIDTH", "1180 mm"],
  ["ALLOY RIM", "10 x 7 inches"],
  ["TYRE", "BKT GF305"],
  ["TYRE SIZE", "205/50-10"],
  ["TYRE CONSTRUCTION", "4 ply"],
  ["QUANTITY", "4 tyres"],
];

const technologyLabelPositions = {
  "01": "Powertrain",
  "02": "Energy",
  "03": "Control",
  "04": "Aerodynamics",
  "05": "Dynamics",
  "06": "Chassis",
};

function SpeedometerHUD() {
  const gaugeRef = useRef(null);
  const interactionIndexRef = useRef(0);
  const pulseTimeoutRef = useRef(null);
  const [speed, setSpeed] = useState(0);
  const [targetSpeed, setTargetSpeed] = useState(128);
  const [isVisible, setIsVisible] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const maxSpeed = 180;
  const progress = speed / maxSpeed;
  const startAngle = -135;
  const endAngle = 135;
  const needleAngle = startAngle + (endAngle - startAngle) * progress;
  const gaugeRadius = 122;
  const tickMarks = Array.from({ length: 25 }, (_, index) => {
    const value = index * 7.5;
    const angle = startAngle + (endAngle - startAngle) * (value / maxSpeed);
    const isMajor = value % 30 === 0;
    const radians = (angle * Math.PI) / 180;
    const outerRadius = 139;
    const innerRadius = isMajor ? 124 : 130;

    return {
      value,
      isMajor,
      x1: 160 + Math.cos(radians) * innerRadius,
      y1: 160 + Math.sin(radians) * innerRadius,
      x2: 160 + Math.cos(radians) * outerRadius,
      y2: 160 + Math.sin(radians) * outerRadius,
    };
  });
  const speedLabels = [0, 30, 60, 90, 120, 150, 180];

  useEffect(() => {
    const element = gaugeRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setSpeed(targetSpeed);
      return undefined;
    }

    let frameId;
    const startTime = performance.now();
    const duration = 1800;

    const animate = (now) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setSpeed(Math.round(targetSpeed * eased));
      if (elapsed < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, targetSpeed]);

  useEffect(() => () => {
    if (pulseTimeoutRef.current) window.clearTimeout(pulseTimeoutRef.current);
  }, []);

  const handleSpeedometerInteraction = () => {
    const readings = [142, 117, 156, 94, 168, 128];
    const nextReading = readings[interactionIndexRef.current % readings.length];
    interactionIndexRef.current += 1;
    setTargetSpeed(nextReading);
    setIsPulseActive(true);
    if (pulseTimeoutRef.current) window.clearTimeout(pulseTimeoutRef.current);
    pulseTimeoutRef.current = window.setTimeout(() => setIsPulseActive(false), 420);
  };

  const handleSpeedometerKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSpeedometerInteraction();
    }
  };

  return (
    <div className="speedometerPanel" ref={gaugeRef}>
      <div className="speedometerHudTag">EV / INSTRUMENTATION</div>
      <div
        className={`speedometerFrame${isPulseActive ? " isPulseActive" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={`Interactive visual speedometer showing ${speed} kilometres per hour`}
        onPointerDown={handleSpeedometerInteraction}
        onKeyDown={handleSpeedometerKeyDown}
      >
        <div className="speedometerStreak speedometerStreakOne" aria-hidden="true" />
        <div className="speedometerStreak speedometerStreakTwo" aria-hidden="true" />
        <svg className="speedometerSvg" viewBox="0 0 320 320" role="img" aria-label="Speedometer visual display">
          <defs>
            <radialGradient id="speedometerFace" cx="50%" cy="48%" r="60%">
              <stop offset="0%" stopColor="#18252d" />
              <stop offset="72%" stopColor="#0b1115" />
              <stop offset="100%" stopColor="#05070a" />
            </radialGradient>
            <filter id="speedometerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <circle className="speedometerFace" cx="160" cy="160" r="154" />
          <circle className="speedometerGridRing" cx="160" cy="160" r="147" />
          <circle className="speedometerRedZone" cx="160" cy="160" r="139" pathLength="100" strokeDasharray="17 83" strokeDashoffset="-79" />
          <circle className="speedometerArcTrack" cx="160" cy="160" r={gaugeRadius} pathLength="100" />
          <circle className="speedometerArcProgress" cx="160" cy="160" r={gaugeRadius} pathLength="100" strokeDashoffset={75 * (1 - progress)} filter="url(#speedometerGlow)" />
          <g className="speedometerTicks">
            {tickMarks.map((tick) => (
              <line key={tick.value} className={tick.isMajor ? "speedometerTick speedometerTickMajor" : "speedometerTick"} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} />
            ))}
          </g>
          <g className="speedometerLabels">
            {speedLabels.map((value) => {
              const angle = startAngle + (endAngle - startAngle) * (value / maxSpeed);
              const radians = (angle * Math.PI) / 180;
              const radius = 105;
              return <text key={value} x={160 + Math.cos(radians) * radius} y={164 + Math.sin(radians) * radius} textAnchor="middle">{value}</text>;
            })}
          </g>
          <g className="speedometerNeedle" style={{ transform: `rotate(${needleAngle}deg)` }}>
            <line x1="160" y1="160" x2="160" y2="45" />
            <circle cx="160" cy="160" r="8" />
          </g>
          <text className="speedometerUnit" x="160" y="142" textAnchor="middle">KM/H</text>
          <text className="speedometerValue" x="160" y="185" textAnchor="middle">{speed}</text>
          <text className="speedometerMode" x="160" y="211" textAnchor="middle">DIGITAL RACE DISPLAY</text>
        </svg>
        <span className="speedometerCorner speedometerCornerTop" aria-hidden="true" />
        <span className="speedometerCorner speedometerCornerBottom" aria-hidden="true" />
      </div>
      <div className="speedometerCaption">OUR TOP SPEED</div>
    </div>
  );
}

function ContactIcon({ type }) {
  const paths = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    location: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M7.5 3.5 5 5c-.8.5-1.1 1.5-.8 2.4 1.7 5.2 5.7 9.2 10.9 10.9.9.3 1.9 0 2.4-.8l1.5-2.5-4-2-1.4 1.7a12.5 12.5 0 0 1-5.2-5.2l1.7-1.4-2.6-4.6Z" />
    ),
    socials: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.8 9h16.4M3.8 15h16.4M12 3.5c2.2 2.4 3.3 5.2 3.3 8.5s-1.1 6.1-3.3 8.5c-2.2-2.4-3.3-5.2-3.3-8.5S9.8 5.9 12 3.5Z" />
      </>
    ),
  };

  return (
    <svg className="contactIcon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function App() {
  const [carTilt, setCarTilt] = useState({ x: 0, y: 0 });
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [activeTechnology, setActiveTechnology] = useState(null);
  const [hoveredTechnology, setHoveredTechnology] = useState(null);
  const handleTechnologyLabelClick = (number) => {
    setActiveTechnology(number);
    window.setTimeout(() => {
      const card = document.getElementById(`technology-card-${number}`);
      const cardButton = card?.querySelector(".technologyCardTrigger");

      card?.scrollIntoView({ behavior: "smooth", block: "center" });
      cardButton?.focus({ preventScroll: true });
    }, 0);
  };

  const handleCarMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setCarTilt({
      x: offsetY * -8,
      y: offsetX * 12,
    });
  };

  const handleCarLeave = () => {
    setCarTilt({ x: 0, y: 0 });
  };

  const handleHeroMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setHeroTilt({
      x: offsetY * -3,
      y: offsetX * 5,
    });
  };

  const handleHeroLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

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
          width: "100%",
          maxWidth: "none",
          margin: 0,
          padding: 0,
          background: "#ffffff",
          color: "#111111",
          fontFamily: "Arial, sans-serif",
          overflowX: "hidden",
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
              <div className="heroLabel">01 / VELYXION ELECTRIC RACING</div>

              <img src="/VELYXION.png" alt="VELYXION" className="heroLogo" />

              <h1 className="heroTitle">VELYXION</h1>

              <div className="heroHeadline">ELECTRIC PERFORMANCE,<br/>ENGINEERED BY STUDENTS.</div>

              <div className="heroLead">A student-built electric race car programme driven by engineering, collaboration, and continuous development.</div>

              <a href="#car" className="heroCTA">EXPLORE THE CAR <span aria-hidden="true">→</span></a>
            </div>

            <div className="heroRight" onMouseMove={handleHeroMove} onMouseLeave={handleHeroLeave}>
              <div className="carWrap">
                <div className="carGlow" />
                <div className="heroTechnicalLabel">VELYXION / ELECTRIC VEHICLE</div>
                <div
                  className="heroVideoFrame"
                  style={{
                    transform: `perspective(1100px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
                  }}
                >
                  <video
                    className="heroVideo"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/F1.jpg"
                    aria-label="VELYXION electric race car visual"
                  >
                    <source src="/F1.mp4" type="video/mp4" />
                  </video>
                  <div className="heroHud" aria-hidden="true">
                    <div className="heroHudLabel heroHudTopRight">VELYXION / EV-RACING</div>
                    <div className="heroHudLabel heroHudBottomRight">VEHICLE DEVELOPMENT SYSTEM</div>
                    <div className="heroHudLabel heroHudVehicle">01 / VEHICLE</div>
                    <span className="heroHudNode heroHudNodeOne" />
                    <span className="heroHudNode heroHudNodeTwo" />
                    <span className="heroHudNode heroHudNodeThree" />
                    <span className="heroHudLine heroHudLineOne" />
                    <span className="heroHudLine heroHudLineTwo" />
                    <span className="heroHudLine heroHudLineThree" />
                    <span className="heroHudLine heroHudLineFour" />
                    <span className="heroHudMark heroHudMarkOne" />
                    <span className="heroHudMark heroHudMarkTwo" />
                  </div>
                </div>
              </div>
            </div>

            <div className="scrollIndicator">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></div>
          </div>

          <style>{`
            .homeBg{
              position:absolute;
              inset:0;
              z-index:0;
              overflow:hidden;
              background:
                radial-gradient(ellipse at 73% 48%, rgba(0,194,255,.18) 0%, rgba(0,126,166,.09) 22%, transparent 49%),
                radial-gradient(ellipse at 28% 47%, rgba(232,242,246,.88) 0%, rgba(232,242,246,.55) 24%, transparent 48%),
                linear-gradient(105deg, #e7f0f3 0%, #d9e6eb 32%, #16242c 59%, #0a1015 78%, #05070a 100%);
            }
            .homeBg::before{
              content:"";
              position:absolute;
              inset:0;
              opacity:.42;
              background-image:
                linear-gradient(rgba(0,194,255,.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,194,255,.1) 1px, transparent 1px);
              background-size:42px 42px;
              background-position:38% 100%;
              mask-image:linear-gradient(180deg, transparent 18%, rgba(0,0,0,.15) 48%, #000 100%);
              animation:heroGridDrift 18s linear infinite;
            }
            .homeBg::after{
              content:"";
              position:absolute;
              inset:-12%;
              opacity:.7;
              background:
                radial-gradient(circle at 72% 45%, rgba(0,194,255,.22) 0 1px, transparent 2px),
                radial-gradient(circle at 82% 31%, rgba(116,221,255,.28) 0 1px, transparent 2px),
                radial-gradient(circle at 63% 67%, rgba(0,194,255,.2) 0 1px, transparent 2px),
                radial-gradient(circle at 91% 72%, rgba(116,221,255,.18) 0 1px, transparent 2px),
                linear-gradient(104deg, transparent 42%, rgba(0,194,255,.12) 47%, transparent 51%);
              background-size:auto, auto, auto, auto, 100% 100%;
              filter:blur(.2px);
              animation:heroAtmosphereDrift 20s ease-in-out infinite alternate;
            }
            .homeBg + .heroContainer::before{
              content:"";
              position:absolute;
              z-index:-1;
              top:18%;
              right:8%;
              width:52%;
              height:58%;
              pointer-events:none;
              background:
                linear-gradient(104deg, transparent 0 33%, rgba(0,194,255,.14) 34% 34.2%, transparent 34.4%),
                linear-gradient(104deg, transparent 0 57%, rgba(116,221,255,.1) 57.2% 57.35%, transparent 57.55%),
                linear-gradient(104deg, transparent 0 73%, rgba(0,194,255,.08) 73.2% 73.35%, transparent 73.55%);
              opacity:.65;
              filter:blur(.3px);
              animation:heroStreakSweep 14s ease-in-out infinite alternate;
            }

            .heroContainer{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;width:100%;max-width:none;min-height:100vh;padding:96px 6vw 88px;box-sizing:border-box;margin:0;background:transparent;gap:clamp(36px,6vw,100px)}

            .heroLeft{flex:0 1 45%;min-width:320px}
            .heroRight{flex:0 1 55%;min-width:0;display:flex;align-items:center;justify-content:center;perspective:1100px}

            .heroLabel{color:#00c2ff;font-weight:700;letter-spacing:4px;font-size:12px;margin-bottom:20px;animation:heroFadeUp .7s ease both}
            .heroLogo{width:260px;max-width:60%;height:auto;margin-bottom:14px;filter:drop-shadow(0 12px 30px rgba(0,194,255,0.12))}

            .heroTitle{margin:0;font-size:clamp(48px,9vw,110px);letter-spacing:10px;font-weight:800;color:#111111;line-height:0.9;margin-bottom:8px;animation:heroFadeUp .75s .1s ease both}

            .heroHeadline{font-size:clamp(20px,3.2vw,28px);font-weight:700;color:#111111;letter-spacing:2px;margin-bottom:18px;animation:heroFadeUp .75s .2s ease both}

            .heroLead{max-width:620px;color:#4b5563;line-height:1.8;margin-bottom:28px;animation:heroFadeUp .75s .3s ease both}

            .heroCTA{display:inline-block;padding:14px 22px;background:#00c2ff;color:#021016;font-weight:700;border-radius:8px;text-decoration:none;box-shadow:0 10px 30px rgba(0,194,255,0.18);transition:transform .18s ease,box-shadow .18s ease;animation:heroFadeUp .75s .4s ease both}
            .heroCTA:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(0,194,255,0.22)}

            .carWrap{position:relative;width:min(760px,100%);display:flex;align-items:center;justify-content:center;animation:carFloat 7s ease-in-out infinite}
            .heroVideoFrame{position:relative;width:100%;aspect-ratio:16 / 10;overflow:hidden;border:1px solid rgba(0,194,255,0.5);border-radius:18px;background:#eafaff;box-shadow:0 0 0 1px rgba(0,194,255,0.08),0 24px 70px rgba(0,194,255,0.18);transition:transform .35s ease;animation:carEntrance 1s cubic-bezier(.2,.9,.2,1) both}
            .heroVideoFrame::before,.heroVideoFrame::after{content:"";position:absolute;z-index:2;width:28px;height:28px;border-color:rgba(0,194,255,0.75);border-style:solid;pointer-events:none}
            .heroVideoFrame::before{top:12px;right:12px;border-width:1px 1px 0 0}
            .heroVideoFrame::after{bottom:12px;left:12px;border-width:0 0 1px 1px}
            .heroVideo{display:block;width:100%;height:100%;object-fit:contain;object-position:center;border-radius:inherit}
            .carGlow{position:absolute;inset:16% -8% -12%;background:radial-gradient(40% 60% at 50% 40%, rgba(0,194,255,0.22), rgba(0,194,255,0.07) 34%, transparent 68%);filter:blur(22px);pointer-events:none}
            .heroTechnicalLabel{position:absolute;z-index:3;top:-28px;right:8px;color:#64707b;font-size:9px;font-weight:700;letter-spacing:2px}
            .heroTechnicalLabel::before{content:"";display:inline-block;width:42px;height:1px;margin:0 9px 3px 0;background:#00c2ff}
            .heroHud{position:absolute;inset:0;z-index:3;color:#40515b;pointer-events:none;opacity:0;animation:heroHudReveal 1s .45s ease forwards}
            .heroHudLabel{position:absolute;font-size:8px;font-weight:700;letter-spacing:1.8px;line-height:1.4;white-space:nowrap;animation:heroHudText 4s ease-in-out infinite}
            .heroHudTopRight{top:18px;right:20px;padding-left:18px}
            .heroHudTopRight::before{content:"";position:absolute;top:50%;right:100%;width:30px;height:1px;background:#00c2ff;opacity:.65}
            .heroHudBottomRight{right:20px;bottom:18px;padding-left:18px}
            .heroHudBottomRight::before{content:"";position:absolute;top:50%;right:100%;width:24px;height:1px;background:#00c2ff;opacity:.65}
            .heroHudVehicle{left:20px;bottom:18px;color:#00a6d9}
            .heroHudVehicle::after{content:"";position:absolute;top:50%;left:calc(100% + 9px);width:42px;height:1px;background:#00c2ff;opacity:.7}
            .heroHudNode{position:absolute;width:5px;height:5px;border:1px solid #00c2ff;border-radius:50%;background:#fff;box-shadow:0 0 0 rgba(0,194,255,0);animation:heroHudPulse 3.2s ease-in-out infinite}
            .heroHudNodeOne{top:27%;left:18%}
            .heroHudNodeTwo{top:39%;right:17%;animation-delay:.9s}
            .heroHudNodeThree{bottom:25%;left:35%;animation-delay:1.7s}
            .heroHudLine{position:absolute;height:1px;background:#00c2ff;opacity:.38;transform-origin:left center}
            .heroHudLineOne{top:27%;left:18%;width:86px;transform:rotate(18deg)}
            .heroHudLineTwo{top:39%;right:17%;width:72px;transform:rotate(158deg);transform-origin:right center}
            .heroHudLineThree{bottom:25%;left:35%;width:64px;transform:rotate(-28deg)}
            .heroHudLineFour{top:18px;left:20px;width:54px;opacity:.25}
            .heroHudMark{position:absolute;width:12px;height:12px;border-color:rgba(0,194,255,.58);border-style:solid;opacity:.6}
            .heroHudMarkOne{top:18px;left:20px;border-width:1px 0 0 1px}
            .heroHudMarkTwo{right:20px;bottom:18px;border-width:0 1px 1px 0}

            @keyframes heroFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
            @keyframes heroHudReveal{from{opacity:0}to{opacity:1}}
            @keyframes heroHudText{0%,100%{opacity:.55}50%{opacity:.85}}
            @keyframes heroHudPulse{0%,100%{box-shadow:0 0 0 rgba(0,194,255,0)}50%{box-shadow:0 0 10px rgba(0,194,255,.55)}}
            @keyframes carEntrance{from{transform:translateY(30px) scale(.985);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
            @keyframes carFloat{0%{transform:translateY(0px)}50%{transform:translateY(-8px)}100%{transform:translateY(0px)}}
            @keyframes heroGridDrift{from{transform:translate3d(0,0,0)}to{transform:translate3d(-42px,21px,0)}}
            @keyframes heroAtmosphereDrift{0%{transform:translate3d(-1%,0,0) scale(1)}100%{transform:translate3d(2%,-1%,0) scale(1.04)}}
            @keyframes heroStreakSweep{0%{transform:translateX(-2%);opacity:.35}100%{transform:translateX(4%);opacity:.72}}

            .scrollIndicator{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);z-index:2;color:#4b5563;font-size:10px;font-weight:700;letter-spacing:3px;animation:scrollPulse 2.4s ease-in-out infinite}
            .scrollIndicator span{display:inline-block;margin-left:6px;color:#00c2ff;font-size:16px;vertical-align:-2px}
            @keyframes scrollPulse{0%,100%{opacity:.55;transform:translate(-50%,0)}50%{opacity:1;transform:translate(-50%,4px)}}

            @media (prefers-reduced-motion: reduce){
              .heroLabel,.heroTitle,.heroHeadline,.heroLead,.heroCTA,.heroVideoFrame,.carWrap,.scrollIndicator,.heroHud,.heroHudLabel,.heroHudNode{animation:none}
              .heroVideoFrame,.heroHud{transition:none}
              .homeBg::before,.homeBg::after,.homeBg + .heroContainer::before{animation:none}
            }

            @media (max-width:900px){
              .homeBg{background:
                radial-gradient(ellipse at 50% 64%, rgba(0,194,255,.18) 0%, rgba(0,126,166,.08) 26%, transparent 54%),
                linear-gradient(180deg, #e7f0f3 0%, #d9e6eb 27%, #18262e 48%, #0a1015 78%, #05070a 100%);
              }
              .homeBg::before{opacity:.26;background-size:30px 30px;background-position:center 72%;}
              .homeBg::after{opacity:.42;}
              .homeBg + .heroContainer::before{top:43%;right:0;width:100%;height:42%;opacity:.38;}
              .heroContainer{flex-direction:column;padding:112px 6vw 76px}
              .heroRight{order:2;margin-top:26px}
              .heroLeft{order:1;text-align:center}
              .heroLogo{max-width:45%}
              .heroTitle{font-size:clamp(36px,10vw,64px);text-align:center}
              .heroHeadline{text-align:center}
              .heroLead{text-align:center}
              .carWrap{width:100%;max-width:760px}
              .heroTechnicalLabel{top:-24px;right:2px}
              .heroHudLine,.heroHudNode{display:none}
              .heroHudBottomRight{display:none}
              .heroHudTopRight{top:18px;right:18px}
              .heroHudVehicle{left:18px;bottom:18px}
            }
          `}</style>
        </section>

        {/* ================= THE CAR ================= */}
        <section
          id="car"
          style={{
            width: "100%",
            minHeight: "100vh",
            padding: "80px 6vw 72px",
            boxSizing: "border-box",
            background: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <style>{`
            .carSectionLayout {
              width: 100%;
              max-width: 1440px;
              margin: 0 auto;
              display: grid;
              grid-template-columns: minmax(260px, 0.9fr) minmax(420px, 1.5fr);
              align-items: center;
              gap: clamp(28px, 4vw, 80px);
            }

            .carSectionIntro { position: relative; z-index: 1; }
            .carSectionLabel {
              margin: 0 0 18px;
              color: #00c2ff;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 4px;
              opacity: 0;
              transform: translateY(15px);
              animation: carSectionFadeIn 0.7s ease forwards;
            }
            .carSectionHeading {
              margin: 0 0 22px;
              color: #111111;
              font-size: clamp(36px, 4.7vw, 72px);
              line-height: 0.94;
              letter-spacing: 2px;
              font-weight: 800;
              opacity: 0;
              transform: translateY(26px);
              animation: carSectionHeadingIn 0.8s 0.12s ease forwards;
            }
            .carSectionDescription {
              margin: 0;
              max-width: 620px;
              color: #374151;
              font-size: 17px;
              line-height: 1.8;
            }
            .carSectionVisualWrap {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 520px;
            }
            .carVisualFrame {
              position: relative;
              width: min(100%, 760px);
              aspect-ratio: 1.5;
              padding: 24px 26px;
              background: rgba(248, 252, 255, 0.76);
              border: 1px solid rgba(0, 194, 255, 0.26);
              border-radius: 26px;
              box-shadow: inset 0 0 0 1px rgba(0, 194, 255, 0.06), 0 24px 60px rgba(13, 26, 37, 0.1);
              opacity: 0;
              transform: scale(0.96);
              animation: carVisualReveal 0.9s 0.28s cubic-bezier(0.18, 0.88, 0.26, 1) forwards;
            }
            .carVisualFrame::before,
            .carVisualFrame::after {
              content: "";
              position: absolute;
              width: 38px;
              height: 38px;
              border-color: rgba(0, 194, 255, 0.8);
              border-style: solid;
              pointer-events: none;
            }
            .carVisualFrame::before { top: 18px; left: 18px; border-width: 2px 0 0 2px; }
            .carVisualFrame::after { right: 18px; bottom: 18px; border-width: 0 2px 2px 0; }
            .carVisualFrame .carConnector {
              position: absolute;
              background: rgba(0, 194, 255, 0.5);
              border-radius: 999px;
              opacity: 0;
              transform-origin: center;
              animation: carConnectorReveal 0.7s ease forwards;
            }
            .carVisualFrame .carConnectorOne { top: 28px; left: 64px; width: 120px; height: 1px; animation-delay: 0.7s; }
            .carVisualFrame .carConnectorTwo { right: 70px; top: 72px; width: 110px; height: 1px; animation-delay: 0.9s; }
            .carVisualFrame .carConnectorThree { bottom: 52px; left: 84px; width: 100px; height: 1px; animation-delay: 1.05s; }
            .carVisualFrame .carConnectorFour { right: 82px; bottom: 88px; width: 96px; height: 1px; animation-delay: 1.15s; }
            .carNode {
              position: absolute;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #ffffff;
              border: 1px solid rgba(0, 194, 255, 0.8);
              box-shadow: 0 0 0 4px rgba(0, 194, 255, 0.12);
              opacity: 0;
              animation: carConnectorReveal 0.6s ease forwards;
            }
            .carNodeOne { top: 22px; left: 52px; animation-delay: 0.8s; }
            .carNodeTwo { top: 66px; right: 64px; animation-delay: 1s; }
            .carNodeThree { bottom: 48px; left: 74px; animation-delay: 1.15s; }
            .carNodeFour { bottom: 82px; right: 74px; animation-delay: 1.25s; }
            .carVisualTag {
              position: absolute;
              z-index: 2;
              color: #4b5563;
              font-size: 9px;
              font-weight: 800;
              letter-spacing: 2px;
              text-transform: uppercase;
              background: rgba(255, 255, 255, 0.8);
              border: 1px solid rgba(17, 24, 39, 0.08);
              padding: 7px 10px;
              backdrop-filter: blur(4px);
            }
            .carVisualTagTop { top: -12px; right: 24px; }
            .carVisualTagBottom { left: 18px; bottom: -12px; }
            .carVisualMedia {
              position: relative;
              z-index: 1;
              width: 100%;
              height: 100%;
              overflow: hidden;
              border-radius: 18px;
              background: radial-gradient(circle at center, rgba(0, 194, 255, 0.18), rgba(255, 255, 255, 0.85) 46%, rgba(233, 244, 255, 0.9) 100%);
              box-shadow: inset 0 0 0 1px rgba(0, 194, 255, 0.1);
              transform: perspective(1200px) rotateX(var(--car-tilt-x, 0deg)) rotateY(var(--car-tilt-y, 0deg)) translateY(-6px);
              transition: transform 0.25s ease;
            }
            .carVisualMedia img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
              filter: drop-shadow(0 22px 36px rgba(0, 194, 255, 0.14));
            }
            .carDataArea {
              position: relative;
              width: 100%;
              max-width: 1440px;
              margin: 40px auto 0;
              padding: clamp(36px, 5vw, 72px) clamp(22px, 5vw, 76px);
              display: grid;
              grid-template-columns: minmax(0, 1.18fr) minmax(300px, 0.82fr);
              gap: clamp(42px, 6vw, 96px);
              overflow: hidden;
              color: #f4f8fb;
              background-color: #11171b;
              background-image: linear-gradient(rgba(0, 194, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.035) 1px, transparent 1px);
              background-size: 34px 34px;
              box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);
            }
            .carDataArea::before {
              content: "TECHNICAL DATA / VELYXION EV-01";
              position: absolute;
              top: 18px;
              right: clamp(22px, 5vw, 76px);
              color: rgba(0, 194, 255, 0.58);
              font-size: 9px;
              font-weight: 800;
              letter-spacing: 2px;
            }
            .performanceData,
            .speedometerPanel { min-width: 0; padding-top: 12px; }
            .performanceDataHeader { margin-bottom: 28px; }
            .dataEyebrow {
              margin: 0 0 11px;
              color: #00c2ff;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 2.5px;
              text-transform: uppercase;
            }
            .dataSectionTitle {
              margin: 0;
              color: #ffffff;
              font-size: clamp(22px, 2.7vw, 38px);
              line-height: 1.05;
              letter-spacing: 0.5px;
              font-weight: 800;
              text-transform: uppercase;
            }
            .performanceDataGrid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              border-top: 1px solid rgba(166, 190, 204, 0.34);
              border-left: 1px solid rgba(166, 190, 204, 0.34);
            }
            .performanceDataBlock {
              position: relative;
              opacity: 0;
              transform: translateY(16px);
              animation: carDataReveal 0.55s ease forwards;
            }
            .performanceDataBlock {
              min-height: 166px;
              padding: 21px 24px 22px;
              border-right: 1px solid rgba(166, 190, 204, 0.34);
              border-bottom: 1px solid rgba(166, 190, 204, 0.34);
              transition: background 0.25s ease, border-color 0.25s ease;
            }
            .performanceDataBlock::after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 34px;
              height: 2px;
              background: #00c2ff;
              opacity: 0.8;
            }
            .performanceDataBlock:nth-child(1) { animation-delay: 0.15s; }
            .performanceDataBlock:nth-child(2) { animation-delay: 0.25s; }
            .performanceDataBlock:nth-child(3) { animation-delay: 0.35s; }
            .performanceDataBlock:nth-child(4) { animation-delay: 0.45s; }
            .performanceDataBlock:nth-child(5) { animation-delay: 0.55s; }
            .performanceDataBlock:nth-child(6) { animation-delay: 0.65s; }
            .performanceDataBlock:hover { background: rgba(0, 194, 255, 0.055); border-color: rgba(0, 194, 255, 0.62); }
            .performanceDataNumber {
              display: block;
              color: rgba(207, 222, 230, 0.6);
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 2px;
            }
            .performanceDataValue {
              display: inline-block;
              margin-top: 18px;
              color: #ffffff;
              font-size: clamp(52px, 6vw, 92px);
              line-height: 0.84;
              font-weight: 800;
              letter-spacing: -0.06em;
              transition: color 0.25s ease, text-shadow 0.25s ease;
            }
            .performanceDataUnit {
              display: inline-block;
              margin-left: 9px;
              color: #00c2ff;
              font-size: clamp(14px, 1.4vw, 21px);
              font-weight: 800;
              letter-spacing: 0.5px;
              transition: text-shadow 0.25s ease;
            }
            .performanceDataLabel {
              display: block;
              margin-top: 19px;
              color: rgba(230, 239, 244, 0.72);
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 1.8px;
              text-transform: uppercase;
            }
            .performanceDataBlock:hover .performanceDataValue { color: #eafdff; }
            .performanceDataBlock:hover .performanceDataUnit { text-shadow: 0 0 12px rgba(0, 194, 255, 0.72); }
            .speedometerPanel {
              position: relative;
              min-width: 0;
              min-height: 470px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 22px 0 0;
              overflow: hidden;
            }
            .speedometerHudTag {
              align-self: flex-end;
              margin: 0 8px 9px 0;
              color: rgba(0, 194, 255, 0.66);
              font-size: 9px;
              font-weight: 800;
              letter-spacing: 2px;
            }
            .speedometerFrame {
              position: relative;
              width: min(100%, 470px);
              aspect-ratio: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid rgba(0, 194, 255, 0.42);
              background: linear-gradient(rgba(0, 194, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.035) 1px, transparent 1px), #080d11;
              background-size: 28px 28px;
              box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 0 34px rgba(0, 194, 255, 0.08);
              transition: border-color 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease;
              cursor: pointer;
              touch-action: manipulation;
              user-select: none;
            }
            .speedometerFrame:focus-visible { outline: 2px solid rgba(0, 194, 255, 0.82); outline-offset: 5px; }
            .speedometerFrame:hover {
              border-color: rgba(0, 194, 255, 0.72);
              box-shadow: inset 0 0 0 1px rgba(0, 194, 255, 0.08), 0 0 48px rgba(0, 194, 255, 0.15);
              filter: brightness(1.08);
            }
            .speedometerFrame.isPulseActive { animation: speedometerInteractionPulse 0.42s ease-out; }
            .speedometerFrame::before,
            .speedometerFrame::after {
              content: "";
              position: absolute;
              width: 30px;
              height: 30px;
              border-color: rgba(0, 194, 255, 0.72);
              border-style: solid;
              pointer-events: none;
            }
            .speedometerFrame::before { top: 13px; left: 13px; border-width: 1px 0 0 1px; }
            .speedometerFrame::after { right: 13px; bottom: 13px; border-width: 0 1px 1px 0; }
            .speedometerSvg { width: 96%; height: 96%; overflow: visible; }
            .speedometerFace { fill: url(#speedometerFace); stroke: rgba(122, 161, 177, 0.22); stroke-width: 1; }
            .speedometerGridRing { fill: none; stroke: rgba(0, 194, 255, 0.1); stroke-width: 1; stroke-dasharray: 1 7; }
            .speedometerRedZone { fill: none; stroke: rgba(255, 70, 62, 0.42); stroke-width: 4; stroke-linecap: butt; transform: rotate(-135deg); transform-origin: 160px 160px; }
            .speedometerArcTrack,
            .speedometerArcProgress { fill: none; stroke-width: 5; stroke-linecap: round; transform: rotate(-135deg); transform-origin: 160px 160px; }
            .speedometerArcTrack { stroke: rgba(131, 173, 190, 0.17); stroke-dasharray: 75 25; stroke-dashoffset: 0; }
            .speedometerArcProgress { stroke: #00c2ff; stroke-dasharray: 75 25; transition: stroke-dashoffset 0.08s linear; }
            .speedometerTick { stroke: rgba(168, 199, 211, 0.38); stroke-width: 1; }
            .speedometerTickMajor { stroke: rgba(0, 194, 255, 0.8); stroke-width: 2; }
            .speedometerLabels { fill: rgba(224, 238, 244, 0.74); font-size: 9px; font-weight: 800; letter-spacing: 1px; }
            .speedometerNeedle { transform-origin: 160px 160px; transition: transform 0.08s linear; }
            .speedometerNeedle line { stroke: #8cecff; stroke-width: 2; filter: url(#speedometerGlow); }
            .speedometerNeedle circle { fill: #061016; stroke: #00c2ff; stroke-width: 3; filter: url(#speedometerGlow); }
            .speedometerUnit { fill: rgba(0, 194, 255, 0.84); font-size: 11px; font-weight: 800; letter-spacing: 3px; }
            .speedometerValue { fill: #ffffff; font-size: 48px; font-weight: 800; letter-spacing: -2px; filter: url(#speedometerGlow); }
            .speedometerMode { fill: rgba(176, 201, 211, 0.52); font-size: 6px; font-weight: 800; letter-spacing: 2px; }
            .speedometerCaption { margin-top: 15px; color: #00c2ff; font-size: 11px; font-weight: 800; letter-spacing: 3px; text-shadow: 0 0 12px rgba(0, 194, 255, 0.35); }
            .speedometerCorner { position: absolute; width: 8px; height: 8px; border-color: rgba(0, 194, 255, 0.76); border-style: solid; }
            .speedometerCornerTop { top: 28px; right: 28px; border-width: 1px 1px 0 0; }
            .speedometerCornerBottom { bottom: 28px; left: 28px; border-width: 0 0 1px 1px; }
            .speedometerStreak { position: absolute; left: 8%; width: 84%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0, 194, 255, 0.44), transparent); opacity: 0.4; animation: speedometerStreakMove 5s ease-in-out infinite; pointer-events: none; }
            .speedometerStreakOne { top: 35%; }
            .speedometerStreakTwo { top: 68%; animation-delay: 1.8s; opacity: 0.25; }
            @keyframes speedometerStreakMove { 0%, 100% { transform: translateX(-8%); opacity: 0.16; } 50% { transform: translateX(8%); opacity: 0.5; } }
            @keyframes speedometerInteractionPulse { 0% { box-shadow: inset 0 0 0 1px rgba(0, 194, 255, 0.08), 0 0 34px rgba(0, 194, 255, 0.08); } 45% { box-shadow: inset 0 0 0 1px rgba(0, 194, 255, 0.2), 0 0 58px rgba(0, 194, 255, 0.28); } 100% { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 0 34px rgba(0, 194, 255, 0.08); } }
            @keyframes carSectionFadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes carSectionHeadingIn { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes carVisualReveal { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            @keyframes carConnectorReveal { from { opacity: 0; transform: scaleX(0); } to { opacity: 1; transform: scaleX(1); } }
            @keyframes carDataReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
            @media (max-width: 980px) {
              .carSectionLayout { grid-template-columns: 1fr; }
              .carSectionIntro { text-align: left; }
              .carSectionDescription { max-width: 720px; }
              .carDataArea { grid-template-columns: 1fr; gap: 58px; }
              .speedometerPanel { min-height: 430px; }
            }
            @media (max-width: 620px) {
              .carSectionVisualWrap { min-height: 340px; }
              .carVisualFrame { padding: 18px 16px; border-radius: 20px; }
              .carDataArea { margin-top: 28px; padding: 46px 18px 34px; gap: 44px; }
              .carDataArea::before { top: 16px; right: 18px; font-size: 8px; }
              .performanceDataGrid { grid-template-columns: 1fr; }
              .performanceDataBlock { min-height: 144px; padding: 19px 18px 20px; }
              .speedometerPanel { min-height: 390px; padding-top: 10px; }
              .speedometerHudTag { align-self: center; margin-right: 0; }
              .speedometerFrame { width: min(100%, 380px); }
              .carVisualTag { font-size: 8px; letter-spacing: 1.4px; }
              .carSectionHeading { letter-spacing: 1px; }
            }
            @media (prefers-reduced-motion: reduce) {
              .carSectionLabel,
              .carSectionHeading,
              .carVisualFrame,
              .performanceDataBlock,
              .carVisualFrame .carConnector,
              .carNode { animation: none !important; }
              .carVisualMedia,
              .performanceDataBlock,
              .performanceDataValue,
              .performanceDataUnit,
              .speedometerFrame,
              .speedometerArcProgress,
              .speedometerNeedle,
              .speedometerFrame { transition: none !important; }
              .speedometerStreak { animation: none !important; }
              .speedometerFrame.isPulseActive { animation: none !important; }
            }
          `}</style>

          <div className="carSectionLayout">
            <div className="carSectionIntro">
              <div className="carSectionLabel">02 / THE MACHINE</div>
              <h2 className="carSectionHeading">ENGINEERED FOR ELECTRIC PERFORMANCE.</h2>
              <p className="carSectionDescription">VELYXION is a student-built electric race car developed through the integration of mechanical, electrical, electronic, and aerodynamic systems.</p>
            </div>

            <div
              className="carSectionVisualWrap"
              onMouseMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
                const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
                event.currentTarget.querySelector(".carVisualMedia").style.setProperty("--car-tilt-x", `${offsetY * -8}deg`);
                event.currentTarget.querySelector(".carVisualMedia").style.setProperty("--car-tilt-y", `${offsetX * 10}deg`);
              }}
              onMouseLeave={(event) => {
                const media = event.currentTarget.querySelector(".carVisualMedia");
                if (media) {
                  media.style.setProperty("--car-tilt-x", "0deg");
                  media.style.setProperty("--car-tilt-y", "0deg");
                }
              }}
            >
              <div className="carVisualFrame">
                <span className="carConnector carConnectorOne" aria-hidden="true" />
                <span className="carConnector carConnectorTwo" aria-hidden="true" />
                <span className="carConnector carConnectorThree" aria-hidden="true" />
                <span className="carConnector carConnectorFour" aria-hidden="true" />
                <span className="carNode carNodeOne" aria-hidden="true" />
                <span className="carNode carNodeTwo" aria-hidden="true" />
                <span className="carNode carNodeThree" aria-hidden="true" />
                <span className="carNode carNodeFour" aria-hidden="true" />
                <span className="carVisualTag carVisualTagTop">VELYXION / ELECTRIC RACE CAR</span>
                <span className="carVisualTag carVisualTagBottom">VEHICLE SYSTEM / 01</span>

                <div className="carVisualMedia">
                  <img src="/F1.jpg" alt="VELYXION electric race car shown in profile with aerodynamic bodywork" />
                </div>
              </div>
            </div>
          </div>

          <div className="carDataArea" aria-label="Vehicle engineering specification data">
            <div className="performanceData">
              <div className="performanceDataHeader">
                <div className="dataEyebrow">PERFORMANCE DATA</div>
                <h3 className="dataSectionTitle">PRIMARY VEHICLE PARAMETERS</h3>
              </div>

              <div className="performanceDataGrid">
                <div className="performanceDataBlock">
                  <span className="performanceDataNumber">01</span>
                  <span className="performanceDataValue">25</span><span className="performanceDataUnit">kW</span>
                  <span className="performanceDataLabel">PEAK POWER</span>
                </div>
                <div className="performanceDataBlock">
                  <span className="performanceDataNumber">02</span>
                  <span className="performanceDataValue">130</span><span className="performanceDataUnit">Nm</span>
                  <span className="performanceDataLabel">PEAK TORQUE</span>
                </div>
                <div className="performanceDataBlock">
                  <span className="performanceDataNumber">03</span>
                  <span className="performanceDataValue">330</span><span className="performanceDataUnit">kg</span>
                  <span className="performanceDataLabel">VEHICLE MASS</span>
                </div>
                <div className="performanceDataBlock">
                  <span className="performanceDataNumber">04</span>
                  <span className="performanceDataValue">96</span><span className="performanceDataUnit">V</span>
                  <span className="performanceDataLabel">NOMINAL VOLTAGE</span>
                </div>
                <div className="performanceDataBlock">
                  <span className="performanceDataNumber">05</span>
                  <span className="performanceDataValue">7.2</span><span className="performanceDataUnit">kWh</span>
                  <span className="performanceDataLabel">BATTERY ENERGY</span>
                </div>
                <div className="performanceDataBlock">
                  <span className="performanceDataNumber">06</span>
                  <span className="performanceDataValue">1</span><span className="performanceDataUnit">MOTOR</span>
                  <span className="performanceDataLabel">MOTOR CONFIGURATION</span>
                </div>
              </div>
            </div>

            <SpeedometerHUD />
          </div>
        </section>

        {/* ================= TECHNOLOGY ================= */}
        <section
          id="technology"
          style={{
            width: "100%",
            padding: "84px 6vw 96px",
            boxSizing: "border-box",
            background: "#ffffff",
          }}
        >
          <style>{`
            .technologyInner {
              width: 100%;
              max-width: 1360px;
              margin: 0 auto;
            }

            .technologyHeader {
              max-width: 820px;
              margin-bottom: 64px;
            }

            .technologyLabel {
              margin: 0 0 18px;
              color: #00c2ff;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 4px;
            }

            .technologyHeading {
              margin: 0 0 24px;
              color: #111111;
              font-size: clamp(42px, 6vw, 82px);
              line-height: 0.94;
              letter-spacing: 3px;
              font-weight: 800;
            }

            .technologyIntro {
              max-width: 760px;
              margin: 0;
              color: #4b5563;
              font-size: 16px;
              line-height: 1.8;
            }

            .technologyVisualization {
              position: relative;
              width: 100%;
              min-height: 520px;
              margin: 0 auto 76px;
              border-top: 1px solid rgba(17, 24, 39, 0.08);
              border-bottom: 1px solid rgba(17, 24, 39, 0.08);
              overflow: hidden;
            }

            .technologyVehicleFrame {
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 1;
              width: min(750px, 62%);
              aspect-ratio: 1.55;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 18px;
              box-sizing: border-box;
              transform: translate(-50%, -50%);
              border: 1px solid rgba(0, 194, 255, 0.2);
              border-radius: 20px;
              background: rgba(248, 252, 255, 0.58);
              box-shadow: inset 0 0 0 1px rgba(0, 194, 255, 0.05), 0 18px 48px rgba(17, 24, 39, 0.08);
              animation: technologyVehicleFloat 6s ease-in-out infinite;
            }

            .technologyVehicleFrame::before {
              content: "ENGINEERING SYSTEMS";
              position: absolute;
              top: 14px;
              left: 18px;
              color: rgba(17, 24, 39, 0.42);
              font-size: 9px;
              font-weight: 800;
              letter-spacing: 2px;
            }

            .technologyVehicleFrame::after {
              content: "";
              position: absolute;
              inset: 10px;
              border: 1px solid rgba(0, 194, 255, 0.12);
              border-radius: 14px;
              pointer-events: none;
            }

            .technologyVehicleGlow {
              position: absolute;
              inset: 14% 12%;
              z-index: -1;
              background: radial-gradient(circle, rgba(0, 194, 255, 0.2), rgba(0, 194, 255, 0.05) 42%, transparent 70%);
              filter: blur(22px);
            }

            .technologyVehicleImage {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
              border-radius: 12px;
              filter: drop-shadow(0 18px 28px rgba(0, 194, 255, 0.16));
            }

            .technologySystemLabel {
              position: absolute;
              z-index: 2;
              display: inline-flex;
              align-items: center;
              gap: 9px;
              padding: 10px 12px;
              color: #4b5563;
              background: rgba(255, 255, 255, 0.88);
              border: 1px solid rgba(17, 24, 39, 0.12);
              cursor: pointer;
              font: inherit;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 1.4px;
              text-align: left;
              transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
            }

            .technologySystemLabel::after {
              content: "";
              position: absolute;
              height: 1px;
              background: #00c2ff;
              opacity: 0.62;
              transform-origin: left center;
              animation: technologyLinePulse 4s ease-in-out infinite;
            }

            .technologySystemLabel:hover,
            .technologySystemLabel:focus-visible,
            .technologySystemLabel.isHighlighted {
              z-index: 3;
              color: #111111;
              border-color: #00c2ff;
              box-shadow: 0 0 18px rgba(0, 194, 255, 0.16);
              transform: translateY(-2px);
              outline: none;
            }

            .technologySystemLabelNumber {
              color: #00c2ff;
              font-size: 10px;
            }

            .technologySystemLabelPowertrain { top: 15%; left: 8%; }
            .technologySystemLabelEnergy { top: 15%; right: 8%; }
            .technologySystemLabelAerodynamics { top: 47%; left: 4%; }
            .technologySystemLabelControl { top: 45%; right: 7%; }
            .technologySystemLabelDynamics { bottom: 17%; right: 6%; }
            .technologySystemLabelChassis { bottom: 5%; left: 50%; transform: translateX(-50%); }

            .technologySystemLabelPowertrain::after { width: 150px; left: 100%; top: 100%; transform: rotate(25deg); }
            .technologySystemLabelEnergy::after { width: 150px; right: 100%; top: 100%; transform: rotate(-25deg); transform-origin: right center; }
            .technologySystemLabelAerodynamics::after { width: 150px; left: 100%; top: 50%; transform: rotate(-9deg); }
            .technologySystemLabelControl::after { width: 130px; right: 100%; top: 50%; transform: rotate(9deg); transform-origin: right center; }
            .technologySystemLabelDynamics::after { width: 150px; right: 100%; top: 10%; transform: rotate(-25deg); transform-origin: right center; }
            .technologySystemLabelChassis::after { width: 110px; left: 50%; bottom: 100%; transform: rotate(-90deg); transform-origin: left center; }

            @keyframes technologyVehicleFloat {
              0%, 100% { margin-top: 0; }
              50% { margin-top: -6px; }
            }

            @keyframes technologyLinePulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.78; }
            }

            .technologyGrid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 18px;
            }

            .technologyCard {
              position: relative;
              min-height: 270px;
              padding: 0;
              overflow: hidden;
              box-sizing: border-box;
              background: linear-gradient(145deg, #ffffff 0%, #f7fafc 100%);
              border: 1px solid rgba(17, 24, 39, 0.1);
              box-shadow: 0 14px 34px rgba(17, 24, 39, 0.045);
              transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
            }

            .technologyCard.isActive {
              border-color: #00c2ff;
              box-shadow: 0 18px 42px rgba(0, 194, 255, 0.14), 0 0 24px rgba(0, 194, 255, 0.07);
            }

            .technologyCard.isHighlighted {
              border-color: rgba(0, 194, 255, 0.72);
              box-shadow: 0 16px 36px rgba(0, 194, 255, 0.1);
            }

            .technologyCard::before,
            .technologyCard::after {
              content: "";
              position: absolute;
              width: 22px;
              height: 22px;
              pointer-events: none;
              transition: border-color 0.22s ease;
            }

            .technologyCard::before {
              top: 12px;
              right: 12px;
              border-top: 1px solid rgba(0, 194, 255, 0.42);
              border-right: 1px solid rgba(0, 194, 255, 0.42);
            }

            .technologyCard::after {
              bottom: 12px;
              left: 12px;
              border-bottom: 1px solid rgba(0, 194, 255, 0.42);
              border-left: 1px solid rgba(0, 194, 255, 0.42);
            }

            .technologyCard:hover {
              transform: translateY(-6px);
              border-color: #00c2ff;
              box-shadow: 0 20px 42px rgba(0, 194, 255, 0.11);
            }

            .technologyCard.isActive:hover {
              box-shadow: 0 18px 42px rgba(0, 194, 255, 0.14), 0 0 24px rgba(0, 194, 255, 0.07);
            }

            .technologyCard:hover::before,
            .technologyCard:hover::after {
              border-color: #00c2ff;
            }

            .technologyNumber {
              display: block;
              color: #00c2ff;
              font-size: 13px;
              font-weight: 800;
              letter-spacing: 2px;
            }

            .technologyCardTrigger {
              display: block;
              width: 100%;
              min-height: 270px;
              padding: 28px 28px 30px;
              box-sizing: border-box;
              color: inherit;
              text-align: left;
              background: transparent;
              border: 0;
              cursor: pointer;
              font: inherit;
            }

            .technologyCardTrigger:focus-visible,
            .technologyClose:focus-visible {
              outline: 2px solid #00c2ff;
              outline-offset: -3px;
            }

            .technologyCardTrigger .technologyNumber {
              margin-bottom: 34px;
            }

            .technologyCardTitle {
              position: relative;
              margin: 0 0 14px;
              padding-top: 16px;
              color: #111111;
              font-size: 18px;
              line-height: 1.2;
              letter-spacing: 2px;
              font-weight: 800;
            }

            .technologyCardTitle::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 42px;
              height: 2px;
              background: #00c2ff;
            }

            .technologyCardText {
              max-width: 340px;
              margin: 0;
              color: #5b6470;
              font-size: 14px;
              line-height: 1.7;
            }

            .technologyAction {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin-top: 26px;
              color: #111111;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 1.5px;
            }

            .technologyActionArrow {
              color: #00c2ff;
              font-size: 16px;
              line-height: 1;
              transition: transform 0.25s ease;
            }

            .technologyCard:hover .technologyActionArrow,
            .technologyCard.isActive .technologyActionArrow {
              transform: translateX(4px);
            }

            .technologyDetails {
              display: grid;
              grid-template-rows: 0fr;
              opacity: 0;
              padding: 0 28px;
              transition: grid-template-rows 0.4s ease, opacity 0.3s ease, padding 0.4s ease;
            }

            .technologyDetailsInner {
              min-height: 0;
              overflow: hidden;
            }

            .technologyCard.isActive .technologyDetails {
              grid-template-rows: 1fr;
              opacity: 1;
              padding: 0 28px 28px;
            }

            .technologyActiveLabel {
              display: block;
              margin-bottom: 16px;
              color: #00c2ff;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 2px;
            }

            .technologyDetailText {
              margin: 0 0 22px;
              color: #4b5563;
              font-size: 14px;
              line-height: 1.7;
            }

            .technologySpecifications {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 10px;
              margin: 0 0 22px;
            }

            .technologySpecification {
              min-width: 0;
              padding: 12px 13px;
              background: rgba(255, 255, 255, 0.72);
              border: 1px solid rgba(17, 24, 39, 0.09);
              border-left: 2px solid rgba(0, 194, 255, 0.56);
            }

            .technologySpecificationLabel,
            .vehicleSpecificationLabel {
              display: block;
              margin-bottom: 7px;
              color: #68717d;
              font-size: 9px;
              font-weight: 800;
              letter-spacing: 1.3px;
              line-height: 1.4;
            }

            .technologySpecificationValue,
            .vehicleSpecificationValue {
              display: block;
              color: #111111;
              font-size: 16px;
              font-weight: 800;
              line-height: 1.25;
              overflow-wrap: anywhere;
            }

            .vehicleData {
              margin-top: 52px;
              padding: 28px;
              background: linear-gradient(145deg, #ffffff 0%, #f7fafc 100%);
              border: 1px solid rgba(17, 24, 39, 0.1);
              box-shadow: 0 14px 34px rgba(17, 24, 39, 0.045);
            }

            .vehicleDataHeader {
              display: flex;
              align-items: baseline;
              justify-content: space-between;
              gap: 20px;
              margin-bottom: 22px;
            }

            .vehicleDataTitle {
              margin: 0;
              color: #111111;
              font-size: 18px;
              letter-spacing: 2px;
            }

            .vehicleDataRule {
              flex: 1;
              height: 1px;
              background: rgba(0, 194, 255, 0.38);
            }

            .vehicleDataGrid {
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 12px;
            }

            .vehicleSpecification {
              min-width: 0;
              padding: 16px;
              border: 1px solid rgba(17, 24, 39, 0.09);
              border-top: 2px solid rgba(0, 194, 255, 0.58);
              background: rgba(255, 255, 255, 0.68);
              transition: border-color 0.25s ease, box-shadow 0.25s ease;
            }

            .vehicleSpecification:hover {
              border-color: rgba(0, 194, 255, 0.72);
              box-shadow: 0 10px 24px rgba(0, 194, 255, 0.08);
            }

            .technologyElementsLabel {
              margin: 0 0 10px;
              color: #111111;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 2px;
            }

            .technologyElements {
              display: grid;
              gap: 7px;
              margin: 0;
              padding: 0;
              list-style: none;
              color: #5b6470;
              font-size: 13px;
            }

            .technologyElements li::before {
              content: "•";
              margin-right: 8px;
              color: #00c2ff;
            }

            .technologyClose {
              margin-top: 22px;
              padding: 0;
              color: #111111;
              background: transparent;
              border: 0;
              cursor: pointer;
              font: inherit;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 1.5px;
            }

            .technologyClose:hover {
              color: #00c2ff;
            }

            @media (max-width: 980px) {
              .technologyVisualization {
                min-height: 470px;
              }

              .technologyVehicleFrame {
                width: min(650px, 70%);
              }

              .technologyGrid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }

              .vehicleDataGrid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (max-width: 620px) {
              .technologyVisualization {
                min-height: 0;
                margin-bottom: 56px;
                padding: 18px 0 0;
                overflow: visible;
              }

              .technologyVehicleFrame {
                position: relative;
                top: auto;
                left: auto;
                width: 100%;
                aspect-ratio: 1.35;
                transform: none;
                animation: technologyVehicleFloat 6s ease-in-out infinite;
              }

              .technologyLabelGrid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 10px;
                margin-top: 18px;
              }

              .technologySystemLabel,
              .technologySystemLabelPowertrain,
              .technologySystemLabelEnergy,
              .technologySystemLabelAerodynamics,
              .technologySystemLabelControl,
              .technologySystemLabelDynamics,
              .technologySystemLabelChassis {
                position: relative;
                inset: auto;
                width: 100%;
                box-sizing: border-box;
                transform: none;
              }

              .technologySystemLabel::after {
                display: none;
              }

              .technologyGrid {
                grid-template-columns: 1fr;
              }

              .technologyHeader {
                margin-bottom: 44px;
              }

              .technologyCard {
                min-height: 220px;
              }

              .technologyCardTrigger {
                min-height: 220px;
              }

              .technologySpecifications {
                grid-template-columns: 1fr;
              }

              .vehicleData {
                padding: 22px;
              }

              .vehicleDataHeader {
                display: block;
              }

              .vehicleDataRule {
                display: block;
                width: 100%;
                margin-top: 14px;
              }

              .vehicleDataGrid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>

          <div className="technologyInner">
            <header className="technologyHeader">
              <div className="technologyLabel">02 / TECHNOLOGY</div>
              <h2 className="technologyHeading">ENGINEERED AS A SYSTEM.</h2>
              <p className="technologyIntro">
                VELYXION is developed as an integrated electric vehicle system,
                where powertrain, energy, control, aerodynamics, vehicle dynamics,
                and structures work together.
              </p>
            </header>

            <div className="technologyVisualization" aria-label="Engineering systems visualization">
              <div className="technologyVehicleFrame">
                <div className="technologyVehicleGlow" />
                <img
                  className="technologyVehicleImage"
                  src="/F1.jpg"
                  alt="Technical vehicle visualization"
                />
              </div>

              <div className="technologyLabelGrid">
                {technologySystems.map((system) => {
                  const isHighlighted = hoveredTechnology === system.number;

                  return (
                    <button
                      type="button"
                      key={system.number}
                      className={`technologySystemLabel technologySystemLabel${technologyLabelPositions[system.number]}${isHighlighted ? " isHighlighted" : ""}`}
                      aria-label={`Open ${system.title} technology system`}
                      onMouseEnter={() => setHoveredTechnology(system.number)}
                      onMouseLeave={() => setHoveredTechnology(null)}
                      onFocus={() => setHoveredTechnology(system.number)}
                      onBlur={() => setHoveredTechnology(null)}
                      onClick={() => handleTechnologyLabelClick(system.number)}
                    >
                      <span className="technologySystemLabelNumber">{system.number} /</span>
                      <span>{system.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="technologyGrid">
              {technologySystems.map((system) => {
                const isActive = activeTechnology === system.number;
                const isHighlighted = hoveredTechnology === system.number;

                return (
                  <article
                    id={`technology-card-${system.number}`}
                    className={`technologyCard${isActive ? " isActive" : ""}${isHighlighted ? " isHighlighted" : ""}`}
                    key={system.number}
                  >
                    <button
                      type="button"
                      className="technologyCardTrigger"
                      aria-expanded={isActive}
                      aria-controls={`technology-details-${system.number}`}
                      onClick={() =>
                        setActiveTechnology(isActive ? null : system.number)
                      }
                    >
                      <span className="technologyNumber">
                        {isActive ? `${system.number} / ACTIVE SYSTEM` : system.number}
                      </span>
                      <h3 className="technologyCardTitle">{system.title}</h3>
                      <p className="technologyCardText">{system.summary}</p>
                      <span className="technologyAction">
                        {isActive ? "CLOSE DETAILS" : "VIEW DETAILS"}
                        <span className="technologyActionArrow" aria-hidden="true">
                          {isActive ? "↑" : "→"}
                        </span>
                      </span>
                    </button>

                    <div
                      id={`technology-details-${system.number}`}
                      className="technologyDetails"
                      aria-hidden={!isActive}
                    >
                      <div className="technologyDetailsInner">
                        <p className="technologyDetailText">{system.details}</p>
                        <p className="technologyElementsLabel">SPECIFICATIONS</p>
                        <div className="technologySpecifications">
                          {system.specifications.map(([label, value]) => (
                            <div className="technologySpecification" key={label}>
                              <span className="technologySpecificationLabel">{label}</span>
                              <span className="technologySpecificationValue">{value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="technologyElementsLabel">SYSTEM ELEMENTS</p>
                        <ul className="technologyElements">
                          {system.elements.map((element) => (
                            <li key={element}>{element}</li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="technologyClose"
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setActiveTechnology(null)}
                        >
                          CLOSE DETAILS
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <section className="vehicleData" aria-labelledby="vehicle-data-heading">
              <div className="vehicleDataHeader">
                <h3 id="vehicle-data-heading" className="vehicleDataTitle">VEHICLE DATA</h3>
                <span className="vehicleDataRule" aria-hidden="true" />
              </div>
              <div className="vehicleDataGrid">
                {vehicleSpecifications.map(([label, value]) => (
                  <div className="vehicleSpecification" key={label}>
                    <span className="vehicleSpecificationLabel">{label}</span>
                    <span className="vehicleSpecificationValue">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* ================= TEAM ================= */}

        <TeamSection />

        {/* ================= ENGINEERING JOURNEY ================= */}

        <EngineeringJourneySection />

        {/* ================= CONTACT ================= */}
        <section
          id="contact"
          className="contactSection"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            padding: "120px 8vw 120px",
            boxSizing: "border-box",
            background: "linear-gradient(180deg, rgba(3, 8, 12, 0.35), rgba(3, 8, 12, 0.65))",
          }}
        >
          <style>{`
            .contactSection {
              color: #111111;
              background: #ffffff;
            }
            .contactInner {
              width: min(1200px, 100%);
              margin: 0 auto;
            }
            .contactHeader {
              margin-bottom: 42px;
            }
            .contactEyebrow {
              color: #00c2ff;
              font-size: 11px;
              letter-spacing: 5px;
              font-weight: 700;
              margin-bottom: 18px;
            }
            .contactTitle {
              margin: 0;
              font-size: clamp(40px, 6vw, 76px);
              letter-spacing: 6px;
              line-height: 0.95;
              font-weight: 800;
              color: #111111;
              text-transform: uppercase;
              text-shadow: none;
            }
            .contactIntro {
              max-width: 700px;
              color: #4b5563;
              line-height: 1.8;
              font-size: 15px;
              margin-top: 20px;
            }
            .contactGrid {
              display: block;
              width: 100%;
            }
            .contactInfoPanel {
              width: min(100%, 760px);
              background: #f8fafc;
              border: 1px solid rgba(0, 0, 0, 0.10);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
              backdrop-filter: blur(14px);
              border-radius: 18px;
              padding: 28px;
              transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
            }
            .contactInfoPanel:hover {
              transform: translateY(-3px);
              border-color: rgba(0, 194, 255, 0.5);
              box-shadow: 0 14px 34px rgba(0, 194, 255, 0.08);
            }
            .contactCardList {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 18px;
              margin-top: 24px;
            }
            .contactCard {
              background: #ffffff;
              border: 1px solid rgba(0, 0, 0, 0.08);
              border-radius: 14px;
              padding: 18px 18px 16px;
              transition: border-color 0.25s ease, transform 0.25s ease;
            }
            .contactCard:hover {
              border-color: rgba(0, 194, 255, 0.5);
              transform: translateY(-2px);
            }
            .contactLabel {
              display: flex;
              align-items: center;
              gap: 8px;
              color: #00c2ff;
              font-size: 10px;
              letter-spacing: 2.5px;
              text-transform: uppercase;
              margin-bottom: 12px;
              font-weight: 700;
            }
            .contactIcon {
              width: 16px;
              height: 16px;
              flex: 0 0 16px;
              fill: none;
              stroke: #111111;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1.5;
              transition: stroke 0.25s ease;
            }
            .contactCard:hover .contactIcon {
              stroke: #00c2ff;
            }
            .contactValue {
              color: #111111;
              font-size: 14px;
              letter-spacing: 1px;
              line-height: 1.7;
              word-break: break-word;
            }
            @media (max-width: 900px) {
              .contactGrid {
                grid-template-columns: 1fr;
              }
              .contactCardList {
                grid-template-columns: 1fr 1fr;
              }
            }
            @media (max-width: 640px) {
              .contactSection {
                padding-left: 5vw;
                padding-right: 5vw;
              }
              .contactCardList,
              .fieldRow {
                grid-template-columns: 1fr;
              }
              .contactInfoPanel {
                padding: 22px 18px;
              }
              .contactTitle {
                letter-spacing: 3px;
              }
            }
          `}</style>

          <div className="contactInner">
            <div className="contactHeader">
              <div className="contactEyebrow">04 / CONTACT</div>
              <h2 className="contactTitle">LET'S CONNECT.</h2>
              <p className="contactIntro">
                VELYXION is a student-led electric performance team building next-generation engineering capability through innovation, collaboration, and competition.
              </p>
            </div>

            <div className="contactGrid">
              <div className="contactInfoPanel">
                <div className="contactCardList">
                  <div className="contactCard">
                    <div className="contactLabel"><ContactIcon type="email" />Email</div>
                    <div className="contactValue">velxyion@gmail.com</div>
                  </div>

                  <div className="contactCard">
                    <div className="contactLabel"><ContactIcon type="location" />College / Location</div>
                    <div className="contactValue">Sri Eshwar College of Engineering</div>
                  </div>

                  <div className="contactCard">
                    <div className="contactLabel"><ContactIcon type="socials" />Socials</div>
                    <div className="contactValue">
                      <div><a href="https://www.instagram.com/velyxion_/" target="_blank" rel="noopener noreferrer">Instagram: @velyxion_</a></div>
                      <div><a href="https://www.linkedin.com/company/velyxion/" target="_blank" rel="noopener noreferrer">LinkedIn: https://www.linkedin.com/company/velyxion/</a></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <BackToTop />
    </>
  );
}

export default App;