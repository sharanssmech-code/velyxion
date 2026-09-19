import { useEffect, useRef, useState } from "react";

const journeyStages = [
  {
    number: "01",
    title: "CONCEPT",
    description:
      "Defining the vehicle concept, objectives, requirements, and overall engineering direction.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "Developing vehicle components and systems through CAD, design studies, and system integration.",
  },
  {
    number: "03",
    title: "ANALYSIS",
    description:
      "Using engineering calculations, simulation, and technical evaluation to study design decisions.",
  },
  {
    number: "04",
    title: "FABRICATION",
    description:
      "Turning designed components into physical parts through manufacturing and workshop processes.",
  },
  {
    number: "05",
    title: "ASSEMBLY",
    description:
      "Integrating mechanical, electrical, electronic, and structural systems into the vehicle.",
  },
  {
    number: "06",
    title: "TESTING",
    description:
      "Testing the vehicle and its systems, collecting observations and data, and using the results for further development.",
  },
];

function EngineeringJourneySection() {
  const sectionRef = useRef(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      setHasRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className={`engineeringJourney${hasRevealed ? " isVisible" : ""}`}
      aria-labelledby="engineering-journey-heading"
    >
      <style>{`
        .engineeringJourney {
          width: 100%;
          box-sizing: border-box;
          padding: 132px 6vw 146px;
          background: #ffffff;
          color: #111111;
          overflow: hidden;
        }

        .engineeringJourneyInner {
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
        }

        .engineeringJourneyHeader {
          max-width: 790px;
          margin-bottom: 76px;
        }

        .engineeringJourneyLabel {
          margin: 0 0 18px;
          color: #00c2ff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .engineeringJourneyHeading {
          margin: 0 0 24px;
          color: #111111;
          font-size: clamp(42px, 6vw, 82px);
          line-height: 0.94;
          letter-spacing: 3px;
          font-weight: 800;
        }

        .engineeringJourneyIntro {
          max-width: 760px;
          margin: 0;
          color: #4b5563;
          font-size: 16px;
          line-height: 1.8;
        }

        .engineeringJourneyTimeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 18px;
          padding-top: 38px;
        }

        .engineeringJourneyTrack {
          position: absolute;
          top: 59px;
          left: 8.2%;
          width: 83.6%;
          height: 1px;
          overflow: hidden;
          background: rgba(17, 24, 39, 0.13);
        }

        .engineeringJourneyTrack::after {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background: #00c2ff;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 1.4s cubic-bezier(0.2, 0.75, 0.25, 1);
        }

        .engineeringJourney.isVisible .engineeringJourneyTrack::after {
          transform: scaleX(1);
        }

        .engineeringJourneyStage {
          position: relative;
          z-index: 1;
          min-width: 0;
          padding: 0 10px 24px;
          border: 1px solid transparent;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .engineeringJourney.isVisible .engineeringJourneyStage {
          opacity: 1;
          transform: translateY(0);
          transition-delay: calc(var(--stage-index) * 0.12s);
        }

        .engineeringJourneyStage:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 194, 255, 0.7);
          box-shadow: 0 14px 28px rgba(0, 194, 255, 0.08);
        }

        .engineeringJourneyNode {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px;
          box-sizing: border-box;
          color: #00c2ff;
          background: #ffffff;
          border: 1px solid rgba(0, 194, 255, 0.7);
          border-radius: 50%;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          transition: box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease;
        }

        .engineeringJourney.isVisible .engineeringJourneyStage:nth-child(2) .engineeringJourneyNode,
        .engineeringJourney.isVisible .engineeringJourneyStage:nth-child(3) .engineeringJourneyNode,
        .engineeringJourney.isVisible .engineeringJourneyStage:nth-child(4) .engineeringJourneyNode,
        .engineeringJourney.isVisible .engineeringJourneyStage:nth-child(5) .engineeringJourneyNode,
        .engineeringJourney.isVisible .engineeringJourneyStage:nth-child(6) .engineeringJourneyNode,
        .engineeringJourney.isVisible .engineeringJourneyStage:nth-child(7) .engineeringJourneyNode {
          animation: engineeringNodeGlow 0.7s ease both;
          animation-delay: calc(var(--stage-index) * 0.12s + 0.25s);
        }

        .engineeringJourneyStage:hover .engineeringJourneyNode {
          color: #111111;
          background: #00c2ff;
          box-shadow: 0 0 18px rgba(0, 194, 255, 0.42);
        }

        .engineeringJourneyStageNumber {
          display: block;
          margin-bottom: 14px;
          color: #00c2ff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        .engineeringJourneyStageTitle {
          position: relative;
          margin: 0 0 17px;
          padding-top: 13px;
          color: #111111;
          font-size: 16px;
          line-height: 1.25;
          letter-spacing: 1.8px;
          font-weight: 800;
        }

        .engineeringJourneyStageTitle::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 34px;
          height: 2px;
          background: #00c2ff;
          transition: width 0.3s ease;
        }

        .engineeringJourneyStage:hover .engineeringJourneyStageTitle::before {
          width: 54px;
        }

        .engineeringJourneyStageDescription {
          margin: 0;
          color: #68717d;
          font-size: 13px;
          line-height: 1.7;
          transition: color 0.3s ease;
        }

        .engineeringJourneyStage:hover .engineeringJourneyStageDescription {
          color: #374151;
        }

        @keyframes engineeringNodeGlow {
          0% { box-shadow: 0 0 0 rgba(0, 194, 255, 0); }
          45% { box-shadow: 0 0 22px rgba(0, 194, 255, 0.5); }
          100% { box-shadow: 0 0 0 rgba(0, 194, 255, 0); }
        }

        @media (max-width: 1100px) {
          .engineeringJourneyTimeline {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            row-gap: 54px;
          }

          .engineeringJourneyTrack {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .engineeringJourney {
            padding: 108px 6vw 116px;
          }

          .engineeringJourneyHeader {
            margin-bottom: 52px;
          }

          .engineeringJourneyTimeline {
            display: block;
            padding: 0 0 0 22px;
          }

          .engineeringJourneyTrack {
            display: block;
            top: 20px;
            left: 42px;
            width: 1px;
            height: calc(100% - 40px);
          }

          .engineeringJourneyTrack::after {
            width: 100%;
            height: 100%;
            transform: scaleY(0);
            transform-origin: top center;
            transition: transform 1.4s cubic-bezier(0.2, 0.75, 0.25, 1);
          }

          .engineeringJourney.isVisible .engineeringJourneyTrack::after {
            transform: scaleY(1);
          }

          .engineeringJourneyStage,
          .engineeringJourney.isVisible .engineeringJourneyStage {
            min-height: 160px;
            margin: 0 0 28px;
            padding: 0 0 26px 56px;
            opacity: 1;
            transform: none;
          }

          .engineeringJourneyStage:last-child {
            min-height: 0;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .engineeringJourneyNode {
            position: absolute;
            top: 0;
            left: 0;
            width: 42px;
            height: 42px;
            margin: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .engineeringJourneyStage,
          .engineeringJourneyTrack::after,
          .engineeringJourneyNode,
          .engineeringJourneyStageTitle::before {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="engineeringJourneyInner">
        <header className="engineeringJourneyHeader">
          <div className="engineeringJourneyLabel">04 / ENGINEERING JOURNEY</div>
          <h2 id="engineering-journey-heading" className="engineeringJourneyHeading">
            FROM CONCEPT TO CIRCUIT.
          </h2>
          <p className="engineeringJourneyIntro">
            VELYXION follows an iterative engineering process where ideas are developed,
            analysed, manufactured, integrated, and tested as one evolving vehicle programme.
          </p>
        </header>

        <div className="engineeringJourneyTimeline" aria-label="VELYXION engineering process">
          <div className="engineeringJourneyTrack" aria-hidden="true" />
          {journeyStages.map((stage, index) => (
            <article
              className="engineeringJourneyStage"
              key={stage.number}
              style={{ "--stage-index": index }}
            >
              <div className="engineeringJourneyNode" aria-hidden="true">
                {stage.number}
              </div>
              <span className="engineeringJourneyStageNumber">{stage.number}</span>
              <h3 className="engineeringJourneyStageTitle">{stage.title}</h3>
              <p className="engineeringJourneyStageDescription">{stage.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EngineeringJourneySection;
