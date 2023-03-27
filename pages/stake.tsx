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

// import { ConnectWallet } from "@thirdweb-dev/react";

const nftDropContractAddress = "0x68225df7c4df4d82ded8478daa74c2138da1f85b";

const stakingContractAddress = "0x272E4D319CD8d63d3FE882E091f11059c15183F3";

const nftCatContractAddress = "0x551c03246cc1d5e276f2dc264253decfa9b011c6";
const nftHorseContractAddress = "0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340";
const nftBearContractAddress = "0xe19351a63a094abfc33d12cd1732f7fdd595b520";

const Stake: NextPage = () => {
  const [claimableRewards1, setClaimableRewards1] = useState<BigNumber>();

  const [selectval, setselectval] = useState<string>("0x68225df7c4df4d82ded8478daa74c2138da1f85b");

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

  const [inputval, setinputval] = useState("");

  const { contract, isLoading } = useContract(stakingContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: ownedCatNfts } = useOwnedNFTs(nftCatDropContract, address);
  const { data: ownedHorseNfts } = useOwnedNFTs(nftHorseDropContract, address);
  const { data: ownedBearNfts } = useOwnedNFTs(nftBearDropContract, address);

  const [stakedNfts, setStakedNfts] = useState<any>([]);

  const [stakedHorseNfts, setStakedHorseNfts] = useState<any>([]);
  const [stakedCatNfts, setStakedCatNfts] = useState<any>([]);
  const [stakedBearNfts, setStakedBearNfts] = useState<any>([]);

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  const [multiplyValue, setmultiplyValue] = useState<BigNumber>();



  // ----- for aunstronaut ------

  useEffect(() => {
    if (!contract) return;



    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      // setbg(new BigNumber(0));
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const as = stakedToken.tokenId.toNumber();
            if (as != 0) {
              const nft = await nftDropContract?.get(stakedToken.tokenId);
              return nft;
            }
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
      const stakedTokens = await contract?.call("getStakedHorseTokens", address);


      const stakedHorseNfts1 = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const as = stakedToken.tokenId.toNumber();
            if (as != 0) {
              const nft = await nftHorseDropContract?.get(stakedToken.tokenId);
              return nft;
            }
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
      const stakedTokens = await contract?.call("getStakedCatTokens", address);

      const stakedCatNfts1 = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            if (stakedToken.tokenId) {
              const as = stakedToken.tokenId.toNumber();
              if (as != 0) {
                const nft = await nftCatDropContract?.get(stakedToken.tokenId);
                return nft;
              }
            }
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
      const stakedTokens = await contract?.call("getStakedBearTokens", address);

      const stakedBearNfts1 = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const as = stakedToken.tokenId.toNumber();
            if (as != 0) {
              const nft = await nftBearDropContract?.get(stakedToken.tokenId);
              return nft;
            }
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
      var cr = await contract?.call("availableRewards", address);
      // cr = cr * 100;
      // cr = cr.toString();
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
        <div className="d-flex1">
          <Image src={BackIcon} className="asad" width={50} height={50} />

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

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        {!address ? (
          <>
            {/* <button
              className={styles.mainButton}
              id="autom"
              onClick={connectWithMetamask}
            >
              Connect Wallet
            </button> */}
            <ConnectWallet accentColor="#f213a4" colorMode="dark" />
          </>
        ) : (
          <>
            <h2>WALLET BALANCE</h2>

            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 9)}
                    {/* : ethers.utils.formatUnits(claimableRewards, 11)} */}
                    {/* :
                       ethers.utils.mul} */}
                    {/* } */}
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

            <h2 className="uc">Your Staked NFTs</h2>

            <select
              value={selectval}
              onChange={(e) => setselectval(e.target.value)}
              className="select"
            >

              <option value="0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340">Shera Horse</option>
              <option value="0x551c03246cc1d5e276f2dc264253decfa9b011c6">Shera Cat</option>
              <option value="0x68225df7c4df4d82ded8478daa74c2138da1f85b">Shera Astra</option>
              <option value="0xe19351a63a094abfc33d12cd1732f7fdd595b520">Shera Bear</option>

            </select>


            {/* ------   for anstronat ---- */}
            {selectval === "0x68225df7c4df4d82ded8478daa74c2138da1f85b" ? (
              <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
                {stakedNfts?.map((nft: any) => (
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
            )
              : (
                console.log("Astra is not calling ")
              )}

            {/* ---- for horse ---- */}
            {selectval === "0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340" ? (
              <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
                {stakedHorseNfts?.map((nft: any) => (
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
            )}

            {/* ---- for Cat ---- */}
            {selectval === "0x551c03246cc1d5e276f2dc264253decfa9b011c6" ? (
              <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
                {stakedCatNfts?.map((nft: any) => (
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
            )}

            {/* ---- for Bear ---- */}
            {selectval === "0xe19351a63a094abfc33d12cd1732f7fdd595b520" ? (
              <div className={styles.nftBoxGrid + " " + styles.imgcenter}>
                {stakedBearNfts?.map((nft: any) => (
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
            )}

            <hr className={`${styles.divider} ${styles.spacerTop}`} />

            <GetTokenId />

          </>
        )}
      </div>

    </>
  );
};

export default Stake;
