import Layout from "../components/Layout/Layout";
import HowItWorks from "../components/Home/HowItWorks";
import HeroSection from "../components/Home/HeroSection";
import Courses from "../components/Courses";
import "./CoursePage.css";

const CoursePage = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="phone-skin-product-container">
        <Courses title={"Our Courses"} />
      </div>
      {/* <HowItWorks /> */}
    </Layout>
  );
};

export default CoursePage;
