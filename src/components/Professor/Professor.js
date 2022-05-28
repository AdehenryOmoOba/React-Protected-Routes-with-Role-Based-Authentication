import React from "react";
import { useAuthContext } from "../../Authorization/AuthProvider";

function Professor() {
  const { auth } = useAuthContext();

  return (
    <main>
      <p>Hello, {auth} !</p>
      <h2>Welcome to PROFESSORS Page!</h2>
    </main>
  );
}

export default Professor;
