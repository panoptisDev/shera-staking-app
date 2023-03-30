import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Balanco from "./balance";
import BigNumber from "bignumber.js";

import { useRouter } from "next/router";

// import { BigNumber, ethers } from "ethers";

const Landing = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const router = useRouter();

  const [value, setValue] = useState("");

  const [model, setmodel] = useState(1);

  function SetModel(id) {
    setmodel(id);
  }

  const myInteger = parseInt(value, 10);
  console.log("balance is " + value);
  console.log("balance in integer is " + myInteger);

  // ----- modal box ----
  const [isOpen, setIsOpen] = useState(false);

  const handleImageLoad = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const generateImage = async () => {
    setIsLoading(true);
    const value = inputValue.trim();

    console.log("input value inside generateImage is " + value);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: value,
        }),
      }
    );
    const blob = await response.blob();
    // const storageRef = firebase.storage().ref();
    // const imageRef = storageRef.child(`${Date.now()}.png`);
    // await imageRef.put(blob);
    // const imageUrl = await imageRef.getDownloadURL();
    // const prompt = inputValue.trim();
    const imageSrc = URL.createObjectURL(blob);
    setImageSrc(imageSrc);
    setIsLoading(false);
    handleImageLoad();
  };

  return (
    <div className="Landing">
      {isOpen && (
        <div className="modal-box">
          <div className="modal-content">
            <div className="image-detail">Image Details</div>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={imageSrc} alt="loading" />
            <div className="image-detail basic-model">Basic Model</div>
          </div>
        </div>
      )}
      <center>
        <h2 className="shera-text">Create. SHERAAI is that simple</h2>
        <Balanco onValueChange={setValue} />
      </center>

      <div className="d-flex input-search">
        <textarea
          type="text"
          className="search inputField style-qOJRo"
          value={inputValue}
          placeholder="high quality intricate concept art of the moon (by Akihiko Yoshida)"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          id="style-qOJRo"
          // defaultValue={
          //   "an ultra detailed matte painting of the quaint mystical city of istanbul, grid shaped city cobblestone streets, fantasy city, light snowfall, wind, inspiring ottoman architecture, ultrawide lense, aerial photography, unreal engine, exquisite detail, 8k, art by greg rutkowski and alphonse mucha\n"
          // }
        />
        <button className="ripple-button Home_searchButton__RV6Zb sc">
          <span className="content" onClick={generateImage}>
            <img
              src="https://nowai.ai/_next/image?url=%2Fimagg%2Farrow.png&w=128&q=75"
              width={55}
              height={35}
              className="Home_logo__27_tb style-LMIUA"
              id="style-LMIUA"
            />
          </span>
        </button>
      </div>
      {isLoading ? (
        <div className="loading l-loading">Loading... </div>
      ) : (
        console.log("Loading is off")
      )}

      <div className="d-flex models">
        <span
          className={
            model == 1
              ? "Home_option__QMUcQ Home_selected__nlXOJ"
              : "Home_option__QMUcQ"
          }
          onClick={() => {
            SetModel(1);
          }}
        >
          Style Models
        </span>
        <span
          className={
            model == 2
              ? "Home_selected__nlXOJ Home_option__QMUcQ"
              : "Home_option__QMUcQ"
          }
          onClick={() => {
            SetModel(2);
          }}
        >
          Suggested Prompts
        </span>
        <span
          className={
            model == 3
              ? "Home_selected__nlXOJ Home_option__QMUcQ d-n"
              : "Home_option__QMUcQ d-n"
          }
          onClick={() => {
            SetModel(3);
          }}
        >
          Gallery
        </span>
      </div>

      <div className="mainsection">
        {model == 1 ? (
          <div className="Home_option-content__8H3v6 d-flex gap-3">
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1 Home_selected__nlXOJ d-flex flex-column">
                <img
                  src="https://nowai.ai/_next/image?url=%2Fimagg%2Fbasic.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-Wehfh"
                  id="style-Wehfh"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center Home_selected__nlXOJ">
                Basic 1:1
                <img src="https://nowai.ai/imagg/check.png" />
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1  Home_disabled__jP87C">
                <span
                  className={
                    myInteger < 1000000
                      ? "disabled_model"
                      : "disabled_model enable_model"
                  }
                  onClick={
                    myInteger >= 1000000
                      ? () => {
                          router.push("/Anime");
                        }
                      : undefined // Or null, depending on your preference
                  }
                >
                  <span>
                    Hold 10M $SHERAAI
                    <br />
                    <br />
                    or
                    <br />
                    <br />
                    subscribe to SHERAAI Pro to unlock
                  </span>
                </span>
                <img
                  src="https://nowai.ai/_next/image?url=%2Fimagg%2Fanime.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-rFrbi"
                  id="style-rFrbi"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center ">
                Anime 9:16
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1  Home_disabled__jP87C">
                <span
                  className={
                    myInteger < 1000000
                      ? "disabled_model"
                      : "disabled_model enable_model"
                  }
                >
                  <span>
                    Hold 10M $SHERAAI
                    <br />
                    <br />
                    or
                    <br />
                    <br />
                    subscribe to SHERAAI Pro to unlock
                  </span>
                </span>
                <img
                  src="https://nowai.ai/_next/image?url=%2Fimagg%2Frealism.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-cffp1"
                  id="style-cffp1"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center ">
                Realism 9:16
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1  Home_disabled__jP87C">
                <span
                  className={
                    myInteger < 1000000
                      ? "disabled_model"
                      : "disabled_model enable_model"
                  }
                  onClick={
                    myInteger >= 1000000
                      ? () => {
                          router.push("/Realism");
                        }
                      : undefined // Or null, depending on your preference
                  }
                >
                  <span>
                    Hold 10M $SHERAAI
                    <br />
                    <br />
                    or
                    <br />
                    <br />
                    subscribe to SHERAAI Pro to unlock
                  </span>
                </span>
                <img
                  src="https://nowai.ai/_next/image?url=%2Fimagg%2Fnowai.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-BGmz3"
                  id="style-BGmz3"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center ">
                SHERAAI 16:9
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1  Home_disabled__jP87C">
                <span
                  className={
                    myInteger < 1000000
                      ? "disabled_model"
                      : "disabled_model enable_model"
                  }
                  onClick={
                    myInteger >= 1000000
                      ? () => {
                          router.push("/Anime");
                        }
                      : undefined // Or null, depending on your preference
                  }
                >
                  <span>
                    Hold 30M $SHERAAI
                    <br />
                    <br />
                    or
                    <br />
                    <br />
                    subscribe to SHERAAI Pro to unlock
                  </span>
                </span>
                <img
                  src="https://nowai.ai/_next/image?url=%2Faniwai%2F1.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-obs1P"
                  id="style-obs1P"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center ">
                Aniwai 1:1
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1  Home_disabled__jP87C">
                <span
                  className={
                    myInteger < 1000000
                      ? "disabled_model"
                      : "disabled_model enable_model"
                  }
                  onClick={
                    myInteger >= 1000000
                      ? () => {
                          router.push("/Anime");
                        }
                      : undefined // Or null, depending on your preference
                  }
                >
                  <span>
                    Hold 30M $SHERAAI
                    <br />
                    <br />
                    or
                    <br />
                    <br />
                    subscribe to SHERAAI Pro to unlock
                  </span>
                </span>
                <img
                  src="https://nowai.ai/_next/image?url=%2Faniwai%2F2.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-Bwbik"
                  id="style-Bwbik"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center ">
                Aniwai 9:16
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1  Home_disabled__jP87C">
                <span
                  className={
                    myInteger < 10000000000
                      ? "disabled_model"
                      : "disabled_model enable_model"
                  }
                  onClick={
                    myInteger >= 1000000
                      ? () => {
                          router.push("/Anime");
                        }
                      : undefined // Or null, depending on your preference
                  }
                >
                  <span>
                    Hold 30M $SHERAAI
                    <br />
                    <br />
                    or
                    <br />
                    <br />
                    subscribe to SHERAAI Pro to unlock
                  </span>
                </span>
                <img
                  src="https://nowai.ai/_next/image?url=%2Faniwai%2F3.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-NdkEY"
                  id="style-NdkEY"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center ">
                Aniwai 16:9
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="Home_card___LpL1">
                <img
                  src="https://nowai.ai/_next/image?url=%2Fimagg%2Fsushi.png&w=1920&q=75"
                  width={710}
                  height={540}
                  className="Home_image-card__Z_sYP style-XJ2Bk"
                  id="style-XJ2Bk"
                />
              </div>
              <div className="Home_card-title__vaIhU text-center">Drawai</div>
            </div>
          </div>
        ) : (
          console.log("1 is not actice")
        )}

        {model == 2 ? (
          <div className="SuggestedPrompts">
            <div className="Home_suggest__fH5ii d-flex gap-3">
              <div className="d-flex flex-column">
                <img
                  src="https://nowai.ai/_next/image?url=%2Fimagg%2Florem.png&w=750&q=75"
                  width={710}
                  height={540}
                  className="Home_image-suggest__QiOj_ style-BVz1v"
                  id="style-BVz1v"
                />
              </div>
              <div className="d-flex w-100 flex-column gap-3">
                <div className="my-4 c-t-c t-i">Click to copy</div>
                <div className="Home_cards-title__tUowp text-center ">
                  <div className="Home_long-card__RLaJm">
                    a futuristic cyberpunk city + floating city in the air +
                    suspended city in the air + with a big eclipse in the sky +
                    hypermaximalist + epic + cool + amazing + octane render +
                    ambient oclusion + 8k + bright colors + vivid colors +
                    colorful style
                  </div>
                </div>
                <div className="Home_cards-title__tUowp text-center ">
                  <div className="Home_long-card__RLaJm">
                    an ultra detailed matte painting of the quaint mystical city
                    of istanbul, grid shaped city cobblestone streets, fantasy
                    city, light snowfall, wind, inspiring ottoman architecture,
                    ultrawide lense, aerial photography, unreal engine,
                    exquisite detail, 8k, art by greg rutkowski and alphonse
                    mucha
                  </div>
                </div>
                <div className="Home_cards-title__tUowp text-center ">
                  <div className="Home_long-card__RLaJm">
                    drawing of An abandoned city that was heavily damaged in an
                    ancient war. The city is overgrown with jungle and the
                    camera is high above the city, looking down
                  </div>
                </div>
                <div className="mt-3 Home_pop__CY3_A t-i cat">
                  Category :
                  <span className="cho active Home_selected__nlXOJ">City,</span>
                  <span className="cho ">Hero,</span>
                  <span className="cho ">Space,</span>
                  <span className="cho ">Potrait,</span>
                  <span className="cho ">Robot,</span>
                  <span className="cho ">House,</span>
                  <span className="cho ">Car</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          console.log("2 is not actice")
        )}

        {model == 3 ? (
          <div className="Gallery">
            <div className="w-100 d-flex mt-3 justify-content-center op-op">
              <div className="Home_sec1__XihOH">
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-7D1oz"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-DUH5d"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-VUKUf"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-UA3ci"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-KelHp"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-WJyo1"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-4aIfV"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-BoFmb"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-2g3A5"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-ZNq3B"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-FbaI6"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-hXdNM"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-vfDo9"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-3LO9o"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-Dd7Hg"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-v3c3R"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-ppoik"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-Ioa1w"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-3i62O"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-2t5lY"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f  Home_box1__wKD0u      style-csowx"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box1__wKD0u      style-2yxd1"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Home_sec1__XihOH">
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-UX4XQ"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-s3tL5"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-pGxo5"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-n4qHb"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-7yImQ"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-b51KY"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-ADLhj"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-Ko3n7"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-ioNjP"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-IG6s9"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-IREoV"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-f6CsO"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-sibhb"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-VaR3V"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-7w8xX"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-noaZL"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-PBKJf"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-zp7lk"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-sSJPm"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-XzkzX"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-s4TEO"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box2__OJ1gy       style-s5rzo"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Home_sec1__XihOH ">
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-cWl12"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-m8i5z"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-hUDin"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-YWbpq"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-tm2Qf"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-VGtgV"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-tP2oO"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-XvPj5"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-FBbPN"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-4BmgC"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-hPZDH"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-7kv7M"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-gSXNx"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-EE9tx"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-kaJQo"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-IlWjP"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-Z1isZ"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-ajtf3"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-22Jpq"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-QfASC"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-BhqSX"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box3__1OKtc       style-sLwwZ"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Home_sec1__XihOH ">
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-zWJKh"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-TZcwv"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-vBBEt"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-JcoUT"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-9DqG9"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-ngBJS"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-aoKzg"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-QUrDx"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-Dfwoe"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-hQy14"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-ejiq5"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-63j8w"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-1itLw"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-Yy9H6"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-oTqYB"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-elNXx"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-vOZoP"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-qrTsU"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-qpLx9"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-wnUiY"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-xxyI7"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="Home_box__v3E2f Home_box4__TEDyd       style-UfOLp"
                  id="gallery-photo"
                >
                  <div className="Home_x__EBJZB"></div>
                  <div className="Home_abs-like__iC8fq">
                    <div className="Home_text__upzyl">
                      <i className="ri-heart-fill Home_ooyea__WNBg1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          console.log("3 is not actice")
        )}
      </div>

      <div className="promembership">
        <div className="Home_center__4BFgC">
          <div className="d-flex flex-column align-items-center">
            <img
              src="https://academy-public.coinmarketcap.com/srd-optimized-uploads/7069c272f2674cdca227c22283e9b908.jpeg"
              width={710}
              height={540}
              className="style-iJjRK"
              id="style-iJjRK"
            />
            <button className="ripple-button Home_glow_button__B6_U9 glow mt-5 membership ms-5">
              <span className="content">BUY PRO MEMBERSHIP</span>
            </button>
          </div>
          <div className="ctx">
            <img
              src="https://nowai.ai/imagg/nowai_pro.png"
              className="Home_pro__tMgWg"
            />
            <div className="Home_card_gray__QEpOT">
              <div className="Home_month__YfegS">
                $9
                <span className="Home_p__4qyJX">99</span>/ month
              </div>
              <div className="mt-4 Home_text_pro__8G_nF d-flex gap-2">
                <img
                  className="Home_check__G1jDm Home_active__YzwIj"
                  src="https://nowai.ai/imagg/check-red.png"
                />
                4 AI Models with Unique Styles
              </div>
              <div className="mt-4 Home_text_pro__8G_nF d-flex gap-2">
                <img
                  className="Home_check__G1jDm Home_active__YzwIj"
                  src="https://nowai.ai/imagg/check-red.png"
                />
                Unlimited AI Image Generations
              </div>
              <div className="mt-4 Home_text_pro__8G_nF d-flex gap-2">
                <img
                  className="Home_check__G1jDm Home_active__YzwIj"
                  src="https://nowai.ai/imagg/check-red.png"
                />
                Unlimited Enhance
              </div>
              <div className="mt-4 Home_text_pro__8G_nF d-flex gap-2">
                <img
                  className="Home_check__G1jDm Home_active__YzwIj"
                  src="https://nowai.ai/imagg/check-red.png"
                />
                Extra Powerful Settings
              </div>
              <div className="mt-4 Home_text_pro__8G_nF d-flex gap-2">
                <img
                  className="Home_check__G1jDm Home_active__YzwIj"
                  src="https://nowai.ai/imagg/check-red.png"
                />
                Remove Watermarks
              </div>
              <div className="mt-4 Home_text_pro__8G_nF d-flex gap-2">
                <img
                  className="Home_check__G1jDm Home_active__YzwIj"
                  src="https://nowai.ai/imagg/check-red.png"
                />
                Priority Generation Queue
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Airevolution">
        <div className="Home_center__4BFgC">
          <img
            src="https://nowai.ai/_next/image?url=%2Fimagg%2Fhome.png&w=1920&q=75"
            width={350}
            className="style-UNPin"
            id="style-UNPin"
          />
          <div className="Home_text-home_right__qX0HZ ctx">
            <div className="Home_title__T09hD fl">
              Be at the frontline of the AI revolution
            </div>
            <div className="Home_child_title__VSGqN">
              Unlock limitless possibilities with
              <span className="Home_b__EFp3k">NOWAI</span>
              .Expand your creative horizons with amazing products made by our
              in-house team of
              <span className="Home_b__EFp3k">Machine Learning Engineers</span>
              and
              <span className="Home_b__EFp3k">AI Specialists</span>. Try our
              flagship product WAI on your favorite platform
            </div>
            <div className="Home_join_title__hBbaj">
              <div className="d-flex gap-3 align-items-center Home_jj__xug2F">
                Available on:
                <div className="d-flex gap-3">
                  <div className="Home_teleBg__4ck3H Home_teleBgX__wyneu">
                    <img
                      src="https://nowai.ai/_next/image?url=%2Ftelegram.png&w=128&q=75"
                      width={64}
                      height={64}
                      className="Home_tele__oHh6f Home_teleX__NdHZP style-BV8cq"
                      id="style-BV8cq"
                    />
                  </div>
                  <div className="Home_teleBg__4ck3H Home_web__sjSip position-relative">
                    <img
                      src="https://nowai.ai/_next/image?url=%2Fweb.png&w=128&q=75"
                      width={64}
                      height={64}
                      className="Home_tele__oHh6f style-83jEt"
                      id="style-83jEt"
                    />
                  </div>
                  <div className="Home_teleBg__4ck3H Home_dc__7eCBG position-relative">
                    <img
                      src="https://nowai.ai/_next/image?url=%2Fdiscord.png&w=128&q=75"
                      width={64}
                      height={64}
                      className="Home_tele__oHh6f style-Nypwg"
                      id="style-Nypwg"
                    />
                    <span className="text_footer">Coming soon</span>
                  </div>
                  <div className="Home_teleBg__4ck3H Home_ps__Yf7am  position-relative">
                    <img
                      src="https://nowai.ai/_next/image?url=%2Fps.png&w=128&q=75"
                      width={64}
                      height={64}
                      className="Home_tele__oHh6f style-Cpvdl"
                      id="style-Cpvdl"
                    />
                    <span className="text_footer">Coming soon</span>
                  </div>
                  <div className="Home_teleBg__4ck3H Home_ps__Yf7am position-relative">
                    <img
                      src="https://nowai.ai/_next/image?url=%2Fapple.png&w=128&q=75"
                      width={64}
                      height={64}
                      className="Home_tele__oHh6f style-ylk9N"
                      id="style-ylk9N"
                    />
                    <span className="text_footer">Coming soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="percentage">
        <div
          id="mouse-parallax-container"
          className="Home_center__4BFgC style-m2niV"
        >
          <div className="ctr">
            
            <div className="Home_child_title__VSGqN">
              Join SHERAAI's thriving worldwide community and secure your
              ownership in the future of AI by holding $SHERAAI
            </div>
            <div className="Home_join_title__hBbaj">
              <h1 className="text-start p2 p1">1%</h1>
              <span>of LP token burned to 0xDEAD</span>
              <h1 className="text-start p2 p1 mt-3">1%</h1>
              <span className=" w-100 op">
                of tax will be going to team wallet
              </span>
              <h1 className="text-start p2 p1 mt-3">1%</h1>
              <span className="text-start w-100 op">
                of tax will be going to pay GPU cluster
              </span>
              <h1 className="text-start p2 p100 mt-3">100%</h1>
              <span>of token locked and burned</span>
              <div className="d-flex gap-3 align-items-center mt-5 Home_qq__toFR4 Home_contract__MdAqV">
                0x987441856BA4f463544FC68ccBF6a80F434a7956
                <div className="Home_copy__nHQc3">
                  <img
                    src="https://nowai.ai/imagg/save.png"
                    onClick={() =>
                      copyToClipboard(
                        "0x987441856BA4f463544FC68ccBF6a80F434a7956"
                      )
                    }
                  />
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
          <div id="style-BKJsM" className="style-BKJsM">
            <img
              src="https://nowai.ai/imagg/diamond.svg"
              width={1000}
              height={1000}
              className="Home_diamond__Ounnj style-Lh1VD"
              id="style-Lh1VD"
            />
          </div>
        </div>
      </div> */}

      <div className="stake">
        <div className="Home_center__4BFgC">
          <div className="Home_card-gray__p59aP d-flex gap-5 px-3 py-3 flex-column stake">
            <div className="d-flex justify-content-between ">
              <span className="titles">Next Payout</span>
              <span>~ ETH</span>
            </div>
            <div className="d-flex justify-content-between ">
              <span className="titles">Total Staked</span>
              <span>0 $SHERAAI</span>
            </div>
            <div className="d-flex justify-content-between ">
              <span className="titles">ETH EARNED</span>
              <span>0.00</span>
            </div>
            <button className="ripple-button Home_glow_button__B6_U9 glow ">
              <span className="content">STAKE NOW</span>
            </button>
          </div>
          <div className="Home_text-home_right__qX0HZ ctx ctv">
            <div className="Home_title__T09hD">Revenue share staking</div>
            <div className="Home_child_title__VSGqN">
              <span className="Home_b__EFp3k">Participate</span>
              in the revenue generated by all our AI ventures.
              <span className="Home_b__EFp3k">30%</span>
              of all
              <span className="Home_b__EFp3k">revenue</span>
              produced by our
              <span className="Home_b__EFp3k">
                platform, ads, partnerships, NFTs and future products
              </span>
              we release will be sent to the
              <span className="Home_b__EFp3k">staking</span>
              contract. Every
              <span className="Home_b__EFp3k">week</span>
              the staking contract will
              <span className="Home_b__EFp3k">distribute</span>
              100% of the funds in it to all stakers with a weight
              <span className="Home_b__EFp3k">based on staking time</span>
              and
              <span className="Home_b__EFp3k">staking amount</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
