// import {
//   ThirdwebNftMedia,
//   useAddress,
//   useMetamask,
//   useTokenBalance,
//   useOwnedNFTs,
//   useContract,
// } from "@thirdweb-dev/react";
// import { ThirdwebStorage } from "@thirdweb-dev/storage";
// import { BigNumber, ethers } from "ethers";
// import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
// import { useEffect, useState } from "react";
// import styles from "../styles/Home.module.css";
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import Link from "next/link";

// const Minter = async (props) => {
//   const connectWithMetamask = useMetamask();
//   const address = useAddress();
//   const storage = new ThirdwebStorage();

//   const [walletAddress, setWallet] = useState(address);
//   const [status, setStatus] = useState("");

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [url, setURL] = useState("");
//   const [file, setFile] = useState(null);

//   const onMintPressed = async () => {
//     // const upload = await storage.upload(file);
//     // console.log(storage.resolveScheme(upload));

//     console.log("asa");

//     // const metadata = {
//     //   name: name,
//     //   description: description,
//     //   image: storage.resolveScheme(upload),
//     //   properties: [
//     //     {
//     //       name: "Family",
//     //       value: "Shera",
//     //     },
//     //   ],
//     // };

//     // const uri = await storage.upload(metadata);
//     // console.log(storage.resolveScheme(uri));
//   };

//   // console.log("name is " + name + " description is " + description);
//   return (
// <div className="mt-5rem sc-c14cb99b-0 jmMriM CollectionManager--container CollectionManager--narrow-container">
//   <header className="jSPhMX kKyBpy">
//     <h1 className="fgAoF cyAYwl">Create New Item</h1>
//   </header>
//   <form className="kAnbfl">
//     <p className="fBfnHR">
//       <span className="AssetForm--required-label">*</span>
//       Required fields
//     </p>
//     <div className="jSPhMX kKyBpy vIGHJ">
//       <div className="dULEQL jSPhMX">
//         <div className="dlNkru jSPhMX kKyBpy">
//           <label className="diQTwC eimMfF bQtUXg">
//             Image, Video, Audio, or 3D Model
//           </label>
//           <span className="fBfnHR">
//             File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
//             OGG, GLB, GLTF. Max size: 100 MB
//           </span>
//         </div>
//         <div
//           height="257px"
//           width="597px"
//           className="gytSMI jSPhMX kKyBpy fYgjHJ cmjqwQ hzAKsl"
//         >
//           <input type="file" style={{ display: "none" }} />
//           <i value="image" className="sc-c087d08a-2 RmZZc material-icons">
//             <input
//               type="file"
//               className="border-[1px] p-2 text-lg  w-full nftname"
//               // onChange={(event) => setFile(event.target.files[0])}
//             />
//           </i>
//           <div className="equPFN"></div>
//         </div>
//       </div>
//     </div>
//     <div className="jSPhMX kKyBpy vIGHJ">
//       <div className="dULEQL jSPhMX">
//         <div className="dlNkru jSPhMX kKyBpy">
//           <label className="eimMfF bQtUXg">Name</label>
//         </div>
//         <div className="gjHRNK">
//           <div className="Input--main">
//             <div className="Input--prefix"></div>
//             <input
//               className="Input--input"
//               placeholder="Item name"
//               type="text"
//               // onChange={(event) => setName(event.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="jSPhMX kKyBpy vIGHJ">
//       <div className="dULEQL jSPhMX">
//         <div className="dlNkru jSPhMX kKyBpy">
//           <label className="diQTwC eimMfF gYLcWK">Description</label>
//           <span className="fBfnHR">
//             The description will be included on the item's detail page
//             underneath its image.
//             <a
//               className="fKAlPV"
//               href="https://www.markdownguide.org/cheat-sheet/"
//             >
//               Markdown
//             </a>
//             syntax is supported.
//           </span>
//         </div>
//         <textarea
//           placeholder="Provide a detailed description of your item."
//           className="cEERlm"
//           // onChange={(event) => setDescription(event.target.value)}
//         />
//       </div>
//     </div>
//   </form>
//   <button
//     id="mintButton"
//     type="button"
//     className="mt-5 w-full p-5  text-white text-lg  animate-pulse mintbtn"
//     // onClick={onMintPressed}
//   >
//     Mint NFT
//   </button>
// </div>
//   );
// };

// export default Minter;

import {
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
} from "@thirdweb-dev/react";

import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumber, ethers } from "ethers";
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Link from "next/link";
import { isConstructorDeclaration } from "typescript";
// import fs from 'fs'

const Minter = (props) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const storage = new ThirdwebStorage();

  const [walletAddress, setWallet] = useState(address);
  // const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [file, setFile] = useState(null);

  const [cont, setcont] = useState("");

  const { contract } = useContract(
    "0xe9298649cC20495526B3AaA416869dd9403BE569"
  );

  // useEffect(() => {
  //   async function getbalance_() {
  //     const sdk = new ThirdwebSDK("binance");

  //     setcont(contract);
  //   }

  //   getbalance_();
  // }, []);

  const onMintPressed = async () => {
    const upload = await storage.upload(file);
    // console.log("/ok");
    console.log(storage.resolveScheme(upload));

    const metadata = {
      name: name,
      description: description,
      // Here we add a file into the image property of our metadata
      image: storage.resolveScheme(upload),
      properties: [
        {
          name: "Family",
          value: "Shera",
        },
      ],
    };

    const uri = await storage.upload(metadata);
    console.log(storage.resolveScheme(uri));
    console.log(address);
    const walletAddress = address;

    // const sdk = new ThirdwebSDK("binance");

    // const sdk = ThirdwebSDK.fromSigner(signer, "mumbai")

    // const sdk = ThirdwebSDK.fromSigner(signer, "mainnet");

    // const contract = await sdk.getContract(
    //   "0xe9298649cC20495526B3AaA416869dd9403BE569",
    //   "nft-collection"
    // );

    const cr = await contract?.call(
      "mintTo",
      address,
      storage.resolveScheme(uri)
    );

    // const tx = await contract.mintTo(walletAddress, uri);
    // const receipt = tx.receipt; // the transaction receipt
    // const tokenId = tx.id; // the id of the NFT minted
    // const nft = await tx.data();
  };

  console.log("name is " + name + " description is " + description);

  return (
    <div className="mt-5rem sc-c14cb99b-0 jmMriM CollectionManager--container CollectionManager--narrow-container">
      <header className="jSPhMX kKyBpy">
        <h1 className="fgAoF cyAYwl">Create New Item</h1>
      </header>
      <form className="kAnbfl">
        <p className="fBfnHR">
          <span className="AssetForm--required-label">*</span>
          Required fields
        </p>
        <div className="jSPhMX kKyBpy vIGHJ">
          <div className="dULEQL jSPhMX">
            <div className="dlNkru jSPhMX kKyBpy">
              <label className="diQTwC eimMfF bQtUXg">
                Image, Video, Audio, or 3D Model
              </label>
              <span className="fBfnHR">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </span>
            </div>
            <div
              height="257px"
              width="597px"
              className="gytSMI jSPhMX kKyBpy fYgjHJ cmjqwQ hzAKsl"
            >
              <input type="file" style={{ display: "none" }} />
              <i value="image" className="sc-c087d08a-2 RmZZc material-icons">
                <input
                  type="file"
                  className="border-[1px] p-2 text-lg  w-full nftname"
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </i>
              <div className="equPFN"></div>
            </div>
          </div>
        </div>
        <div className="jSPhMX kKyBpy vIGHJ">
          <div className="dULEQL jSPhMX">
            <div className="dlNkru jSPhMX kKyBpy">
              <label className="eimMfF bQtUXg">Name</label>
            </div>
            <div className="gjHRNK">
              <div className="Input--main">
                <div className="Input--prefix"></div>
                <input
                  className="Input--input"
                  placeholder="Item name"
                  type="text"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="jSPhMX kKyBpy vIGHJ">
          <div className="dULEQL jSPhMX">
            <div className="dlNkru jSPhMX kKyBpy">
              <label className="diQTwC eimMfF gYLcWK">Description</label>
              <span className="fBfnHR">
                The description will be included on the item's detail page
                underneath its image.
                <a
                  className="fKAlPV"
                  href="https://www.markdownguide.org/cheat-sheet/"
                >
                  Markdown
                </a>
                syntax is supported.
              </span>
            </div>
            <textarea
              placeholder="Provide a detailed description of your item."
              className="cEERlm"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
      </form>
      <button
        id="mintButton"
        type="button"
        className="mt-5 w-full p-5  text-white text-lg  animate-pulse mintbtn"
        onClick={onMintPressed}
      >
        Mint NFT
      </button>
    </div>
  );
};

export default Minter;
