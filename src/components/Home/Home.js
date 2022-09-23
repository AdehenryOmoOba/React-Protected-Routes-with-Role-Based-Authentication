import React from "react";
import { useAuthContext } from "..//../Authorization/AuthProvider";

function Home() {
  const {auth} = useAuthContext()
  const user = auth?.username || 'Guest'
  const capitalisedUser = user[0].toUpperCase() + user.slice(1).toLowerCase()
  return (
    <main>
      <h2>Welcome to HOME Page, {capitalisedUser}! 👋</h2>
    </main>
  );
}

export default Home;
