// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract User {
  struct User {
    string name;
    address addr;
    uint role;
  }
  User[] public listUser;
  mapping (address => uint) userId;
  mapping (address => bool) isUser;
  mapping (address => bool) isIssuer;
  mapping (address => bool) isRecipient;
  mapping (address => bool) isLogin;
  mapping (address => string) addressToName;
  function signUp(string memory name,uint role) public {
    require(isLogin[msg.sender]==false,"you are loged in");
    require(isUser[msg.sender]==false,"this user has already been signup");
    isUser[msg.sender]=true;
    User memory user;
    user.name=name;
    user.addr=msg.sender;
    user.role=role;
    addressToName[msg.sender]=name;
    if (role==1){
      isIssuer[msg.sender]=true;
    }
    else {
      isRecipient[msg.sender]=true;
    }
    listUser.push(user);
    userId[msg.sender]=listUser.length-1;
  }
  function getNameByAddress(address addr) public view returns(string memory){
    return addressToName[addr];
  }
  function checkIssuer(address addr) public view returns(bool){
    return isIssuer[addr];
  }
  function checkRecipient(address addr) public view returns(bool){
    return isRecipient[addr];
  }
  function getUserById(uint id) public view returns(string memory,address){
    return (listUser[id].name,listUser[id].addr);
  }
  
  function getMyProfile() public view returns(string memory,address){
    uint id=userId[msg.sender];
    return (listUser[id].name,listUser[id].addr);
  }
}
