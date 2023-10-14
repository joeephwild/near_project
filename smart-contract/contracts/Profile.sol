// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Profile {
   struct Account {
    string langaugeToLearn;
    string spokenLanguage;
    string userName;
    string learnLanguageImage;
    address accountOwner;
   }

   Account[] allAccount;
   mapping(address => Account) public account;

   function createAProfile(
    string memory _langaugeToLearn,
    string memory _spokenLanguage,
    string memory _userName,
     string memory _learnLanguageImage
   ) external {
      Account storage newAccount = account[msg.sender];
        newAccount.langaugeToLearn = _langaugeToLearn;
        newAccount.spokenLanguage = _spokenLanguage;
        newAccount.userName = _userName;
        newAccount.learnLanguageImage = _learnLanguageImage;
        newAccount.accountOwner = msg.sender;
        allAccount.push(newAccount);
   }

   function retrieveUserName(address _owner) external view returns(string memory) {
        Account storage newAccount = account[_owner];
        string memory userName = newAccount.userName;
        return userName;
   }

   function retrieveLearnLanguage(address _owner) external view returns(string memory) {
        Account storage newAccount = account[_owner];
        string memory learnLanguage = newAccount.langaugeToLearn;
        return learnLanguage;
   }

   function retriveLanugeImage(address _owner) external view returns(string memory){
            Account storage newAccount = account[_owner];
            string memory learnLanguageImage = newAccount.learnLanguageImage;
            return learnLanguageImage;
   }

   function retriveallAccount() external view returns(Account[] memory) {
        return allAccount;
   }

   function retriveUserAccountByAddress(address _owner) external view returns(string memory, string memory, string memory) {
        Account storage newAccount = account[_owner];
        string memory learnLanguage = newAccount.langaugeToLearn;
        string memory spokenLanguage = newAccount.spokenLanguage;
        string memory userName = newAccount.userName;
        return (learnLanguage, spokenLanguage, userName);
   }
}
