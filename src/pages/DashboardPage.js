import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const logout = async (e) => {
    e.preventDefault();

    await fetch(process.env.REACT_APP_API_URL + "/auth/logout", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn === false) navigate("/");
      });
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/user/getUser", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.isLoggedIn === true) {
          setUser(data.user);
        } else {
          navigate("/");
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <div> This is Dashboard Panel. Development in progress!!</div>
      ) : (
        <div>
          This is Dashboard page, User is logged in
          <div>User Email: {user}</div>
          <button className="underline" onClick={logout}>
            Logout
          </button>
          {/* <Link to="/profile">View Profile</Link> */}
        </div>
      )}
    </>
  );
}

export default DashboardPage;
