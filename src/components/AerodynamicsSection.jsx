function AerodynamicsSection() {
  return (
    <section
      id="aerodynamics"
      style={{
        minHeight: "100vh",
        padding: "120px 8vw",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <div
          style={{
            color: "#00c2ff",
            fontSize: "11px",
            letterSpacing: "4px",
            marginBottom: "18px",
          }}
        >
          02.04 / AERODYNAMICS
        </div>

        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 76px)",
            margin: "0 0 25px",
            letterSpacing: "4px",
          }}
        >
          AERODYNAMICS
        </h2>

        <p
          style={{
            maxWidth: "700px",
            color: "#4b5563",
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        >
          Aerodynamic development focuses on managing airflow around
          the vehicle to support stability, efficiency, and predictable
          vehicle behaviour. The system combines aerodynamic surfaces,
          airflow management, and structural integration.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
            marginTop: "55px",
          }}
        >
          <div style={cardStyle}>
            <span style={numberStyle}>01</span>

            <h3 style={titleStyle}>AERO SURFACES</h3>

            <p style={textStyle}>
              Wings and aerodynamic elements designed to manage airflow
              around the vehicle.
            </p>
          </div>

          <div style={cardStyle}>
            <span style={numberStyle}>02</span>

            <h3 style={titleStyle}>AIRFLOW</h3>

            <p style={textStyle}>
              Analysis of airflow behaviour around the vehicle and its
              aerodynamic components.
            </p>
          </div>

          <div style={cardStyle}>
            <span style={numberStyle}>03</span>

            <h3 style={titleStyle}>INTEGRATION</h3>

            <p style={textStyle}>
              Aerodynamic components integrated with the vehicle's
              mechanical and structural systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const cardStyle = {
  padding: "28px",
  minHeight: "170px",
  boxSizing: "border-box",
  background: "#f8fafc",
  border: "1px solid rgba(0, 0, 0, 0.10)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
  backdropFilter: "blur(10px)",
};

const numberStyle = {
  color: "#00c2ff",
  fontSize: "10px",
  letterSpacing: "2px",
};

const titleStyle = {
  margin: "18px 0 10px",
  fontSize: "18px",
  letterSpacing: "3px",
  color: "#111111",
};

const textStyle = {
  margin: 0,
  color: "#4b5563",
  fontSize: "13px",
  lineHeight: "1.6",
};

export default AerodynamicsSection;