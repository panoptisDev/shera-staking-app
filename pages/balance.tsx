import React from 'react'

import {
    useAddress,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";


const Balanco: NextPage = (props: any) => {
    const address = useAddress();
    // const address = "0x64387D613e57D20bb4E0E3C33d9b4820C6E3c836";

    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const { contract } = useContract("0xe2c5fcf777a2b860921116b275951a50e8135eeb");

    useEffect(() => {
        if (!contract || !address) return;

        async function getbalance_() {
            const cr = await contract?.call("balanceOf", address);
            console.log("Loaded claimable rewards", cr);
            setClaimableRewards(cr);
            // props.onValueChange()
        }

        getbalance_();
    }, [address, contract]);


    console.log();
    return (
        <div>
            {!claimableRewards
                ? "Loading..."
                : props.onValueChange((ethers.utils.formatUnits(claimableRewards, 9)))
            }

        </div>
    )
}

export default Balanco;