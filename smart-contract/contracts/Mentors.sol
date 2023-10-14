// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Mentors {
    struct MentorAccount {
        string languageToTeach;
        uint256 chargingPrice;
        string aboutYou;
        uint256 experience;
        string contact;
        string userName;
        bool verified;
        address accountOwner;
    }

    MentorAccount[] allMentorAccount;
    mapping(address => MentorAccount) public mentorAccount;

    function createAMentorAccount(
        string memory _languageToTeach,
        uint256 _chargingPrice,
        string memory _aboutYou,
        uint256 _experience,
        string memory _contact,
        string memory _userName
    ) external {
        MentorAccount storage newMentorAccount = mentorAccount[msg.sender];
        newMentorAccount.languageToTeach = _languageToTeach;
        newMentorAccount.chargingPrice = _chargingPrice;
        newMentorAccount.aboutYou = _aboutYou;
        newMentorAccount.experience = _experience;
        newMentorAccount.contact = _contact;
        newMentorAccount.userName = _userName;
        newMentorAccount.verified = false;
        newMentorAccount.accountOwner = msg.sender;
        allMentorAccount.push(newMentorAccount);
    }

    function retriveUserCharge(address _owner)
        external
        view
        returns (uint256)
    {
        MentorAccount storage newMentorAccount = mentorAccount[_owner];
        uint256 chargingPrice = newMentorAccount.chargingPrice;
        return chargingPrice;
    }

    function retreiveAllMentor() external view returns (MentorAccount[] memory) {
        return allMentorAccount;
    }

    function acceptMentor(address _owner) external {
        MentorAccount storage newMentorAccount = mentorAccount[_owner];
        require(newMentorAccount.verified == false, "Mentor already verified");
        newMentorAccount.verified = true;
    }

    function retriveMentorStatus(address _owner)
        external
        view
        returns (bool)
    {
        MentorAccount storage newMentorAccount = mentorAccount[_owner];
        bool verified = newMentorAccount.verified;
        return verified;
    }
}