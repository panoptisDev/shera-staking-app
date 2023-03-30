import {
    useAddress,
    useContract,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import BackIcon from "../public/icons/BackIcon.png";
import Image from "next/image";


// import { ConnectWallet } from "@thirdweb-dev/react";
import StakeBalance from "./StakeBalance";



const stakingContractAddress = "0x272E4D319CD8d63d3FE882E091f11059c15183F3";


const Profile: NextPage = () => {



    const address = useAddress();




    const { contract, isLoading } = useContract(stakingContractAddress);


    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

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


    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <>
            <Link href="/">
                <div className="d-flex1">
                    <Image src={BackIcon} className="asad" width={50} height={50} />
                    <h3 className="gtd">Go To Dashboard</h3>
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


                {!address ? (
                    <>
                        <ConnectWallet accentColor="#f213a4" colorMode="dark" />
                    </>
                ) : (
                    <>
                        <h2 className={styles.walletbalance}>WALLET BALANCE</h2>

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
                                        <StakeBalance />
                                    </b>
                                </p>
                            </div>
                        </div>

                    </>
                )}
            </div>

        </>
    );
};

export default Profile;
