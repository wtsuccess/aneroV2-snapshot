import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { leafNodes } from "./NFT_Holders_List.js";
import { ethers } from "ethers";

const leaves = leafNodes.map((i) => {
  const packed = ethers.utils.solidityPack(
    ["address", "uint256"],
    [i.owner, i.totalCount]
  );
  return keccak256(packed);
});

// Generate merkleTree from leafNodes
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
// Get root hash from merkle tree
const root = merkleTree.getHexRoot();

console.log("root", root);
