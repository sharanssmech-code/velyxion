function EnergySection() {
  return (
    <section
      id="energy"
      style={{
        minHeight: "100vh",
        padding: "120px 8vw",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <div
          style={{
            color: "#00c2ff",
            fontSize: "11px",
            letterSpacing: "4px",
            marginBottom: "18px",
          }}
        >
          02.02 / ENERGY SYSTEM
        </div>

        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 76px)",
            margin: "0 0 25px",
            letterSpacing: "4px",
          }}
        >
          ENERGY SYSTEM
        </h2>

        <p
          style={{
            maxWidth: "650px",
            color: "#4b5563",
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        >
          The energy system manages the electrical power required
          to operate the vehicle, combining energy storage,
          battery management, and electrical protection.
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

            <h3 style={titleStyle}>BATTERY</h3>

            <p style={textStyle}>
              High-voltage energy storage
            </p>
          </div>

          <div style={cardStyle}>
            <span style={numberStyle}>02</span>

            <h3 style={titleStyle}>BMS</h3>

            <p style={textStyle}>
              Battery monitoring and management
            </p>
          </div>

          <div style={cardStyle}>
            <span style={numberStyle}>03</span>

            <h3 style={titleStyle}>SAFETY</h3>

            <p style={textStyle}>
              Electrical protection and isolation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const cardStyle = {
  padding: "28px",
  minHeight: "150px",
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

export default EnergySection;