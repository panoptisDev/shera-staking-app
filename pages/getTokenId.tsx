import React from "react";
import {
    ThirdwebNftMedia,
    useMetamask,
    useTokenBalance,
    useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";

import styles from "../styles/Home.module.css";
import { parse } from "path";

import StakeFunction from "./stakeFunction";
import { NFT } from "@thirdweb-dev/sdk";
import { text } from "stream/consumers";
// import console from "console";

const GetTokenId: NextPage = () => {
    const address = useAddress();

    const [claimableRewards, setClaimableRewards] = useState<any>();

    const [selectval, setselectval] = useState<string>("0x68225df7c4df4d82ded8478daa74c2138da1f85b");

    const [tokenId, settokenId] = useState<bigint>();

    const [inputval, setinputval] = useState("0");

    const [cr, setcr] = useState<object>({})


    const [DataValue, setDataValue] = useState("0");




    const nftDropContractAddress = "0x68225df7c4df4d82ded8478daa74c2138da1f85b";
    const stakingContractAddress = "0x272E4D319CD8d63d3FE882E091f11059c15183F3";

    const nftCatContractAddress = "0x551c03246cc1d5e276f2dc264253decfa9b011c6";
    const nftHorseContractAddress = "0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340";
    const nftBearContractAddress = "0xe19351a63a094abfc33d12cd1732f7fdd595b520";

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



    const { contract } = useContract(
        "0x272E4D319CD8d63d3FE882E091f11059c15183F3"
    );

    // const { data, isLoading } = useContractRead(contract, "tokenByIndex", inputval)

    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
    const { data: ownedCatNfts } = useOwnedNFTs(nftCatDropContract, address);
    const { data: ownedHorseNfts } = useOwnedNFTs(nftHorseDropContract, address);
    const { data: ownedBearNfts } = useOwnedNFTs(nftBearDropContract, address);



    const { contract: stakeContract } = useContract(
        "0x272E4D319CD8d63d3FE882E091f11059c15183F3"
    );


    async function stakeNft(id: string) {
        if (!address) return;


        const isApproved = await nftDropContract?.isApproved(
            address,
            stakingContractAddress
        );

        if (!isApproved) {
            await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
        }


        const stake = await contract?.call("stake", id, selectval);

    }


    async function stakeCatNft(id: string) {
        if (!address) return;


        const isApproved = await nftCatDropContract?.isApproved(
            address,
            stakingContractAddress
        );

        if (!isApproved) {
            await nftCatDropContract?.setApprovalForAll(stakingContractAddress, true);
        }


        const stake = await contract?.call("stake", id, selectval);

    }

    async function stakeHorseNft(id: string) {
        if (!address) return;


        const isApproved = await nftHorseDropContract?.isApproved(
            address,
            stakingContractAddress
        );

        if (!isApproved) {
            await nftHorseDropContract?.setApprovalForAll(stakingContractAddress, true);
        }


        const stake = await contract?.call("stake", id, selectval);

    }

    async function stakeBearNft(id: string) {
        if (!address) return;


        const isApproved = await nftBearDropContract?.isApproved(
            address,
            stakingContractAddress
        );

        if (!isApproved) {
            await nftBearDropContract?.setApprovalForAll(stakingContractAddress, true);
        }


        const stake = await contract?.call("stake", id, selectval);

    }

    const delay = (ms: number | undefined) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    async function sendindex() {

        // console.log("send index")

        // const cr = await contract?.call("tokenByIndex", inputval);


        // delay(5000);
        // console.log("cr");

        // console.log(cr);
        // setClaimableRewards(cr)
        // console.log("claimableRewards");
        // console.log(claimableRewards);

        // const asa = data._hex.toString();

        // const asa2 = BigInt(asa);

        // console.log(asa2);
        // settokenId(asa2);

        // console.log("inside sendindex function" + tokenId)

        // delay(15000);
        // const asa = cr._hex.toString();

        // const asa2 = BigInt(asa);

        // console.log(asa2);
        // settokenId(asa2);

    }

    // function GetTokenValue() {

    // console.log("asaas")
    // setDataValue(data._hex)
    // var inp = document.getElementById("inputd")
    // if (inp) {

    // }
    // }

    return (
        <div>
            <div className={styles.buttonContainer}>
                <h2 className="uc">Stake Your Unstaked NFTs</h2>
            </div>

            <div className={styles.buttonContainer}>
                <select value={selectval} onChange={e => setselectval(e.target.value)} className='select'>
                    <option value="0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340">Shera Horse</option>
                    <option value="0x551c03246cc1d5e276f2dc264253decfa9b011c6">Shera Cat</option>
                    <option value="0x68225df7c4df4d82ded8478daa74c2138da1f85b">Shera Astra</option>
                    <option value="0xe19351a63a094abfc33d12cd1732f7fdd595b520">Shera Bear</option>
                </select>
            </div>
            {/* ------   for anstronat ---- */}
            {selectval === "0x68225df7c4df4d82ded8478daa74c2138da1f85b" ? (
                <>
                    {/* <h2>Your Unstaked NFTs</h2> */}
                    <div className={styles.nftBoxGrid}>
                        {ownedNfts?.map((nft) => (
                            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft.metadata.name}</h3>
                                {/* <Web3Button
                                    contractAddress={stakingContractAddress}
                                    action={() => stakeNft(nft.metadata.id)}
                                >
                                    Stake
                                </Web3Button> */}
                                <button
                                    // contractAddress={stakingContractAddress}
                                    className={`${styles.mainButton} ${styles.spacerTop}`}
                                    onClick={() => stakeNft(nft.metadata.id)}
                                >
                                    Stake
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                console.log("Astra is not calling ")
            )}


            {/* ------   for horse ---- */}

            {selectval === "0xd8bc0d91c5f0a17dd2c013e9211ff6fe1872e340" ? (
                <>
                    {/* <h2>Your Unstaked NFTs</h2> */}
                    <div className={styles.nftBoxGrid}>
                        {ownedHorseNfts?.map((nft) => (
                            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft.metadata.name}</h3>
                                {/* <Web3Button
                                    contractAddress={stakingContractAddress}
                                    action={() => stakeNft(nft.metadata.id)}
                                >
                                    Stake
                                </Web3Button> */}
                                <button
                                    // contractAddress={stakingContractAddress}
                                    className={`${styles.mainButton} ${styles.spacerTop}`}
                                    onClick={() => stakeHorseNft(nft.metadata.id)}
                                >
                                    Stake
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                console.log("horse is not calling ")
            )}

            {/* ------   for cat ---- */}

            {selectval === "0x551c03246cc1d5e276f2dc264253decfa9b011c6" ? (
                <>
                    {/* <h2>Your Unstaked NFTs</h2> */}
                    <div className={styles.nftBoxGrid}>
                        {ownedCatNfts?.map((nft) => (
                            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft.metadata.name}</h3>
                                <button
                                    // contractAddress={stakingContractAddress}
                                    className={`${styles.mainButton} ${styles.spacerTop}`}
                                    onClick={() => stakeCatNft(nft.metadata.id)}
                                >
                                    Stake
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                console.log("Cat is not calling ")
            )}

            {/* for Bear */}

            {selectval === "0xe19351a63a094abfc33d12cd1732f7fdd595b520" ? (
                <>
                    {/* <h2>Your Unstaked NFTs</h2> */}
                    <div className={styles.nftBoxGrid}>
                        {ownedBearNfts?.map((nft) => (
                            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft.metadata.name}</h3>
                                {/* <Web3Button
                                    contractAddress={stakingContractAddress}
                                    action={() => stakeNft(nft.metadata.id)}
                                >
                                    Stake
                                </Web3Button> */}
                                <button
                                    // contractAddress={stakingContractAddress}
                                    className={`${styles.mainButton} ${styles.spacerTop}`}
                                    onClick={() => stakeBearNft(nft.metadata.id)}
                                >
                                    Stake
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                console.log("Cat is not calling ")
            )}

            {/* {
                <form>
                    <input
                        type="text"
                        placeholder="Enter NFT Token ID"
                        onChange={(e) => {
                            setinputval(e.currentTarget.value);
                        }}
                        className="tidinput"
                        required
                        id="inputd"
                    />
                </form>
            } */}
            {/* <button
                className={styles.mainButton + " " + styles.spacerTop}
                onClick={GetTokenValue}
            >
                GetID
            </button> */}

            {/* <StakeFunction selectval={selectval} inputval={inputval} /> */}
        </div>
    );
};

export default GetTokenId;