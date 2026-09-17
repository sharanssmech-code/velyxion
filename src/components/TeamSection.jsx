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
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* SECTION LABEL */}
        <div
          style={{
            color: "#00c2ff",
            fontSize: "11px",
            letterSpacing: "5px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          03 / THE PEOPLE
        </div>

        {/* TITLE */}
        <h2
          style={{
            margin: "0 0 25px",
            fontSize: "clamp(48px, 7vw, 86px)",
            letterSpacing: "8px",
            fontWeight: "700",
            lineHeight: "1",
          }}
        >
          THE TEAM
        </h2>

        {/* INTRO */}
        <p
          style={{
            maxWidth: "650px",
            color: "#8e9ba3",
            lineHeight: "1.8",
            fontSize: "15px",
            margin: "0 0 60px",
          }}
        >
          Meet the student leaders behind VELYXION, driving the
          project through collaboration, engineering, and continuous
          development.
        </p>

        {/* TEAM CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "28px",
          }}
        >
          {/* CAPTAIN */}
          <div style={cardStyle}>
            <div style={photoFrameStyle}>
              <img
                src="/team/captain.JPG"
                alt="Captain"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={contentStyle}>
              <div style={numberStyle}>
                03.01 / TEAM LEADERSHIP
              </div>

              <h3 style={roleStyle}>
                CAPTAIN
              </h3>

              <div style={accentLineStyle} />

              <div style={nameStyle}>
                THIPPUSULTHAN. A
              </div>

              <p style={descriptionStyle}>
                Team leadership, coordination, project direction,
                and overall execution of the VELYXION programme.
              </p>
            </div>
          </div>

          {/* CO-CAPTAIN */}
          <div style={cardStyle}>
            <div style={photoFrameStyle}>
              <img
                src="/team/co-captain.JPG"
                alt="Co-captain"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={contentStyle}>
              <div style={numberStyle}>
                03.02 / TEAM LEADERSHIP
              </div>

              <h3 style={roleStyle}>
                CO-CAPTAIN
              </h3>

              <div style={accentLineStyle} />

              <div style={nameStyle}>
                ASWIN. VA
              </div>

              <p style={descriptionStyle}>
                Supporting team leadership, coordination, technical
                collaboration, and project execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CARD */
const cardStyle = {
  position: "relative",
  background: "rgba(3, 10, 15, 0.72)",
  border: "1px solid rgba(0, 194, 255, 0.55)",
  boxShadow:
    "0 0 30px rgba(0, 194, 255, 0.05), inset 0 0 30px rgba(0, 194, 255, 0.025)",
  backdropFilter: "blur(14px)",
  overflow: "hidden",
};

/* PHOTO */
const photoFrameStyle = {
  width: "100%",
  height: "360px",
  background:
    "linear-gradient(135deg, rgba(0, 194, 255, 0.06), rgba(2, 6, 10, 0.95))",
  borderBottom: "1px solid rgba(0, 194, 255, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const placeholderStyle = {
  color: "#49636e",
  fontSize: "10px",
  letterSpacing: "5px",
  fontWeight: "600",
};

/* CONTENT */
const contentStyle = {
  padding: "28px 32px 32px",
};

const numberStyle = {
  color: "#00c2ff",
  fontSize: "10px",
  letterSpacing: "4px",
  fontWeight: "600",
};

const roleStyle = {
  margin: "18px 0 14px",
  fontSize: "28px",
  letterSpacing: "5px",
  fontWeight: "600",
};

const accentLineStyle = {
  width: "52px",
  height: "3px",
  background: "#00c2ff",
  boxShadow: "0 0 12px rgba(0, 194, 255, 0.8)",
  marginBottom: "20px",
};

const nameStyle = {
  color: "#e7edf0",
  fontSize: "16px",
  letterSpacing: "3px",
  fontWeight: "700",
};

const descriptionStyle = {
  maxWidth: "480px",
  margin: "18px 0 0",
  color: "#819099",
  fontSize: "13px",
  lineHeight: "1.8",
};

export default TeamSection;