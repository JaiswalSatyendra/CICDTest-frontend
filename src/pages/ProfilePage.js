import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
    async function isLoggedIn() {
      await fetch(process.env.REACT_APP_API_URL + "/user/isLoggedIn", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.isLoggedIn === false) navigate("/login");
        })
        .catch((err) => console.log(err));
    }

    isLoggedIn();
  });

  useEffect(() => {}, []);

  const resetPassword = async (e) => {
    e.preventDefault();
    await fetch(process.env.REACT_APP_API_URL + "/password/reset", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "fail") console.log(data.message);
      });

    setOldPassword("");
    setNewPassword("");
  };

  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <div>
          Profile Page
          <h3>Reset Password</h3>
          <form onSubmit={resetPassword}>
            <div>
              <label htmlFor="oldPassword">Old Password: </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                autoComplete="off"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPassword">New newPassword: </label>
              <input
                type="text"
                name="newPassword"
                id="newPassword"
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
