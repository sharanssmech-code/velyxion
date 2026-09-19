function PowertrainSection() {
  return (
    <section
      id="powertrain"
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
          02.01 / POWERTRAIN
        </div>

        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 76px)",
            margin: "0 0 25px",
            letterSpacing: "4px",
          }}
        >
          POWERTRAIN
        </h2>

        <p
          style={{
            maxWidth: "650px",
            color: "#4b5563",
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        >
          The electric powertrain is at the heart of the VELYXION
          race car, integrating electrical power, motor control,
          and drivetrain systems into one performance-focused platform.
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
            <h3 style={titleStyle}>MOTOR</h3>
            <p style={textStyle}>
              Vehicle propulsion system
            </p>
          </div>

          <div style={cardStyle}>
            <span style={numberStyle}>02</span>
            <h3 style={titleStyle}>INVERTER</h3>
            <p style={textStyle}>
              Electrical power control
            </p>
          </div>

          <div style={cardStyle}>
            <span style={numberStyle}>03</span>
            <h3 style={titleStyle}>DRIVETRAIN</h3>
            <p style={textStyle}>
              Power delivery to the wheels
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

export default PowertrainSection;