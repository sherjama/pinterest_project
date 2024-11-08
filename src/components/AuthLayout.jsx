import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
  const [Loader, setLoading] = useState(true);
  const navigate = useNavigate();
  const authstatus = useSelector((state) => state.authStatus.status);

  useEffect(() => {
    const authValue = authstatus === true ? true : false;

    if (authentication && !authValue) {
      navigate("/auth/login");
    } else if (!authentication && authValue) {
      navigate("/home");
    }
    setLoading(false);
  }, []);

  return Loader ? <h1>Loading ....</h1> : <>{children}</>;
}
