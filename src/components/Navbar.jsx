function Navbar({ navigateTo }) {
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
        background: "rgba(3, 6, 9, 0.55)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 194, 255, 0.12)",
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
        <a
          href="#home"
          style={linkStyle}
          onClick={(e) => {
            if (navigateTo) {
              e.preventDefault();
              navigateTo("home");
            }
          }}
        >
          HOME
        </a>

        <a
          href="#car"
          style={linkStyle}
          onClick={(e) => {
            if (navigateTo) {
              e.preventDefault();
              navigateTo("car");
            }
          }}
        >
          THE CAR
        </a>

        <a
          href="#technology"
          style={linkStyle}
          onClick={(e) => {
            if (navigateTo) {
              e.preventDefault();
              navigateTo("technology");
            }
          }}
        >
          TECHNOLOGY
        </a>

        <a
          href="#team"
          style={linkStyle}
          onClick={(e) => {
            if (navigateTo) {
              e.preventDefault();
              navigateTo("team");
            }
          }}
        >
          TEAM
        </a>
      </div>

      {/* Contact button */}
      <button
        style={{
          background: "transparent",
          color: "#00c2ff",
          border: "1px solid rgba(0, 194, 255, 0.6)",
          padding: "10px 18px",
          fontSize: "11px",
          letterSpacing: "2px",
          cursor: "pointer",
        }}
      >
        CONTACT
      </button>
    </nav>
  );
}

const linkStyle = {
  color: "#aab6bd",
  textDecoration: "none",
  fontSize: "10px",
  letterSpacing: "2px",
  transition: "color 0.3s ease",
};

export default Navbar;