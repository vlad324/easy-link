// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EasyLinkToken is ERC20, Ownable {
    constructor() ERC20("Easy Link Token", "ELT") {
    }

    function mint(uint256 amount) public { // todo: allow only for owner
        _mint(msg.sender, amount);
    }
}
