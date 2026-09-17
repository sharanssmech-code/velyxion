import React from "react";

function FullpageControls({ current = 0, total = 1, onPrev, onNext }) {
  const pad = (n) => String(n + 1).padStart(2, "0");

  return (
    <div>
      {/* Prev / Next Buttons */}
      <div
        style={{
          position: "fixed",
          left: "24px",
          bottom: "36px",
          zIndex: 20,
        }}
      >
        <button
          onClick={onPrev}
          style={{
            background: "transparent",
            color: "#aab6bd",
            border: "1px solid rgba(170,182,189,0.08)",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Prev
        </button>
      </div>

      <div
        style={{
          position: "fixed",
          right: "24px",
          bottom: "36px",
          zIndex: 20,
        }}
      >
        <button
          onClick={onNext}
          style={{
            background: "transparent",
            color: "#aab6bd",
            border: "1px solid rgba(170,182,189,0.08)",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>

      {/* Page Counter */}
      <div
        style={{
          position: "fixed",
          right: "50%",
          transform: "translateX(50%)",
          bottom: "18px",
          zIndex: 20,
          color: "#aab6bd",
          fontSize: "12px",
          letterSpacing: "2px",
        }}
      >
        {pad(current)} / {pad(total - 1)}
      </div>

      {/* Vertical progress indicator */}
      <div
        style={{
          position: "fixed",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "60%",
          width: "6px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "6px",
          zIndex: 15,
          display: "flex",
          alignItems: "flex-start",
          padding: "6px",
        }}
      >
        <div
          style={{
            width: "4px",
            background: "#00c2ff",
            borderRadius: "4px",
            transition: "height 0.45s ease",
            height: `${((current + 1) / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default FullpageControls;
