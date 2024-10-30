import abi from "./contract/Coffee.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xd649f5A24026B7B50B43586493C1e41AbAEC4269";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // Reload the page when the chain or account changes
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          // Updated ethers v6 syntax
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(accounts[0]); // Update to set the first account
          setState({ provider, signer, contract });
        } else {
          alert("Please install Metamask");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      } finally {
        setLoading(false); // Set loading to false after trying to connect
      }
    };
    connectWallet();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state while connecting to wallet
  }

  return (
    <div style={{ backgroundColor: "#252422", height: "100%", margin: "0" }}>
      <div style={{ backgroundColor: "#252422", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "25px", paddingTop: "25px", marginLeft: "210px"}}>
        <div style={{
          backgroundColor: "#282c34", // Set your desired background color
          padding: "20px",
          borderRadius: "15px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: adds a shadow effect
          maxWidth: "600px", // Optional: limit width of the box
          margin: "0 auto" // Center the box
        }}>
          <h2 className="display-2 text-center" style={{ color: "white", fontFamily: "Arial, sans-serif", fontSize: "2.5em" }}> {/* Change font here */}
            Buy Aryanshi a Coffee!
          </h2>
          <p className="text-center" style={{ fontSize: "1.3em", color: "white", fontFamily: "Arial, sans-serif" }}> {/* Change font here */}
            Send AIA Tokens over AIA Blockchain
          </p>
        </div>

        <div style={{ width: "200px" }}></div>
      </div>
      <p className="text-muted lead" style={{ marginTop: "10px", marginLeft: "5px", textAlign: "center" }}>
        <small>Connected Account - {account}</small>
      </p>
      <div className="container" style={{ height: "69vh" }}>
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;