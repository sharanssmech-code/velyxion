function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "76px",
        padding: "0 5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 10,
        background: "rgba(255, 255, 255, 0.74)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img
          src="/VELYXION.png"
          alt="VELYXION"
          style={{
            width: "42px",
            height: "42px",
            objectFit: "contain",
          }}
        />

        <span
          style={{
            fontSize: "16px",
            fontWeight: "700",
            letterSpacing: "3px",
            color: "#111111",
          }}
        >
          VELYXION
        </span>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
        }}
      >
        <a href="#home" style={linkStyle}>
          HOME
        </a>

        <a href="#car" style={linkStyle}>
          THE CAR
        </a>

        <a href="#technology" style={linkStyle}>
          TECHNOLOGY
        </a>

        <a href="#team" style={linkStyle}>
          TEAM
        </a>
      </div>

      {/* Contact button */}
      <a
        href="#contact"
        style={{
          background: "transparent",
          color: "#00c2ff",
          border: "1px solid rgba(0, 194, 255, 0.6)",
          padding: "10px 18px",
          fontSize: "11px",
          letterSpacing: "2px",
          cursor: "pointer",
          textDecoration: "none",
          display: "inline-block",
          transition: "all 0.3s ease",
        }}
      >
        CONTACT
      </a>
    </nav>
  );
}

const linkStyle = {
  color: "#111111",
  textDecoration: "none",
  fontSize: "10px",
  letterSpacing: "2px",
  transition: "color 0.3s ease",
};

export default Navbar;