import { useState } from "react";

function TeamSection() {
  return (
    <section
      id="team"
      style={{
        minHeight: "100vh",
        padding: "140px 8vw",
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "28px" }}>
          <div style={cardStyle}>
            <div className="leadershipPhotoFrame" style={photoFrameStyle}>
              <img className="leadershipPhoto" src="/team/captain.JPG" alt="Captain" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle}>03.01 / TEAM LEADERSHIP</div>
              <h3 style={roleStyle}>CAPTAIN</h3>
              <div style={accentLineStyle} />
              <div style={nameStyle}>THIPPUSULTHAN. A</div>
              <p style={descriptionStyle}>Team leadership, coordination, project direction, and overall execution of the VELYXION programme.</p>
            </div>
          </div>

          <div style={cardStyle}>
            <div className="leadershipPhotoFrame" style={photoFrameStyle}>
              <img className="leadershipPhoto" src="/team/co-captain.JPG" alt="Co-captain" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle}>03.02 / TEAM LEADERSHIP</div>
              <h3 style={roleStyle}>CO-CAPTAIN</h3>
              <div style={accentLineStyle} />
              <div style={nameStyle}>ASWIN. VA</div>
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
          .engineeringLeadRole { margin: 0; color: #111111; font-size: 17px; line-height: 1.25; letter-spacing: 1.5px; font-weight: 700; }
          .engineeringLeadAccent { width: 42px; height: 3px; margin: 16px 0; background: #00c2ff; box-shadow: 0 0 10px rgba(0, 194, 255, 0.65); transition: width 0.3s ease, box-shadow 0.3s ease; }
          .engineeringLeadCard:hover .engineeringLeadAccent { width: 64px; box-shadow: 0 0 14px rgba(0, 194, 255, 0.9); }
          .engineeringLeadName { margin: 0; color: #111111; font-size: 14px; font-weight: 700; letter-spacing: 2px; }
          .engineeringLeadDescription { margin: 14px 0 0; color: #4b5563; font-size: 12px; line-height: 1.7; }
          @media (max-width: 1050px) { .engineeringLeadsGrid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 620px) { .engineeringLeadsSection { margin-top: 72px; } .engineeringLeadsGrid { grid-template-columns: 1fr; } }
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
            <EngineeringLeadCard number="06" category="DRIVETRAIN & TRANSMISSION" role="DRIVETRAIN & TRANSMISSION ENGINEER" name="NAME TO BE ADDED" description="Responsible for drivetrain integration, transmission components, mechanical power delivery, and coordination between the motor and driven wheels." photo="/team/drivetrain.JPG" alt="Drivetrain & Transmission Engineer" />
            <EngineeringLeadCard number="07" category="PROJECT & FINANCE" role="PROJECT & FINANCE MANAGER" name="SHARAN S" description="Responsible for project coordination, planning, budgeting, documentation, procurement, and overall team organization." photo="/team/sharan.JPG" alt="Sharan S - Project & Finance Manager" />
            <EngineeringLeadCard number="08" category="BRAKING & VEHICLE DYNAMICS" role="BRAKING & VEHICLE DYNAMICS LEAD" name="ARULJOTHI R" description="Responsible for braking systems, vehicle dynamics analysis, setup optimization, and coordination of braking performance with the chassis and suspension systems." photo="/team/aruljothi.JPG" alt="Aruljothi R - Braking & Vehicle Dynamics Lead" />
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
        <h4 className="engineeringLeadRole">{role}</h4>
        <div className="engineeringLeadAccent" />
        {name && <p className="engineeringLeadName">{name}</p>}
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
const roleStyle = { margin: "18px 0 14px", fontSize: "28px", letterSpacing: "5px", fontWeight: "600" };
const accentLineStyle = { width: "52px", height: "3px", background: "#00c2ff", boxShadow: "0 0 12px rgba(0, 194, 255, 0.8)", marginBottom: "20px" };
const nameStyle = { color: "#111111", fontSize: "16px", letterSpacing: "3px", fontWeight: "700" };
const descriptionStyle = { maxWidth: "480px", margin: "18px 0 0", color: "#4b5563", fontSize: "13px", lineHeight: "1.8" };

export default TeamSection;
