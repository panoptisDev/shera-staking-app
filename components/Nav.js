import React, { useState } from "react";

import { useRouter } from "next/router";

import { useAddress } from "@thirdweb-dev/react";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const router = useRouter();

  function Chatbot() {
    router.push("/ChatBot");
  }

  const address = useAddress();

  function home() {
    router.push("/");
  }

  function Stake() {
    router.push("/stake");
  }

  function Profile() {
    router.push("/Profile");
  }

  function LOGIN() {
    router.push("/Login");
  }
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <img
            src="https://nftify-platform.s3.ap-southeast-1.amazonaws.com/logo/62d170f22994a0bed7213b80-1658926016888.png"
            className=""
          />
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul className="navbar">
            <li>
              <button onClick={home}>Home</button>
            </li>
            <li>
              <button onClick={Stake}>Stake</button>
            </li>
            <li>
              <button href="https://shera-market-nft.com/box-event">
                Mint
              </button>
            </li>
            <li>
              <button onClick={Chatbot}>ChatBot</button>
            </li>
            <li>
              {!address ? (
                <li className="ant-menu-item blog-btn" tabIndex={-1}>
                  <span className="loginbtn">
                    <button
                      className="ripple-button Home_glow_button__B6_U9 bpm headbtn"
                      onClick={LOGIN}
                    >
                      <span className="m-login-btn">LOGIN</span>
                    </button>
                  </span>
                </li>
              ) : undefined}
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          {/* <ul className="social-media-desktop">
            <li>
              <a
                href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                target="_thapa">
                <FaFacebookSquare className="facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thapatechnical/"
                target="_thapa">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                target="_thapa">
                <FaYoutubeSquare className="youtube" />
              </a>
            </li>
          </ul> */}

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <img
                src="https://theclubappe-asad-ghouri.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhamburger.bd56af02.png&w=96&q=75"
                width={60}
                height={40}
              />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
