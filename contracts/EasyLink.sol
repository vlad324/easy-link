// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./MerkleTree.sol";

contract EasyLink is MerkleTree {

    address public immutable token;
    uint256 public immutable amount;

    address public immutable verifier;

    mapping(uint256 => bool) public commitments;
    mapping(uint256 => bool) public spentNullifiers;

    event Deposit(uint256 commitment, uint32 index);

    constructor(
        address _token,
        uint256 _amount,
        address _verifier,
        uint8 _levels,
        address _hasher
    ) MerkleTree(_levels, _hasher) {
        token = _token;
        amount = _amount;
        verifier = _verifier;
    }

    function deposit(uint256 commitment) external {
        require(!commitments[commitment], "Duplicated commitment");

        IERC20(token).transferFrom(msg.sender, address(this), amount);

        uint32 index = insert(commitment);
        commitments[commitment] = true;

        emit Deposit(commitment, index);
    }
}