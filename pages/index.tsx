import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import HappyTigerFour from "../public/icons/HappyTigerFour.png"
import HappyOctopusFour from "../public/icons/HappyOctopusFour.png"

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <h1 className={styles.h1}>SHERA NFT -  STAKE YOUR NFT</h1>
      <div className={styles.nftBoxGrid + " " + styles.nftBoxGrid11}>
        <a
          className={styles.optionSelectBox}
          // role="button"
          href="https://shera-minting.vercel.app/"
        // onClick={() => router.push(`/mint`)}
        >
          <img src="https://gateway.pinata.cloud/ipfs/QmS4X6DUDwv1n7PhKqzBvzKaqi9tkYLbefXFhYHk1zkwXR?_gl=1*k7duju*_ga*MTM0NzM3MDM2OC4xNjczNjQ0MzY4*_ga_5RMPXG14TE*MTY3NjQ4MzA2NS4xMC4xLjE2NzY0ODMwODIuNDMuMC4w" className={styles.mintImg} alt="drop" width={150} height={150} />
          <h2 className={styles.selectBoxTitle}>MINT AN NFT</h2>
          <p className={styles.selectBoxDescription}>
            Claim Your Shera NFT Here
          </p>
        </a>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/stake`)}
        >
          {/* Staking an NFT */}
          <img src="https://gateway.pinata.cloud/ipfs/QmS4X6DUDwv1n7PhKqzBvzKaqi9tkYLbefXFhYHk1zkwXR?_gl=1*k7duju*_ga*MTM0NzM3MDM2OC4xNjczNjQ0MzY4*_ga_5RMPXG14TE*MTY3NjQ4MzA2NS4xMC4xLjE2NzY0ODMwODIuNDMuMC4w" className={styles.mintImg} alt="drop" width={150} height={150} />
          <h2 className={styles.selectBoxTitle}>STAKE YOUR NFTS</h2>
          <p className={styles.selectBoxDescription}>
            Stake Your Shera NFT Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
