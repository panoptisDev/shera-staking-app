import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const address = useAddress();

  const router = useRouter();

  useEffect(() => {
    if (!address) return;

    function renderPage() {
      router.push("/");
    }

    if (address) {
      renderPage();
    }
  }, [address]);

  return (
    <>
      <div className="connect-wallet">
        <ConnectWallet />
      </div>
    </>
  );
};
export default Login;
