import React from "react";
import Layout from "../components/Layout/Layout";
import IMAGES from "../img/image";
import HowItWorks from "../components/Home/HowItWorks";
import WhatWeDo from "../components/Home/WhatWeDo";
import "./About.css";

const About = () => {
  return (
    <Layout>
      <div className="about-container">
        <h2 className="m-0">About Us</h2>
      </div>
      <div className="about-section">
        <div className="row">
          <div className="center col-12 col-sm-12 col-md-6 col-lg-6">
            <h2>About Us</h2>
            <p>
              The Cakes School, initially rooted in the wholesale bakery goods
              sector, expanded its horizons by venturing into retail with its
              debut outlet in Sangrur. Building upon its wealth of experience,
              the brand took a decisive step towards catering directly to
              consumers, marking a significant milestone in its journey. This
              strategic move not only broadened The Cakes School' market reach
              but also allowed for a more direct and personalized interaction
              with customers, establishing a stronger foothold in the baking
              industry.
            </p>
            <p>
              With a foundation built on expertise in wholesale operations, The
              Cakes School approached its retail endeavor with a commitment to
              quality and customer satisfaction. By blending its extensive
              knowledge of bakery goods with a newfound focus on individual
              consumers, the brand positioned itself as a reliable and
              innovative player in the retail bakery market. This transition not
              only showcased The Cakes School' adaptability but also laid the
              groundwork for continued growth and success in the dynamic world
              of baking.
            </p>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <img src={IMAGES.two} alt="" />
          </div>
          <div className="col-12 mt-5">
            <p>
              Being a baker transcends the conventional image of baking bread
              and cakes; it encompasses both artistry and scientific precision.
              While bakery chefs are often associated with sweet creations,
              their expertise extends to savory delights as well. The career
              prospects for a baker are vast and depend entirely on the
              individual's skill set. Entrepreneurial opportunities abound in
              the baking industry, offering promising career paths for
              professionals with innovative ideas. Investing in a bakery not
              only benefits the local community but also presents lucrative
              opportunities for financial gain.
            </p>
            <p>
              In today's era, desserts, once the highlight of every celebration,
              face skepticism due to concerns about ingredient quality and
              nutritional value. However, baking empowers us to create desserts
              tailored to diverse dietary needs, including diabetic-friendly and
              gluten-free options. This flexibility allows us to cater to the
              preferences of health-conscious customers, ensuring that everyone
              can indulge in delicious treats without compromising their
              well-being. Through baking, we have the freedom to innovate and
              meet the evolving demands of an attentive customer base, enriching
              lives with delightful and wholesome desserts.
            </p>
          </div>
        </div>
      </div>
      <div className="what-w-d">
        <WhatWeDo />
      </div>

      {/* SECTION 2 */}
      <div className="about-section">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
            <img src={IMAGES.three} alt="" />
          </div>
          <div className="center col-12 col-sm-12 col-md-6 col-lg-6">
            <h5>
              "Bakery courses provide diverse opportunities for career growth.
              With well-planned training, aspirants can embark on a journey of
              personal and professional development, laying the groundwork for a
              fulfilling career in the baking industry."
            </h5>
            <p>
              In addition to traditional bakeries, hotels and restaurants
              consistently seek skilled chefs who understand ingredient quality
              and can innovate to enhance their menus. Personalization has
              become a dominant trend in the food industry, fueling the growth
              of home-based bakeries that cater to daily demands. Customers
              appreciate personalized food products, leading to increased
              economic prosperity for these businesses.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
