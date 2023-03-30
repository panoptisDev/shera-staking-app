import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

import Image from "next/image";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import BannerImg from "../public/assets/banner1.png";
const firebaseConfig = {
  apiKey: "AIzaSyC2o7VqIAyI52uje0ep-BAavFom1qBDRyA",
  authDomain: "sheraai.firebaseapp.com",
  projectId: "sheraai",
  storageBucket: "sheraai.appspot.com",
  messagingSenderId: "72831637303",
  appId: "1:72831637303:web:3382285096d6c42fda2cb2",
  measurementId: "G-82L1BZ4J7K",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function SHERAAI() {
  const [inputValue, setInputValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [images, setImages] = useState([]);

  const address = useAddress();

  const [isLoading, setIsLoading] = useState(false);

  const walletAddress = address;

  console.log("wallet address is " + walletAddress);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateImage = async () => {
    setIsLoading(true);
    const value = inputValue.trim();

    console.log("input value inside generateImage is " + value);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/yehiaserag/anime-pencil-diffusion",
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
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`${Date.now()}.png`);
    await imageRef.put(blob);
    const imageUrl = await imageRef.getDownloadURL();
    const prompt = inputValue.trim();
    database
      .ref("users/" + walletAddress + "/" + "images")
      .push({ prompt, imageUrl });

    setIsLoading(false);
  };

  useEffect(() => {
    console.log("in use effect");
    const imagesRef = database.ref("users/" + walletAddress + "/" + "images");
    imagesRef.on("value", (snapshot) => {
      const imageList = [];
      snapshot.forEach((childSnapshot) => {
        const image = childSnapshot.val();
        imageList.unshift({ id: childSnapshot.key, ...image });
      });
      setImages(imageList);
    });
  }, [address]);

  const deleteImage = (id) => {
    database.ref("users/" + walletAddress + "/" + `images/${id}`).remove();
  };

  return (
    <>
      {!address ? (
        <>
          <div className="connect-wallet">
            <ConnectWallet />
          </div>
        </>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="b-img">
              <Image src={BannerImg} alt="" />
            </div>
          </div>
          <div className="custom-search">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="custom-search-input"
              placeholder="Enter Animal Name "
            />
            <button
              onClick={generateImage}
              className="custom-search-botton"
              type="submit"
            >
              Generate Image
            </button>
          </div>
          <div className="info">
            for imagine generation like mid journey use (name , mdjrny-v4 style)
          </div>

          {isLoading ? (
            <div className="loading">Loading... </div>
          ) : (
            console.log("Loading is off")
          )}

          <div className="card-container">
            {images.map((image) => (
              <div key={image.id} className="card">
                <img src={image.imageUrl} alt={image.prompt} />
                <div className="card-body">
                  <p>{image.prompt}</p>
                  <button onClick={() => handleDownload(image.id)}>
                    Download
                  </button>
                  <button onClick={() => deleteImage(image.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default SHERAAI;
