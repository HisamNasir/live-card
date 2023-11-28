import React, { useEffect, useState } from "react";
import Image from "next/image";
import LeftArrow from "@/public/Assets/leftarrow.svg";
import RightArrow from "@/public/Assets/rightarrow.svg";
import Avav from "@/public/Assets/avav.svg";
import LikeR from "@/public/Assets/liked.svg";
import LikeW from "@/public/Assets/like.svg";
import ShareBtn from "@/public/Assets/share.svg";
import CountdownTimer from "./CountdownTimer";
import ProgressBar from "./ProgressBar";

const Carousel = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const DeadLine = new Date(Date.parse(new Date()) + 60 * 24 * 60 * 60 * 1000);
  const [likedCards, setLikedCards] = useState([]);
  
  useEffect(() => {
    // Initialize likedCards state from local storage
    const storedLikedCards = JSON.parse(localStorage.getItem('likedCards')) || [];
    setLikedCards(storedLikedCards);
  }, []); // Empty dependency array means this effect runs once after the initial render

  const NextArrow = () => (
    <button
      className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 flex items-center justify-center mr-4 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:opacity-90 hover:outline-none focus:text-white focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      onClick={() => setActiveSlide((activeSlide + 1) % data.length)}
    >
      <Image
        src={RightArrow}
        className="w-5 h-5"
        alt=""
        width={50}
        height={50}
      />
    </button>
  );

  const PrevArrow = () => (
    <button
      className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 flex items-center justify-center ml-4 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:opacity-90 hover:outline-none focus:text-white focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      onClick={() =>
        setActiveSlide((activeSlide - 1 + data.length) % data.length)
      }
    >
      <Image
        src={LeftArrow}
        className="w-5 h-5"
        alt=""
        width={50}
        height={50}
      />
    </button>
  );

  const customDots = data.map((_, index) => (
    <span
      key={index}
      className={`mx-1 w-[14px] h-[2px] ${
        index === activeSlide ? "bg-[#be9f56]" : "bg-white"
      }`}
      onClick={() => setActiveSlide(index)}
    ></span>
  ));
  const handleLikeClick = () => {
    const updatedLikedCards = likedCards.includes(activeSlide)
      ? likedCards.filter((index) => index !== activeSlide)
      : [...likedCards, activeSlide];
    setLikedCards(updatedLikedCards);
    localStorage.setItem("likedCards", JSON.stringify(updatedLikedCards));
  };

  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this card!",
          text: "Discover something amazing.",
          url: window.location.href,
        });
      } else {
        alert("Web Share API is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="relative">
      <div className="w-[454px] h-[615px] relative">
        {data.map((card, index) => (
          <div
            key={index}
            className={`${
              index === activeSlide ? "block" : "hidden"
            } w-[454px] h-[615px] relative overflow-hidden`}
          >
            <div className="absolute z-10 w-full mt-2">
              <CountdownTimer endDate={DeadLine} />
              <div className=" w-full flex gap-2 justify-end">
                <button className="p-4" onClick={handleShareClick}>
                <Image src={ShareBtn} alt="" />
                </button>
                <button className="py-4 pr-8" onClick={handleLikeClick}>
                  {likedCards.includes(activeSlide) ? (
                    <>
                      <div role="img" aria-label="Heart Icon">
                        <Image src={LikeR} alt="" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div role="img" aria-label="Heart Icon">
                        <Image src={LikeW} alt="" />
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="h-[547px] rounded-3xl">
            <img
                src={card.imageUrl}
                className="object-cover w-full h-[547px] rounded-3xl  "
                alt="Card Image"
              />
              <div className="absolute top-0 left-0 w-full h-full gradient-overlay-top "></div>
              <div className="absolute top-0 left-0 w-full h-full gradient-overlay-bottom"></div>
              </div>
            <div className="absolute bottom-0 inset-0 flex flex-col justify-end h-[547px] space-y-4 text-white px-5 py-2">
              <div className="mb-7">
                <div className="flex justify-center mb-1 items-end h-full">
                  {customDots}
                </div>
                <p className="text-xs tracking-[2px] [word-spacing:2px] leading- text-center">
                  {card.label}
                </p>
              </div>
              <div className="absolute z-10 right-[118px] bottom-4">
              <ProgressBar progress={card.progress} />
              </div>

              <div className="relative">
                <div className="flex flex-col items-center">
                  <h1 className="text-[14px] flex items-end tracking-widest text-center">
                    {card.pricetop}
                  </h1>
                  <div className="text-[7px] flex items-end tracking-widest text-center">
                    {card.ticketcode}
                  </div>
                </div>
                <div className="absolute bottom-1 flex justify-between items-end px-1 w-full">
                  <Image
                    src={Avav}
                    className="w-[69px] max-h-[40px] flex items-end"
                    alt=""
                    width={50}
                    height={50}
                  />
                  <Image
                    src={card.brandlogoUrl}
                    className="w-[70px] max-h-[40px] flex items-end"
                    alt=""
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
            <div className="h-[58px] w-full absolute bottom-0 rounded-3xl bg-black">
              <div className="relative">
                <div className="text-[19px] font-light uppercase tracking-widest px-5 translate-y-2 absolute text-white w-full h-full border-spacing-6 grid grid-cols-2">
                  <div className="ml-8 mt-2">{card.pricebot}</div>
                  <div className=" relative leading-5 mt-2">
                    <div className=" text-[19px] mr-8  font-light uppercase tracking-widest flex items-end justify-end">
                      {card.ticket}
                    </div>
                    <div className=" text-[9px] absolute right-0 flex items-end justify-end">
                      {card.ticketcode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PrevArrow />
      <NextArrow />
      <style jsx>{`
        .gradient-overlay-top {
          position: absolute;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8) 15%,
            rgba(0, 0, 0, 0) 40%
          );
          width: 100%;
          height: 547px;
          border-radius: 24px;
          pointer-events: none;
        }

        .gradient-overlay-bottom {
          position: absolute;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.85) 10%,
            rgba(0, 0, 0, 0) 40%
          );
          width: 100%;
          height: 547px;
          border-radius: 24px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
