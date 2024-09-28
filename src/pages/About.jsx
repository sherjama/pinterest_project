import React, { useEffect, useState } from "react";
import authservice from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, session } from "../store/authSlice";
import { Account } from "appwrite";
import { useNavigate } from "react-router-dom";

const About = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [obj, setObj] = useState();

  return <div>OAuth2isComplete</div>;
};

export default About;
