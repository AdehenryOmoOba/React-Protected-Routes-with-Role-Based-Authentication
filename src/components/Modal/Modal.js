import React, { useState, useEffect } from "react";

const MODAL_STYLES = {
  position: "fixed",
  inset: "0rem",
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 50,
  display: "grid",
  placeItems: "center",
};

const BUTTON_STYLES = {
  backgroundColor: "blueViolet",
  display: "grid",
  placeItems: "center",
  padding: "1rem 2rem",
  color: "#ffffff",
  borderRadius: "0.5rem",
  zIndex: 60,
};

function Modal({ open, closeModal, children }) {
  if (!open) return null;

  return (
    <div style={MODAL_STYLES}>
      {children}
      <button style={BUTTON_STYLES} onClick={closeModal}>
        Modal
      </button>
    </div>
  );
}

export default Modal;
