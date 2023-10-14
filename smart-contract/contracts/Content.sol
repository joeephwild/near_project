//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Content {
    uint256 contentIds;

    struct ContentDetails {
        string contentName;
        string contentImage;
        string contentDescription;
        string contentLink;
        address contentOwner;
        string contentOwnerName;
        string shortTag;
        string category;
        uint256 id;
        uint256 amount;
        address[] buyer;
    }

    ContentDetails[] allContent;

    mapping(address => ContentDetails[]) public content;
    mapping(uint256 => ContentDetails) public idToContent;

    function createContent(
        string memory _contentName,
        string memory _contentImage,
        string memory _contentDescription,
        string memory _contentLink,
        string memory _contentOwnerName,
        string memory _shortTag,
        string memory _category,
        uint256 _amount
    ) external {
        ContentDetails memory newContent = ContentDetails({
            contentName: _contentName,
            contentImage: _contentImage,
            contentDescription: _contentDescription,
            contentLink: _contentLink,
            contentOwner: msg.sender,
            contentOwnerName: _contentOwnerName,
            shortTag: _shortTag,
            category: _category,
            id: contentIds++,
            amount: _amount,
            buyer: new address[](0)
        });
        content[msg.sender].push(newContent);
        idToContent[newContent.id] = newContent;
        allContent.push(newContent);
    }

    function retrieveBuyers(uint256 _id) external view returns(address[] memory){
        return idToContent[_id].buyer;
    }

    function retrieveAllContent()  external view returns(ContentDetails[] memory) {
        return allContent;
    }

    function purchaseContent(uint256 _id) external payable{
        require(msg.value > idToContent[_id].amount, "You need to pay for this content");
        require(msg.sender != idToContent[_id].contentOwner, "You can't purchase your own content");
        require(idToContent[_id].id == _id, "Content does not exist");
        ContentDetails storage contentToPurchase = idToContent[_id];
        address payable contentOwner = payable(contentToPurchase.contentOwner);
        contentOwner.transfer(msg.value);
        contentToPurchase.buyer.push(msg.sender);
    }
    
}