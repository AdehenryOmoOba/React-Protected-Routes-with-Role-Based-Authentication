import React from "react";

const MODAL_STYLES = {
  position: "fixed",
  height: "100vh",
  width: "100vw",
  inset: "0rem",
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  rowGap: "4rem",
  justifyContent: "center",
  alignItems: "center",
};

function Modal({ open, children }) {
  if (!open) return null;

  return <div style={MODAL_STYLES}>{children}</div>;
}

export default Modal;
