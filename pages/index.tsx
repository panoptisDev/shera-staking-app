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
      <h1 className={styles.h1}>Shera NFT -  Stake Your NFT</h1>
      <div className={styles.nftBoxGrid + " " + styles.nftBoxGrid11}>
        <a
          className={styles.optionSelectBox}
          // role="button"
          href="https://shera-minting.vercel.app/"
        // onClick={() => router.push(`/mint`)}
        >
          <img src="https://nftify-platform-resized.s3-ap-southeast-1.amazonaws.com/l-img-preview/62d170f22994a0bed7213b80-1659096241663-rc-upload-1659096158626-25.png" className={styles.mintImg} alt="drop" width={200} height={200} />
          <h2 className={styles.selectBoxTitle}>Mint an NFT</h2>
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
          <img src="https://nftify-platform-resized.s3-ap-southeast-1.amazonaws.com/l-img-preview/62d170f22994a0bed7213b80-1659096241663-rc-upload-1659096158626-25.png" className={styles.mintImg} alt="drop" width={200} height={200} />
          <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
          <p className={styles.selectBoxDescription}>
            Stake Your Shera NFT Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
