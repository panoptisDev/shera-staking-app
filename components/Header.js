import React from "react";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";

import Navbar from "./Nav";

export const Header = () => {
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
      <div className="main-header">
        <div className="dBIOSm container">
          <a href="#" className>
            <div className="soLxR logo" width={40}>
              <img
                src="https://nftify-platform.s3.ap-southeast-1.amazonaws.com/logo/62d170f22994a0bed7213b80-1658926016888.png"
                className
              />
            </div>
          </a>
          <div className="container-right">
            <div className="search-bar">
              <span className="ant-input-group-wrapper ant-input-search">
                <span className="ant-input-group">
                  <input
                    placeholder="Search"
                    className="ant-input snipcss0-5-8-9"
                    type="text"
                    defaultValue=""
                  />
                  <span className="ant-input-group-addon">
                    <button
                      type="button"
                      className="ant-btn ant-btn-primary ant-input-search-button"
                    >
                      <div className="ant-image">
                        <img
                          className="ant-image-img snipcss0-8-12-13"
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjE2Njc1IDEuNjY2OTlDMTMuMzA4OSAxLjY2Njk5IDE2LjY2NjcgNS4wMjQ4NiAxNi42NjY3IDkuMTY2OTlDMTYuNjY2NyAxMC45Mzc2IDE2LjA1MzIgMTIuNTY1IDE1LjAyNyAxMy44NDhMMTguMDg5MyAxNi45MTExQzE4LjQxNDggMTcuMjM2NSAxOC40MTQ4IDE3Ljc2NDEgMTguMDg5MyAxOC4wODk2QzE3Ljc4ODkgMTguMzkgMTcuMzE2MiAxOC40MTMxIDE2Ljk4OTMgMTguMTU4OUwxNi45MTA4IDE4LjA4OTZMMTMuODQ3NyAxNS4wMjcyQzEyLjU2NDcgMTYuMDUzNCAxMC45Mzc0IDE2LjY2NyA5LjE2Njc1IDE2LjY2N0M1LjAyNDYxIDE2LjY2NyAxLjY2Njc1IDEzLjMwOTEgMS42NjY3NSA5LjE2Njk5QzEuNjY2NzUgNS4wMjQ4NiA1LjAyNDYxIDEuNjY2OTkgOS4xNjY3NSAxLjY2Njk5Wk05LjE2Njc1IDMuMzMzNjZDNS45NDUwOSAzLjMzMzY2IDMuMzMzNDEgNS45NDUzMyAzLjMzMzQxIDkuMTY2OTlDMy4zMzM0MSAxMi4zODg3IDUuOTQ1MDkgMTUuMDAwMyA5LjE2Njc1IDE1LjAwMDNDMTIuMzg4NCAxNS4wMDAzIDE1LjAwMDEgMTIuMzg4NyAxNS4wMDAxIDkuMTY2OTlDMTUuMDAwMSA1Ljk0NTMzIDEyLjM4ODQgMy4zMzM2NiA5LjE2Njc1IDMuMzMzNjZaIiBmaWxsPSIjNTY1MjZBIi8+Cjwvc3ZnPgo="
                        />
                      </div>
                    </button>
                  </span>
                </span>
              </span>
            </div>
            <div className="right">
              <ul
                className="ant-menu ant-menu-horizontal ant-menu-light"
                tabIndex={0}
              >
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <button className="active" onClick={home}>
                      <div>Home</div>
                    </button>
                  </span>
                </li>
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <button className onClick={Stake}>
                      <div>Stake</div>
                    </button>
                  </span>
                </li>
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <a className href="https://shera-minting.vercel.app/">
                      <div>Mint</div>
                    </a>
                  </span>
                </li>

                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <button className onClick={Chatbot}>
                      <div>ChatBot</div>
                    </button>
                  </span>
                </li>

                {!address ? (
                  <li className="ant-menu-item" tabIndex={-1}>
                    <span className="loginbtn">
                      <button
                        className="ripple-button Home_glow_button__B6_U9 bpm headbtn"
                        onClick={LOGIN}
                      >
                        <span className="">LOGIN</span>
                      </button>
                    </span>
                  </li>
                ) : undefined}
              </ul>
              <div style={{ display: "none" }}></div>

              <div
                className="ant-image"
                style={{ width: "50px" }}
                onClick={Profile}
              >
                <img
                  className="ant-image-img snipcss0-4-39-40"
                  src="https://media.architecturaldigest.com/photos/5f241de2c850b2a36b415024/master/w_1600%2Cc_limit/Luke-logo.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-for-mobile">
        <Navbar />
      </div>
    </>
  );
};
