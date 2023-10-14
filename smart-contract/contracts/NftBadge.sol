//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftBadge is ERC721 {
uint256 private _nextTokenId = 1;

struct Badge {
    string badgeName;
    string badgeImage;
    uint256 level;
    address owner;
}

Badge[] allBadge;

mapping(address => Badge) public badge;

    constructor()
        ERC721("LacentBadge", "LBG")
   
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://di-hack.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbadge1.bbfbffbc.png&w=128&q=75";
    }

    function safeMint(string memory badgeName) public {
      uint256 tokenId = _nextTokenId++;
      Badge storage newBadge = badge[msg.sender];
      newBadge.badgeName = badgeName;
      newBadge.badgeImage = "https://di-hack.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbadge1.bbfbffbc.png&w=128&q=75";
      newBadge.level = tokenId;
      newBadge.owner  = msg.sender;
        _safeMint(msg.sender, tokenId);
        allBadge.push(newBadge);
    }

    function setBaseURI(string memory baseURI) public  {
        setBaseURI(baseURI);
    }

    function retriveUserBadge(address _owner) external view returns(string memory, string memory, uint256) {
        Badge storage newBadge = badge[_owner];
        string memory badgeName = newBadge.badgeName;
        string memory badgeImage = newBadge.badgeImage;
        uint256 level = newBadge.level;
        return (badgeName, badgeImage, level);
    }

    function retriveAllBadge() external view returns(Badge[] memory) {
        return allBadge;
    }
}