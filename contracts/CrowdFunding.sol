// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {

    enum DocStatus { Pending, Approved, Rejected }

    struct Campaign {
        address owner;
        string name;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        string[] donorNames;
        string category;
    }

    struct Document {
    address creator;
    string name;
    string documentAddress1;
    string documentAddress2;
    string documentAddress3;
    DocStatus status;
    }

    struct Document2 {
    address creator;
    string name;
    string documentAddress1;
    string documentAddress2;
    string documentAddress3;
    DocStatus status;
    }

    struct User {
    string name;
    string email;
    uint256 logInStatus;
    bytes32 passwordHash; 
    bool isRequester;
    bool isVerifier;
    }

    struct Verifier {
        uint256 logInStatus;
    }


    mapping(uint256 => Campaign) public campaigns;
    mapping(address => Document) public documentsByAddress;
    mapping(uint256 => Document2) public documentsById;
    mapping(address => User) public users;
    mapping(address => Verifier) public verifiers;
    mapping(string => address) public nameToAddress;
    mapping(address => string) public addressToName;

    uint256 public numberOfCampaigns = 0;
    uint256 public numberOfRequesters = 0;
    uint256 public numberOfUsersHaveDoc = 0;


    modifier onlyRequester() {
        require(users[msg.sender].isRequester, "Not a requester");
        _;
    }

    modifier onlyRegisteredUser() {
        require(bytes(users[msg.sender].name).length > 0, "User not registered");
        _;
    }

    modifier onlyVerifier() {
        require(users[msg.sender].isVerifier, "Not a verifier");
        _;
    }

    modifier onlyDocumentCreator() {
        require(msg.sender == documentsByAddress[msg.sender].creator, "You are not the creator of this document");
        _;
    }

    modifier onlyPendingDocument() {
        require(documentsByAddress[msg.sender].status == DocStatus.Pending, "Document status is not Pending");
        _;
    }


    function userRegistration(string memory _name, string memory _email, string memory _password, bool _isRequester) external {

        require(bytes(_name).length >= 7, "Username must be at least 7 characters long");
        require(isValidEmail(_email), "Invalid email address");
        require(isValidPassword(_password), "Password must contain alphabets, keywords, and numbers");
        require(!validateUser(_name), "User already registered");
        require(!isVerifier(msg.sender), "Address matches a verifier address");

        bytes32 passwordHash = keccak256(abi.encodePacked(_password, msg.sender));

        users[msg.sender] = User({
            name: _name,
            email: _email,
            logInStatus: 0,
            passwordHash: passwordHash,
            isVerifier: false,
            isRequester: _isRequester
        });

        nameToAddress[_name] = msg.sender;

        if (_isRequester) {
            numberOfRequesters++;
        }
    }

    function isValidEmail(string memory _email) internal pure returns (bool) {
        bytes memory b = bytes(_email);
        if (b.length < 5) return false; 

        // Check if '@' exists and is not the first or last character
        bool atFound = false;
        for (uint i = 1; i < b.length - 1; i++) {
            if (b[i] == '@') {
                atFound = true;
                break;
            }
        }
        return atFound;
    }

    function isValidPassword(string memory _password) internal pure returns (bool) {
        bytes memory b = bytes(_password);
        bool hasAlphabets = false;
        bool hasKeywords = false;
        bool hasNumbers = false;

        for (uint i = 0; i < b.length; i++) {
            bytes1 char = b[i];

            if ((char >= bytes1('A') && char <= bytes1('Z')) || (char >= bytes1('a') && char <= bytes1('z'))) {
                hasAlphabets = true;
            } else if (char >= bytes1('0') && char <= bytes1('9')) {
                hasNumbers = true;
            } else if (char == bytes1('!') || char == bytes1('@') || char == bytes1('#') || char == bytes1('$') || char == bytes1('%')) {
                hasKeywords = true;
            }
        }

        return hasAlphabets && hasKeywords && hasNumbers;
    }


    function userLogin(string memory _name, string memory _password) external returns (string memory) {
    
    address userAddress = nameToAddress[_name];

    require(validateUser(_name), "User not found");

    User storage user = users[userAddress];

    bytes32 hashedPassword = keccak256(abi.encodePacked(_password, msg.sender));

    require(user.passwordHash == hashedPassword, "Incorrect password");

    users[msg.sender].logInStatus = 1;

    return "Successfully Logged In";
    }

    function validateUser(string memory _name) internal view returns (bool) {
        for (uint i = 0; i < numberOfRequesters; i++) {
            if (keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(users[msg.sender].name))) {
                return true;
            }
        }
        return false;
    }


// Updation Password
    function updatePassword(string memory _name, string memory _newPassword) public {
        address userAddress = nameToAddress[_name];

        require(isUserRegistered(_name, userAddress), "User not registered with the provided name and address");

        bytes32 newPasswordHash = keccak256(abi.encodePacked(_newPassword, userAddress));
        users[userAddress].passwordHash = newPasswordHash;
    }

    function isUserRegistered(string memory _name, address _userAddress) public view returns (bool) 
    {
    return (keccak256(bytes(users[_userAddress].name)) == keccak256(bytes(_name)) && _userAddress != address(0));
    }

    function isUserSignedUp(address _userAddress) public view returns (bool) 
    {
    return(_userAddress != address(0));
    }


// Verifier things
    address[2] public permanentVerifiers;
    constructor() 
    {
        permanentVerifiers[0] = 0x7179168617256D9531e1E78F447b8CeC591180f9;
        permanentVerifiers[1] = 0x6842be9c4442392D2F7393146D1ce3Bf8c877668;
    }


    function verifierLogin(address _verifierAddress) external returns (string memory) {
        require(isVerifier(_verifierAddress), "Not a verifier");
        verifiers[msg.sender].logInStatus = 1;
        return "Verifier Logged In";
    }


    function isVerifier(address _address) internal view returns (bool) {
        for (uint256 i = 0; i < permanentVerifiers.length; i++) {
            if (permanentVerifiers[i] == _address) {
                return true; 
            }
        }
        return false; 
    }


    // Function for users to upload documents
    function uploadDocument(address _user, string[] memory _documentAddresses) public {
        require(isUserSignedUp(_user), "User is not registered");
        require(users[msg.sender].logInStatus == 1, "User is not logged In");
        require(_documentAddresses.length == 3, "Exactly three document addresses are required");


    documentsByAddress[msg.sender] = Document({
        creator: msg.sender,
        name: users[msg.sender].name,
        documentAddress1: _documentAddresses[0],
        documentAddress2: _documentAddresses[1],
        documentAddress3: _documentAddresses[2],
        status: DocStatus.Pending
    });

    documentsById[numberOfUsersHaveDoc] = Document2({
        creator: msg.sender,
        name: users[msg.sender].name,
        documentAddress1: _documentAddresses[0],
        documentAddress2: _documentAddresses[1],
        documentAddress3: _documentAddresses[2],
        status: DocStatus.Pending
    });

    numberOfUsersHaveDoc++;
}


    function verifyDocument(address userAdd, DocStatus _newStatus) public {
        require(isVerifier(msg.sender), "You are not a verifier");
        require(verifiers[msg.sender].logInStatus == 1, "Verifier not logged In");
        require(documentsByAddress[userAdd].status == DocStatus.Pending, "Your document is not pending");
        documentsByAddress[userAdd].status = _newStatus;
    }

    function getUserDocumentStatus(address _user) public view returns (DocStatus) {
            if (documentsByAddress[_user].creator == _user && documentsByAddress[_user].status == DocStatus.Approved) {
                return DocStatus.Approved;
            }
            else if(documentsByAddress[_user].creator == _user && documentsByAddress[_user].status == DocStatus.Rejected) {
                return DocStatus.Rejected;
            }
        return DocStatus.Pending;
    }


    function createCampaigns(address _owner, string memory _name, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image, string memory _category) public returns (uint256) {
        
        Campaign storage campaign = campaigns[numberOfCampaigns];
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        require(!isVerifier(msg.sender), "Address matches a verifier address");
        require(getUserDocumentStatus(msg.sender) == DocStatus.Approved, "You need an approved document to create a campaign");
        require(isUserRegistered(_name,_owner), "User is not registered");
        require(users[msg.sender].logInStatus == 1, "User is not logged In");

        campaign.owner = _owner;
        campaign.name = _name;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.category = _category;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaigns(uint256 _id, string memory _name) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        campaign.donorNames.push(_name);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory, string [] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations, campaigns[_id].donorNames);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getDocuments() public view returns (Document2[] memory) {
        Document2[] memory allDocuments = new Document2[](numberOfUsersHaveDoc);

        for(uint i = 0; i < numberOfUsersHaveDoc; i++) {
            Document2 storage item = documentsById[i];

            allDocuments[i] = item;
        }

        return allDocuments;
    }

    function deleteCampaigns(uint256 _campaignId) public {
    require(_campaignId < numberOfCampaigns, "Invalid campaign ID");
    require(campaigns[_campaignId].owner == msg.sender, "You are not the owner of this campaign");

    for (uint256 i = _campaignId; i < numberOfCampaigns - 1; i++) {
        campaigns[i] = campaigns[i + 1];
    }

    delete campaigns[numberOfCampaigns - 1];

    numberOfCampaigns--;
}

    function getAddressByUsername(string memory _username) public view returns (address) {
        return nameToAddress[_username];
    }
}