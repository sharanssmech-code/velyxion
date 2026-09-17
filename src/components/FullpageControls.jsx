import React from "react";

function FullpageControls({ current = 0, total = 1, onPrev, onNext }) {
  const padNum = (n) => String(n).padStart(2, "0");
  const currentDisplay = padNum(current + 1);
  const totalDisplay = padNum(total);

  return (
    <div>
      {/* Prev / Next Buttons */}
      <div
        style={{
          position: "fixed",
          left: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
        }}
      >
        <button
          onClick={onPrev}
          aria-label="Previous"
          style={{
            background: "transparent",
            color: "#aab6bd",
            border: "1px solid rgba(170,182,189,0.08)",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          ←
        </button>
      </div>

      <div
        style={{
          position: "fixed",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
        }}
      >
        <button
          onClick={onNext}
          aria-label="Next"
          style={{
            background: "transparent",
            color: "#aab6bd",
            border: "1px solid rgba(170,182,189,0.08)",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>

      {/* Page Counter */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "20px",
          zIndex: 20,
          color: "#aab6bd",
          fontSize: "12px",
          letterSpacing: "2px",
        }}
      >
        {currentDisplay} / {totalDisplay}
      </div>

      {/* Horizontal progress indicator */}
      <div
        style={{
          position: "fixed",
          left: "10%",
          right: "10%",
          bottom: "12px",
          height: "6px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "6px",
          zIndex: 15,
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#00c2ff",
            borderRadius: "6px",
            width: `${((current + 1) / total) * 100}%`,
            transition: "width 0.45s ease",
          }}
        />
      </div>
    </div>
  );
}

export default FullpageControls;
