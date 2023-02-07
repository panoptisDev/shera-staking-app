import React, { useState } from 'react'

import styles from "../styles/Home.module.css";

import { useContract, useAddress } from "@thirdweb-dev/react";

function StakeFunction(props: any) {

    const address = useAddress();
    const [inputval, setinputval] = useState("0");

    const nftDropContractAddress = "0xA9f7A8aE98ad459f239084c18FFB52B112e9003B";
    const stakingContractAddress = "0x2877D83377ff3b0192b231203Fa7EC17ee2F69e0";

    const { contract: nftDropContract } = useContract(
        nftDropContractAddress,
        "nft-drop"
    );

    const { contract } = useContract(
        "0x2877D83377ff3b0192b231203Fa7EC17ee2F69e0"
    );


    async function stakeNft(id: bigint) {
        if (!address) return;


        // props.sndfunct();


        console.log("id is " + id + "address selected is " + props.selectval);
        const isApproved = await nftDropContract?.isApproved(
            address,
            stakingContractAddress
        );

        if (!isApproved) {
            await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
        }


        const stake = await contract?.call("stake", id, props.selectval);

    }

    return (
        <div>


            <button
                className={styles.mainButton + " " + styles.spacerTop}
                onClick={async () => {
                    await stakeNft(props.inputval);
                }}
            >
                Stake
            </button>
        </div>
    )
}

export default StakeFunction;
