import { Network, Alchemy } from "alchemy-sdk";
import * as fs from "fs";

const settings = {
  apiKey: "KMkpSN141gXsmtpTGg5WVR7vbbvu2vMQ",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const main = async () => {
  const address = "0x926baa7445d56d5e8632046409cdc7d5844ce344";
  const owners = await alchemy.nft.getOwnersForContract(address, {
    withTokenBalances: true,
  });
  for (const owner of owners.owners) {
    var holders = fs.existsSync("NFT_Holders_List.json")
      ? JSON.parse(fs.readFileSync("NFT_Holders_List.json"))
      : [];
    let newHolder = {
      owner: owner.ownerAddress,
      totalCount: owner.tokenBalances.length,
    };
    holders.push(newHolder);

    let newHolders = JSON.stringify(holders, null, 2);
    fs.writeFileSync("NFT_Holders_List.json", newHolders);
    console.log(owner.ownerAddress + ": " + owner.tokenBalances.length);
  }
};

const runmain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runmain();
