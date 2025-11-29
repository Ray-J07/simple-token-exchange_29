let provider, signer, userAddress;

// 部署后填这里
const tokenAAddress = "YOUR_TOKEN_A_ADDRESS_HERE";
const tokenBAddress = "YOUR_TOKEN_B_ADDRESS_HERE";
const exchangeAddress = "YOUR_EXCHANGE_ADDRESS_HERE";

// ABI 从 Hardhat artifacts 获取，也可直接写最小 ABI
const erc20ABI = [
    "function balanceOf(address) view returns(uint)",
    "function approve(address spender, uint amount) returns(bool)"
];

const exchangeABI = [
    "function swapAtoB(uint256 amountA)",
    "event Exchanged(address indexed user, uint256 amountA, uint256 amountB)"
];

function log(text) {
    document.getElementById("log").textContent += text + "\n";
}

document.getElementById("connectBtn").onclick = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    document.getElementById("userAddress").textContent = userAddress;

    loadBalance();
};

async function loadBalance() {
    const tokenA = new ethers.Contract(tokenAAddress, erc20ABI, provider);
    const tokenB = new ethers.Contract(tokenBAddress, erc20ABI, provider);

    const balA = await tokenA.balanceOf(userAddress);
    const balB = await tokenB.balanceOf(userAddress);

    document.getElementById("balanceA").textContent = ethers.utils.formatEther(balA);
    document.getElementById("balanceB").textContent = ethers.utils.formatEther(balB);

    log("Balance updated.");
}

document.getElementById("approveBtn").onclick = async () => {
    const tokenA = new ethers.Contract(tokenAAddress, erc20ABI, signer);
    const amount = document.getElementById("swapAmount").value;
    const wei = ethers.utils.parseEther(amount);

    const tx = await tokenA.approve(exchangeAddress, wei);
    await tx.wait();

    log("TokenA approved.");
};

document.getElementById("swapBtn").onclick = async () => {
    const exchange = new ethers.Contract(exchangeAddress, exchangeABI, signer);
    const amount = document.getElementById("swapAmount").value;
    const wei = ethers.utils.parseEther(amount);

    const tx = await exchange.swapAtoB(wei);
    await tx.wait();

    log("Swap executed.");

    loadBalance();
};
