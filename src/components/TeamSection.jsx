import { useState } from "react";

function TeamSection() {
  return (
    <section
      id="team"
      style={{
        minHeight: "100vh",
        padding: "92px 8vw",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ color: "#00c2ff", fontSize: "11px", letterSpacing: "5px", marginBottom: "20px", fontWeight: "600" }}>
          03 / THE PEOPLE
        </div>

        <h2 style={{ margin: "0 0 25px", fontSize: "clamp(48px, 7vw, 86px)", letterSpacing: "8px", fontWeight: "700", lineHeight: "1" }}>
          THE TEAM
        </h2>

        <p style={{ maxWidth: "650px", color: "#4b5563", lineHeight: "1.8", fontSize: "15px", margin: "0 0 60px" }}>
          Meet the student leaders behind VELYXION, driving the project through collaboration, engineering, and continuous development.
        </p>

        <div className="mentorLeadership">
          <div style={cardStyle}>
            <div className="leadershipPhotoFrame" style={photoFrameStyle}>
              <img className="leadershipPhoto" src="/team/mentor.jpg" alt="Mr. S. Gowtham - Mentor" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle}>03.01 / TEAM LEADERSHIP</div>
              <div style={accentLineStyle} />
              <div style={nameStyle}>Mr. S. Gowtham</div>
              <h3 style={roleStyle}>MENTOR</h3>
              <p style={descriptionStyle}>Department of Mechanical</p>
            </div>
          </div>
        </div>

        <div className="leadershipPair">
          <div style={cardStyle}>
            <div className="leadershipPhotoFrame" style={photoFrameStyle}>
              <img className="leadershipPhoto" src="/team/captain.JPG" alt="Captain" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle}>03.02 / TEAM LEADERSHIP</div>
              <div style={accentLineStyle} />
              <div style={nameStyle}>THIPPUSULTHAN. A</div>
              <h3 style={roleStyle}>CAPTAIN</h3>
              <p style={descriptionStyle}>Team leadership, coordination, project direction, and overall execution of the VELYXION programme.</p>
            </div>
          </div>

          <div style={cardStyle}>
            <div className="leadershipPhotoFrame" style={photoFrameStyle}>
              <img className="leadershipPhoto" src="/team/co-captain.JPG" alt="Co-captain" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle}>03.03 / TEAM LEADERSHIP</div>
              <div style={accentLineStyle} />
              <div style={nameStyle}>ASWIN. VA</div>
              <h3 style={roleStyle}>CO-CAPTAIN</h3>
              <p style={descriptionStyle}>Supporting team leadership, coordination, technical collaboration, and project execution.</p>
            </div>
          </div>
        </div>

        <style>{`
          .leadershipPhotoFrame { position: relative; width: 100%; aspect-ratio: 1 / 1; height: auto; overflow: hidden; }
          .leadershipPhotoFrame::before, .leadershipPhotoFrame::after { content: ""; position: absolute; z-index: 1; width: 22px; height: 22px; border-color: rgba(0, 194, 255, 0.48); border-style: solid; pointer-events: none; }
          .leadershipPhotoFrame::before { top: 14px; right: 14px; border-width: 1px 1px 0 0; }
          .leadershipPhotoFrame::after { bottom: 14px; left: 14px; border-width: 0 0 1px 1px; }
          .leadershipPhoto { transition: transform 0.3s ease; }
          .leadershipPhotoFrame:hover .leadershipPhoto { transform: scale(1.02); }
          .leadershipPhotoFrame:hover::before, .leadershipPhotoFrame:hover::after { border-color: #00c2ff; }
          .mentorLeadership { width: min(50%, 540px); margin: 0 auto; }
          .leadershipPair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; margin-top: 28px; }
          .engineeringLeadsSection { margin-top: 96px; }
          .engineeringLeadsLabel { margin-bottom: 18px; color: #00c2ff; font-size: 11px; font-weight: 600; letter-spacing: 5px; }
          .engineeringLeadsHeading { margin: 0 0 20px; color: #111111; font-size: clamp(34px, 5vw, 58px); line-height: 1; letter-spacing: 5px; font-weight: 700; }
          .engineeringLeadsIntro { max-width: 650px; margin: 0 0 42px; color: #4b5563; font-size: 15px; line-height: 1.8; }
          .engineeringLeadsGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; align-items: stretch; }
          .engineeringLeadCard { min-width: 0; min-height: 0; height: 100%; display: flex; flex-direction: column; background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 0 12px 28px rgba(0, 0, 0, 0.04); overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
          .engineeringLeadCard:hover { transform: translateY(-5px); border-color: #00c2ff; box-shadow: 0 18px 34px rgba(0, 194, 255, 0.1); }
          .engineeringLeadPlaceholder { position: relative; width: 100%; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; background: linear-gradient(135deg, #f7fafc, #ffffff); border-bottom: 1px solid rgba(0, 0, 0, 0.08); color: #49636e; font-size: 10px; font-weight: 600; letter-spacing: 4px; text-align: center; overflow: hidden; }
          .engineeringLeadPhoto { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; transition: transform 0.3s ease; }
          .engineeringLeadCard:hover .engineeringLeadPhoto { transform: scale(1.02); }
          .engineeringLeadPlaceholder::before, .engineeringLeadPlaceholder::after { content: ""; position: absolute; width: 22px; height: 22px; border-color: rgba(0, 194, 255, 0.48); border-style: solid; }
          .engineeringLeadPlaceholder::before { top: 14px; right: 14px; border-width: 1px 1px 0 0; }
          .engineeringLeadPlaceholder::after { bottom: 14px; left: 14px; border-width: 0 0 1px 1px; }
          .engineeringLeadContent { flex: 1; padding: 22px 22px 24px; }
          .engineeringLeadNumber { display: block; margin-bottom: 13px; color: #00c2ff; font-size: 10px; font-weight: 600; letter-spacing: 3px; }
          .engineeringLeadCategory { margin: 0 0 9px; color: #5b6470; font-size: 10px; font-weight: 700; letter-spacing: 2px; }
          .engineeringLeadRole { margin: 12px 0 0; color: #00c2ff; font-size: clamp(14px, 1.2vw, 18px); line-height: 1.4; letter-spacing: 1.2px; font-weight: 700; white-space: pre-line; overflow-wrap: anywhere; }
          .engineeringLeadAccent { width: 42px; height: 3px; margin: 16px 0; background: #00c2ff; box-shadow: 0 0 10px rgba(0, 194, 255, 0.65); transition: width 0.3s ease, box-shadow 0.3s ease; }
          .engineeringLeadCard:hover .engineeringLeadAccent { width: 64px; box-shadow: 0 0 14px rgba(0, 194, 255, 0.9); }
          .engineeringLeadName { margin: 0; color: #111111; font-size: clamp(17px, 1.35vw, 20px); line-height: 1.25; font-weight: 800; letter-spacing: 1.8px; overflow-wrap: anywhere; }
          .engineeringLeadDescription { margin: 14px 0 0; color: #4b5563; font-size: 12px; line-height: 1.7; }
          @media (max-width: 1050px) { .engineeringLeadsGrid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 620px) { .mentorLeadership { width: 100%; } .leadershipPair { grid-template-columns: 1fr; } .engineeringLeadsSection { margin-top: 72px; } .engineeringLeadsGrid { grid-template-columns: 1fr; } }
        `}</style>

        <section className="engineeringLeadsSection" aria-labelledby="engineering-leads-heading">
          <div className="engineeringLeadsLabel">03.03 / ENGINEERING LEADS</div>
          <h3 id="engineering-leads-heading" className="engineeringLeadsHeading">ENGINEERING LEADS</h3>
          <p className="engineeringLeadsIntro">Specialized student leads driving the core engineering disciplines of the VELYXION programme.</p>

          <div className="engineeringLeadsGrid">
            <EngineeringLeadCard number="01" category="FABRICATION" role="FABRICATION LEAD" name="MUTHIAH S" description="Leads fabrication activities, manufacturing coordination, component preparation, and workshop execution." photo="/team/muthiah.JPG" alt="Muthiah S - Fabrication Lead" />
            <EngineeringLeadCard number="02" category="DESIGN" role="DESIGN LEAD" name="KARTHI KUMAR S" description="Leads vehicle design development, CAD coordination, component design, and design integration." photo="/team/karthi.JPG" alt="Karthi Kumar S - Design Lead" />
            <EngineeringLeadCard number="03" category="ELECTRICAL" role="ELECTRICAL LEAD" name="HARIHARAN R" description="Leads electrical system development, electrical integration, wiring, and system coordination." photo="/team/hariharan.JPG" alt="Hariharan R - Electrical Lead" />
            <EngineeringLeadCard number="04" category="EMBEDDED" role="EMBEDDED LEAD" name="KAVIN V" description="Leads embedded systems development, electronic control integration, software coordination, and vehicle data systems." photo="/team/kavin.JPG" alt="Kavin V - Embedded Lead" />
            <EngineeringLeadCard number="05" category="SUSPENSION & STEERING" role="SUSPENSION & STEERING LEAD" name="NITHESH M" description="Responsible for suspension geometry, steering systems, setup development, and mechanical integration for vehicle handling." photo="/team/nithesh.JPG" alt="Nithesh M - Suspension & Steering Lead" />
            <EngineeringLeadCard number="13" category="DRIVETRAIN & TRANSMISSION" role="DRIVETRAIN & TRANSMISSION ENGINEER" name="PRAJITH SS" description="Responsible for drivetrain integration, transmission components, mechanical power delivery, and coordination between the motor and driven wheels." photo="/team/prajith.JPG" alt="Prajith SS - Drivetrain & Transmission Engineer" />
            <EngineeringLeadCard number="07" category="FINANCE" role={"FINANCE MANAGER\nMANUFACTURING & ASSEMBLY LEAD"} name="SHARAN S" description="Responsible for project coordination, planning, budgeting, documentation, procurement, and overall team organization." photo="/team/sharan.JPG" alt="Sharan S - Finance Manager and Manufacturing & Assembly Lead" />
            <EngineeringLeadCard number="08" category="BRAKING & VEHICLE DYNAMICS" role="BRAKING & VEHICLE DYNAMICS LEAD" name="ARULJOTHI R" description="Responsible for braking systems, vehicle dynamics analysis, setup optimization, and coordination of braking performance with the chassis and suspension systems." photo="/team/aruljothi.JPG" alt="Aruljothi R - Braking & Vehicle Dynamics Lead" />
            <EngineeringLeadCard number="09" category="BATTERY SYSTEMS" role="BATTERY PACK ENGINEER" name="MAGIZHAN. AT" description="Responsible for battery pack development, integration, and coordination with the vehicle electrical systems." photo="/team/magizhan.JPG" alt="Magizhan. AT - Battery Pack Engineer" />
            <EngineeringLeadCard number="10" category="DESIGN & SIMULATION" role="CAD & SIMULATION ENGINEER" name="BRINDA M" description="Responsible for CAD development, simulation studies, and design analysis across the vehicle systems." photo="/team/DSC09900.JPG" alt="Brinda M - CAD & Simulation Engineer" />
            <EngineeringLeadCard number="11" category="TESTING & VALIDATION" role="TESTING & VALIDATION ENGINEER" name="SHANA AFROSE CM" description="Responsible for test planning, validation activities, results tracking, and engineering verification." photo="/team/shana.JPG" alt="Shana Afrose CM - Testing & Validation Engineer" />
            <EngineeringLeadCard number="12" category="ELECTRICAL SYSTEMS" role="WIRING & TELEMETRY ENGINEER" name="JOSHUA ISRAEL S" description="Responsible for wiring integration, telemetry systems, data capture, and electrical troubleshooting." photo="/team/joshua.JPG" alt="Joshua Israel S - Wiring & Telemetry Engineer" />
          </div>
        </section>
      </div>
    </section>
  );
}

function EngineeringLeadCard({ number, category, role, name, description, photo, alt }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="engineeringLeadCard">
      {!photo || imageFailed ? (
        <div className="engineeringLeadPlaceholder" aria-label={`${role} role placeholder`}>{role}</div>
      ) : (
        <div className="engineeringLeadPlaceholder">
          <img
            className="engineeringLeadPhoto"
            src={photo}
            alt={alt}
            onError={() => setImageFailed(true)}
          />
        </div>
      )}
      <div className="engineeringLeadContent">
        <span className="engineeringLeadNumber">{number}</span>
        <p className="engineeringLeadCategory">{category}</p>
        {name && <p className="engineeringLeadName">{name}</p>}
        <div className="engineeringLeadAccent" />
        <h4 className="engineeringLeadRole">{role}</h4>
        <p className="engineeringLeadDescription">{description}</p>
      </div>
    </article>
  );
}

const cardStyle = {
  position: "relative",
  background: "#f8fafc",
  border: "1px solid rgba(0, 0, 0, 0.10)",
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.04)",
  backdropFilter: "blur(14px)",
  overflow: "hidden",
};

const photoFrameStyle = {
  width: "100%",
  aspectRatio: "1 / 1",
  height: "auto",
  background: "linear-gradient(135deg, rgba(0, 194, 255, 0.05), rgba(255, 255, 255, 0.95))",
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentStyle = { padding: "28px 32px 32px" };
const numberStyle = { color: "#00c2ff", fontSize: "10px", letterSpacing: "4px", fontWeight: "600" };
const roleStyle = { margin: "12px 0 0", color: "#00c2ff", fontSize: "18px", lineHeight: "1.4", letterSpacing: "3px", fontWeight: "700" };
const accentLineStyle = { width: "52px", height: "3px", background: "#00c2ff", boxShadow: "0 0 12px rgba(0, 194, 255, 0.8)", marginBottom: "20px" };
const nameStyle = { color: "#111111", fontSize: "20px", lineHeight: "1.25", letterSpacing: "2px", fontWeight: "800" };
const descriptionStyle = { maxWidth: "480px", margin: "18px 0 0", color: "#4b5563", fontSize: "13px", lineHeight: "1.8" };

export default TeamSection;
