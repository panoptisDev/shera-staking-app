import {
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Link from "next/link";
import BackIcon from "../public/icons/BackIcon.png";
import Image from "next/image";
import Balanco from "./balance";
import GetTokenId from "./getTokenId";

import { useRef } from "react";

// const nftDropContractAddress = "0xA9f7A8aE98ad459f239084c18FFB52B112e9003B";
// const tokenContractAddress = "0xe2c5fcf777a2b860921116b275951a50e8135eeb";
// const stakingContractAddress = "0x2877D83377ff3b0192b231203Fa7EC17ee2F69e0";

// const nftCatContractAddress = "0x4C1C65C5b8ac290565988164C58bc9D01252aB3C";
// const nftHorseContractAddress = "0x7D582e6B2654b21EdAC6579d68f1C8E78af6aeDd";
// const nftBearContractAddress = "0x2dB7d08213e0b40ed7f6f0bbdE830b535F986550";

const nftDropContractAddress = "0x68225df7c4df4d82ded8478daa74c2138da1f85b";

const stakingContractAddress = "0x9c8BD882dF4e5DC860a3571E1a9aAbB50b29Ba46";

const nftCatContractAddress = "0x551c03246cc1d5e276f2dc264253decfa9b011c6";
const nftHorseContractAddress = "0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340";
const nftBearContractAddress = "0xe19351a63a094abfc33d12cd1732f7fdd595b520";

const Stake: NextPage = () => {
  // Wallet Connection Hooks
  // const privateKey = "a9989eac22d991004ab35dee67aa78e68070accf4fcdea46a6aefa69adff8f8e";
  // const signer = ethers.Wallet.createRandom();
  // const sdk = ThirdwebSDK.fromSigner(signer, "mainnet");
  // const sdk = useSDK();
  // const sdk = ThirdwebSDK.fromPrivateKey("SecretPrivateKey", "mainnet");
  // const sdk = new ThirdwebSDK("polygon");

  const [claimableRewards1, setClaimableRewards1] = useState < BigNumber > ();

  const [selectval, setselectval] = useState < string > ("0x68225df7c4df4d82ded8478daa74c2138da1f85b");

  const connectWithMetamask = useMetamask();
  const address = useAddress();

  const inputElement = useRef();

  // Contract Hooks
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  const { contract: nftCatDropContract } = useContract(
    nftCatContractAddress,
    "nft-drop"
  );

  const { contract: nftHorseDropContract } = useContract(
    nftHorseContractAddress,
    "nft-drop"
  );

  const { contract: nftBearDropContract } = useContract(
    nftBearContractAddress,
    "nft-drop"
  );
  // const { contract: tokenContract } = useContract(
  //   tokenContractAddress,
  //   "token"
  // );

  const [inputval, setinputval] = useState("");

  const { contract, isLoading } = useContract(stakingContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: ownedCatNfts } = useOwnedNFTs(nftCatDropContract, address);
  const { data: ownedHorseNfts } = useOwnedNFTs(nftHorseDropContract, address);
  const { data: ownedBearNfts } = useOwnedNFTs(nftBearDropContract, address);

  // Load Balance of Token
  // const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  ///////////////////////////////////////////////////////////////////////////
  // Custom contract functions
  ///////////////////////////////////////////////////////////////////////////
  const [stakedNfts, setStakedNfts] = useState < any > ([]);

  const [stakedHorseNfts, setStakedHorseNfts] = useState < any > ([]);
  const [stakedCatNfts, setStakedCatNfts] = useState < any > ([]);
  const [stakedBearNfts, setStakedBearNfts] = useState < any > ([]);

  const [claimableRewards, setClaimableRewards] = useState < BigNumber > ();

  // ----- for aunstronaut ------

  useEffect(() => {
    if (!contract) return;

    // async function getbalance() {
    //   let balan = "0";
    //   // let balan = await sdk.wallet.balance();
    //   setcurrentbal(balan);
    // }

    console.log("input value is " + inputval);

    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {

            const nft = await nftDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedNfts(stakedNfts);
      console.log("setStakedNfts", stakedNfts);
    }

    if (address) {
      loadStakedNfts();
    }
  }, [address, contract, nftDropContract]);

  // ----------for horse----------
  useEffect(() => {
    if (!contract) return;

    async function loadStakedHorseNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedHorseNfts1 = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftHorseDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedHorseNfts(stakedHorseNfts1);
      console.log("setstakedHorseNfts", stakedHorseNfts1);
    }

    if (address) {
      loadStakedHorseNfts();
    }
  }, [address, contract, nftHorseDropContract]);

  // ----------for Cat ----------
  useEffect(() => {
    if (!contract) return;

    async function loadStakedCatNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedCatNfts1 = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftCatDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedCatNfts(stakedCatNfts1);
      console.log("setstakedHorseNfts", stakedCatNfts1);
    }

    if (address) {
      loadStakedCatNfts();
    }
  }, [address, contract, nftCatDropContract]);

  // ----------for Bear ----------
  useEffect(() => {
    if (!contract) return;

    async function loadStakedBearNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedBearNfts1 = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftBearDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedBearNfts(stakedBearNfts1);
      console.log("setstakedHorseNfts", stakedBearNfts1);
    }

    if (address) {
      loadStakedBearNfts();
    }
  }, [address, contract, nftBearDropContract]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
    }

    loadClaimableRewards();
  }, [address, contract]);

  useEffect(() => {
    var autoas = document.getElementById("autom");
    if (autoas) {
      autoas.click();
      console.log("function is calling");
    } else {
      console.log("function is not calling");
    }
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  // Write Functions
  ///////////////////////////////////////////////////////////////////////////
  // async function stakeNft(id: string) {
  //   if (!address) return;

  //   console.log("id is " + id);
  //   const isApproved = await nftDropContract?.isApproved(
  //     address,
  //     stakingContractAddress
  //   );
  //   // If not approved, request approval
  //   if (!isApproved) {
  //     await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
  //   }
  //   const stake = await contract?.call("stake", id);
  // }

  //   const { contract : stakeContract } = useContract(
  //     "0x2877D83377ff3b0192b231203Fa7EC17ee2F69e0"
  // );


  // async function stakeNft(id: bigint) {
  //     if (!address) return;


  //     // props.sndfunct();


  //     console.log("id is " + id + "address selected is " + props.selectval);
  //     const isApproved = await nftDropContract?.isApproved(
  //         address,
  //         stakingContractAddress
  //     );

  //     if (!isApproved) {
  //         await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
  //     }


  //     const stake = await contract?.call("stake", id, props.selectval);

  // }

  async function withdraw(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id, selectval);
  }

  async function claimRewards() {
    const claim = await contract?.call("claimRewards");
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Link href="/">
        <div className="d-flex">
          {/* <img src={`/icons/BackIcon.png`} alt="" /> */}
          <Image src={BackIcon} className="asad" width={50} height={50} />

          {/* <i className="fa fa-arrow-left" aria-hidden="true"></i> */}
          {/* <i className="fa fa-arrow-left"></i> */}

          <h3>Go To Dashboard</h3>
        </div>
      </Link>
      <div
        className={
          !address
            ? styles.container +
            " " +
            styles.stakecontainer +
            " " +
            styles.stakeco
            : styles.container + styles.stakecontainer
        }
      >
        <h1 className={styles.h1}>Stake Your NFTs</h1>

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        {!address ? (
          <button
            className={styles.mainButton}
            id="autom"
            onClick={connectWithMetamask}
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <h2>Your Tokens</h2>

            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {/* {tokenBalance?.symbol} */}
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Your Shera Balance</h3>
                <p className={styles.tokenValue}>
                  <b>
                    <Balanco />
                  </b>
                  {/* <b>{currentbal}</b> */}
                  {/* <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol} */}
                </p>
              </div>
            </div>

            <button
              className={`${styles.mainButton} ${styles.spacerTop}`}
              onClick={() => claimRewards()}
            >
              Claim Rewards
            </button>

            <hr className={`${styles.divider} ${styles.spacerTop}`} />

            <h2>Your Staked NFTs</h2>

            <select
              value={selectval}
              onChange={(e) => setselectval(e.target.value)}
              className="select"
            >
              {/* <option value="0xA9f7A8aE98ad459f239084c18FFB52B112e9003B">Shera Astra</option>
              <option value="0x7D582e6B2654b21EdAC6579d68f1C8E78af6aeDd">Shera Horse</option>
              <option value="0x4C1C65C5b8ac290565988164C58bc9D01252aB3C">Shera Cat</option>
              <option value="0x2dB7d08213e0b40ed7f6f0bbdE830b535F986550">Shera Bear</option> */}

              <option value="0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340">Shera Horse</option>
              <option value="0x551c03246cc1d5e276f2dc264253decfa9b011c6">Shera Cat</option>
              <option value="0x68225df7c4df4d82ded8478daa74c2138da1f85b">Shera Astra</option>
              <option value="0xe19351a63a094abfc33d12cd1732f7fdd595b520">Shera Bear</option>

            </select>

            {/* <h2>Your Staked NFTs</h2>
            <div className={styles.nftBoxGrid}>
              {stakedTokens &&
                stakedTokens[0]?.map((stakedToken: BigNumber) => (
                  <NFTCard
                    tokenId={stakedToken.toNumber()}
                    key={stakedToken.toString()}
                  />
                ))}
            </div> */}

            {/* ------   for anstronat ---- */}
            {/* {selectval === "0x68225df7c4df4d82ded8478daa74c2138da1f85b" ? ( */}
            <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
              {stakedNfts?.map((nft) => (
                <div className="console log" key="12">
                  {nft ? (
                    <div
                      className={styles.nftBox}
                      key={nft.metadata.id.toString()}
                    >
                      {console.log("token id is " + nft.metadata.id)}

                      <h3>{nft.metadata.name}</h3>
                      <ThirdwebNftMedia
                        metadata={nft.metadata}
                        className={styles.nftMedia}
                      />

                      <button
                        className={`${styles.mainButton} ${styles.spacerBottom} ${styles.wi}`}
                        onClick={() => withdraw(nft.metadata.id)}
                      >
                        Withdraw
                      </button>
                      <div key="1"></div>

                    </div>
                  ) : (
                    <div key="1"></div>
                  )}
                </div>
              ))}
            </div>
            {/* ) 
             : (
               console.log("Astra is not calling ")
             )} */}

            {/* ---- for horse ---- */}
            {/* {selectval === "0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340" ? (
              <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
                {stakedHorseNfts?.map((nft) => (
                  <div className="console log" key="12">
                    {nft ? (
                      <div
                        className={styles.nftBox}
                        key={nft.metadata.id.toString()}
                      >
                     
                        <h3>{nft.metadata.name}</h3>
                        <ThirdwebNftMedia
                          metadata={nft.metadata}
                          className={styles.nftMedia}
                        />

                        <button
                          className={`${styles.mainButton} ${styles.spacerBottom} ${styles.wi}`}
                          onClick={() => withdraw(nft.metadata.id)}
                        >
                          Withdraw
                        </button>
                      </div>
                    ) : (
                      <div key="1">{console.log("no staked Horse")}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              console.log("Horse is not calling ")
            )} */}

            {/* ---- for Cat ---- */}
            {/* {selectval === "0x551c03246cc1d5e276f2dc264253decfa9b011c6" ? (
              <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
                {stakedCatNfts?.map((nft) => (
                  <div className="console log" key="12">
                    {nft ? (
                      <div
                        className={styles.nftBox}
                        key={nft.metadata.id.toString()}
                      >
                        <h3>{nft.metadata.name}</h3>
                        <ThirdwebNftMedia
                          metadata={nft.metadata}
                          className={styles.nftMedia}
                        />
                        <button
                          className={`${styles.mainButton} ${styles.spacerBottom} ${styles.wi}`}
                          onClick={() => withdraw(nft.metadata.id)}
                        >
                          Withdraw
                        </button>
                      </div>
                    ) : (
                      <div key="1">{console.log("no staked Cat")}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              console.log("Cat is not calling ")
            )} */}

            {/* ---- for Bear ---- */}
            {/* {selectval === "0xe19351a63a094abfc33d12cd1732f7fdd595b520" ? (
              <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
                {stakedBearNfts?.map((nft) => (
                  <div className="console log" key="12">
                    {nft ? (
                      <div
                        className={styles.nftBox}
                        key={nft.metadata.id.toString()}
                      >
                        <h3>{nft.metadata.name}</h3>
                       
                        <ThirdwebNftMedia
                          metadata={nft.metadata}
                          className={styles.nftMedia}
                        />
                        <button
                          className={`${styles.mainButton} ${styles.spacerBottom} ${styles.wi}`}
                          onClick={() => withdraw(nft.metadata.id)}
                        >
                          Withdraw
                        </button>
                      </div>
                    ) : (
                      <div key="1">{console.log("no staked Bear")}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              console.log("Bear is not calling ")
            )} */}

            <hr className={`${styles.divider} ${styles.spacerTop}`} />

            <GetTokenId />

            <h2 className="t-text">
              How To Get Token ID
            </h2>
            <img className="t-img" src="https://gateway.pinata.cloud/ipfs/QmcFxvmVYYq5D9VfhCQ4VbRzMJUc5rJZafuxU9fqZV9xaz?_gl=1*1or7kmj*_ga*MTM0NzM3MDM2OC4xNjczNjQ0MzY4*_ga_5RMPXG14TE*MTY3NTYwMjU1OC44LjEuMTY3NTYwMjU3MC40OC4wLjA." alt="" /> */}
          </>
        )}
      </div>

    </>
  );
};

export default Stake;
