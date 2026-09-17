function PerformanceSection() {
  return (
    <section
      id="performance"
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
          02.05 / PERFORMANCE
        </div>

        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 76px)",
            margin: "0 0 25px",
            letterSpacing: "4px",
          }}
        >
          PERFORMANCE
        </h2>

        <p
          style={{
            maxWidth: "700px",
            color: "#8e9ba3",
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        >
          Vehicle performance is shaped by the interaction of the
          powertrain, energy system, aerodynamics, controls, tyres,
          chassis, and driver. The parameters below are reserved for
          verified VELYXION vehicle data.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "18px",
            marginTop: "55px",
          }}
        >
          <div style={metricStyle}>
            <span style={numberStyle}>01</span>
            <div style={valueStyle}>—</div>
            <div style={labelStyle}>POWER</div>
            <p style={descriptionStyle}>
              Verified vehicle power specification
            </p>
          </div>

          <div style={metricStyle}>
            <span style={numberStyle}>02</span>
            <div style={valueStyle}>—</div>
            <div style={labelStyle}>TORQUE</div>
            <p style={descriptionStyle}>
              Verified vehicle torque specification
            </p>
          </div>

          <div style={metricStyle}>
            <span style={numberStyle}>03</span>
            <div style={valueStyle}>—</div>
            <div style={labelStyle}>MASS</div>
            <p style={descriptionStyle}>
              Verified vehicle mass specification
            </p>
          </div>

          <div style={metricStyle}>
            <span style={numberStyle}>04</span>
            <div style={valueStyle}>—</div>
            <div style={labelStyle}>TEST DATA</div>
            <p style={descriptionStyle}>
              Performance data to be added after validation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const metricStyle = {
  padding: "30px",
  minHeight: "190px",
  boxSizing: "border-box",
  background: "rgba(5, 12, 16, 0.6)",
  border: "1px solid rgba(0, 194, 255, 0.15)",
  backdropFilter: "blur(10px)",
};

const numberStyle = {
  color: "#00c2ff",
  fontSize: "10px",
  letterSpacing: "2px",
};

const valueStyle = {
  marginTop: "22px",
  fontSize: "42px",
  fontWeight: "600",
  letterSpacing: "3px",
  color: "#ffffff",
};

const labelStyle = {
  marginTop: "8px",
  fontSize: "12px",
  letterSpacing: "3px",
  color: "#00c2ff",
};

const descriptionStyle = {
  margin: "14px 0 0",
  color: "#718089",
  fontSize: "12px",
  lineHeight: "1.6",
};

export default PerformanceSection;