import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import HeroSection from "../components/Home/HeroSection";
import WhatWeDo from "../components/Home/WhatWeDo";
import HomeAbout from "../components/Home/HomeAbout";
import SliderText from "../components/Home/SliderText";
import Courses from "../components/Courses";
import axios from "axios";
import Testimonials from "../components/Home/Testimonial";
import Reviews from "../components/Home/Reviews";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const params = useParams();
  const navigate = useNavigate();

  const getUserData = async () => {
    axios
      .post(
        "/api/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
    if (params.token) {
      localStorage.setItem("token", params.token);
      navigate("/user-dashboard");
    }
  }, []);

  return (
    <Layout>
      <HeroSection />
      <SliderText
        text={
          "Welcome to The Cakes School, where the art of baking meets passion and expertise, curated by Mr. Tarun Pahuja. Join us on a journey of culinary mastery, infused with love and care in every course."
        }
        direction={"left"}
        bg={"#5b2d17"}
        fs={16}
      />
      <Reviews />
      <WhatWeDo />
      <HomeAbout />
      <Courses title={"Our Courses"} />
      <Testimonials />
      {/* <HowItWorks /> */}
    </Layout>
  );
};

export default Home;
