import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedin = useSelector(state => state.isLoggedin);

  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      sendRequest().then((data) => {
        if (data) {
          setUser(data);
        }
        setLoading(false);
      });
    }
  }, [isLoggedin]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {user ? (
            <>
              <h1>Welcome, {user.firstName}!</h1>
              {user.image ? (
                <img src={`http://localhost:3000/${user.image}`} alt="Profile" />
              ) : (
                <p>No profile image available</p>
              )}
            </>
          ) : (
            "User not found"
          )}
        </>
      )}
    </div>
  );
}
