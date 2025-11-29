// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleExchange {

    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public exchangeRate; // 比如 1 A = 100 B

    event Exchanged(address indexed user, uint256 amountA, uint256 amountB);

    constructor(address _tokenA, address _tokenB, uint256 _rate) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        exchangeRate = _rate;
    }

    function swapAtoB(uint256 amountA) external {
        require(amountA > 0, "Amount must > 0");

        uint256 amountB = amountA * exchangeRate;

        require(
            tokenB.balanceOf(address(this)) >= amountB,
            "Exchange has insufficient TokenB"
        );

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transfer(msg.sender, amountB);

        emit Exchanged(msg.sender, amountA, amountB);
    }
}
