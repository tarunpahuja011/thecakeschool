import React from "react";
import Slider from "react-slick";
import IMAGES from "../../img/image";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import "./Testimonials.css";

const Testimonials = () => {
  const agents = [
    {
      id: "1",
      name: "Sanjay",
      desc: "The Cakes School is a delightful haven for budding bakers! Their informative and enjoyable classes taught me to craft a divine chocolate cake that wowed even my toughest family critics. Highly recommended for anyone seeking culinary inspiration!",
    },
    {
      id: "2",
      name: "Akansha",
      desc: "Attending classes at The Cakes School was a game-changer for me. The instructors are skilled professionals who patiently guide you through each step of the cake-making process. Thanks to them, I can now confidently bake cakes that look and taste like they're straight out of a bakery!",
    },
    {
      id: "3",
      name: "Priyanka",
      desc: "I've always been intimidated by the idea of baking cakes from scratch, but The Cakes School made it seem like a piece of cake (pun intended)! Their hands-on approach and attention to detail helped me overcome my fears and discover a newfound passion for baking.",
    },
    {
      id: "4",
      name: "Aarti",
      desc: "As someone with dietary restrictions, I was thrilled to find that The Cakes School offers classes catering to various dietary needs. I attended their gluten-free cake workshop and was blown away by the delicious results. Kudos to the instructors for accommodating different preferences!",
    },
    {
      id: "5",
      name: "Sakshi",
      desc: "The Cakes School not only teaches you how to bake cakes but also how to decorate them like a pro. I never knew I had a knack for cake decorating until I enrolled in their classes. Now, I love experimenting with different designs and seeing the joy on people's faces when they see my creations!",
    },
    {
      id: "6",
      name: "Abhishek",
      desc: "I've taken classes at other baking schools before, but none compare to The Cakes School. The instructors here are not only knowledgeable but also passionate about what they do. Their enthusiasm is contagious, and it's impossible not to leave their classes feeling inspired and eager to bake.",
    },
    {
      id: "7",
      name: "Chirag",
      desc: "If you're looking to take your baking skills to the next level, look no further than The Cakes School. Their comprehensive curriculum covers everything from basic cake recipes to advanced decorating techniques. Whether you're a beginner or a seasoned baker, there's something for everyone here.",
    },
    {
      id: "8",
      name: "Sonali",
      desc: "I recently attended a cake decorating workshop at The Cakes School, and it was a game-changer for me. I learned so many new techniques that I never would have thought of on my own. Plus, the small class size allowed for plenty of one-on-one attention from the instructor. I can't wait to put my new skills.",
    },
    {
      id: "9",
      name: "Divya",
      desc: "The Cakes School exceeded all my expectations! Not only did I learn how to bake delicious cakes, but I also gained valuable insights into the science behind baking. Understanding the why behind each step helped me become a more confident and competent baker.",
    },
    {
      id: "10",
      name: "Khushi",
      desc: "Enrolling in classes at The Cakes School was one of the best decisions I've ever made. Not only did I learn a new skill, but I also made new friends who share my passion for baking. The sense of camaraderie among students and instructors alike made the whole experience truly unforgettable.",
    },
  ];

  var settings = {
    dots: true,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="testimonials-container">
      <span className="text-center d-block m-auto">
        <span className="text-green">
          <small>
            <b>Testimonials</b>
          </small>
        </span>
        <h4>What Our Student Say About Us</h4>
      </span>
      <div className="testimonial-slider">
        <Slider {...settings}>
          {agents?.map((agent, index) => {
            return (
              <div key={index} className="testimonial">
                <div className="testimonial-content">
                  <h5>{agent.name}</h5>
                  <span>
                    <small>{agent.desc}</small>
                  </span>
                  <FormatQuoteIcon className="icon" />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
