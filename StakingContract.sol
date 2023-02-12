// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Staking is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // Interfaces for ERC20 and ERC721
    IERC20 public immutable rewardsToken;
    IERC721 public immutable nftCollection_astra;
    IERC721 public immutable nftCollection_horse;
    IERC721 public immutable nftCollection_cat;
    IERC721 public immutable nftCollection_bear;

    uint256 imna;

    // Constructor function to set the rewards token and the NFT collection addresses
    constructor(
        IERC721 _nftCollection_astra,
        IERC721 _nftCollection_horse,
        IERC721 _nftCollection_cat,
        IERC721 _nftCollection_bear,
        IERC20 _rewardsToken
    ) {
        nftCollection_astra = _nftCollection_astra;
        nftCollection_horse = _nftCollection_horse;
        nftCollection_cat = _nftCollection_cat;
        nftCollection_bear = _nftCollection_bear;
        rewardsToken = _rewardsToken;
        imna = 1000;
    }

    struct StakedToken {
        address staker;
        uint256 tokenId;
    }

    // Staker info
    struct Staker {
        // Amount of tokens staked by the staker
        uint256 amountStaked;
        // Staked token ids
        StakedToken[] stakedTokens;
        StakedToken[] stakedCatTokens;
        StakedToken[] stakedBearTokens;
        StakedToken[] stakedHorseTokens;
        // Last time of the rewards were calculated for this user
        uint256 timeOfLastUpdate;
        // Calculated, but unclaimed rewards for the User. The rewards are
        // calculated each time the user writes to the Smart Contract
        uint256 unclaimedRewards;
    }

    // Rewards per hour per token deposited in wei.
    uint256 private rewardsPerHour = 20833000000000000000000;

    // Mapping of User Address to Staker info
    mapping(address => Staker) public stakers;

    // Mapping of Token Id to staker. Made for the SC to remember
    // who to send back the ERC721 Token to.
    mapping(uint256 => address) public stakerAddress;

    // If address already has ERC721 Token/s staked, calculate the rewards.
    // Increment the amountStaked and map msg.sender to the Token Id of the staked
    // Token to later send back on withdrawal. Finally give timeOfLastUpdate the
    // value of now.
    function stake(uint256 _tokenId, IERC721 contract_market_)
        external
        nonReentrant
    {
        // If wallet has tokens staked, calculate the rewards before adding the new token
        if (stakers[msg.sender].amountStaked > 0) {
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;
        }

        // Wallet must own the token they are trying to stake
        require(
            nftCollection_astra.ownerOf(_tokenId) == msg.sender ||
                nftCollection_horse.ownerOf(_tokenId) == msg.sender ||
                nftCollection_cat.ownerOf(_tokenId) == msg.sender ||
                nftCollection_bear.ownerOf(_tokenId) == msg.sender,
            "You Don't Own This Token!"
        );

        require(
            contract_market_ == nftCollection_astra ||
                contract_market_ == nftCollection_horse ||
                contract_market_ == nftCollection_cat ||
                contract_market_ == nftCollection_bear,
            "This Collection Can't Be Staked"
        );

        if (contract_market_ == nftCollection_astra) {
            // Transfer the token from the wallet to the Smart contract
            contract_market_.transferFrom(msg.sender, address(this), _tokenId);

            // Create StakedToken
            StakedToken memory stakedToken = StakedToken(msg.sender, _tokenId);

            // Add the token to the stakedTokens array
            stakers[msg.sender].stakedTokens.push(stakedToken);

            // Increment the amount staked for this wallet
            stakers[msg.sender].amountStaked++;

            // Update the mapping of the tokenId to the staker's address
            stakerAddress[_tokenId] = msg.sender;

            // Update the timeOfLastUpdate for the staker
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }

        if (contract_market_ == nftCollection_horse) {
            // Transfer the token from the wallet to the Smart contract
            contract_market_.transferFrom(msg.sender, address(this), _tokenId);

            // Create StakedToken
            StakedToken memory stakedHorseToken = StakedToken(
                msg.sender,
                _tokenId
            );

            // Add the token to the stakedTokens array
            stakers[msg.sender].stakedHorseTokens.push(stakedHorseToken);

            // Increment the amount staked for this wallet
            stakers[msg.sender].amountStaked++;

            // Update the mapping of the tokenId to the staker's address
            stakerAddress[_tokenId] = msg.sender;

            // Update the timeOfLastUpdate for the staker
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }

        if (contract_market_ == nftCollection_cat) {
            // Transfer the token from the wallet to the Smart contract
            contract_market_.transferFrom(msg.sender, address(this), _tokenId);

            // Create StakedToken
            StakedToken memory stakedCatToken = StakedToken(
                msg.sender,
                _tokenId
            );

            // Add the token to the stakedTokens array
            stakers[msg.sender].stakedCatTokens.push(stakedCatToken);

            // Increment the amount staked for this wallet
            stakers[msg.sender].amountStaked++;

            // Update the mapping of the tokenId to the staker's address
            stakerAddress[_tokenId] = msg.sender;

            // Update the timeOfLastUpdate for the staker
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }

        if (contract_market_ == nftCollection_bear) {
            // Transfer the token from the wallet to the Smart contract
            contract_market_.transferFrom(msg.sender, address(this), _tokenId);

            // Create StakedToken
            StakedToken memory stakedBearToken = StakedToken(
                msg.sender,
                _tokenId
            );

            // Add the token to the stakedTokens array
            stakers[msg.sender].stakedBearTokens.push(stakedBearToken);

            // Increment the amount staked for this wallet
            stakers[msg.sender].amountStaked++;

            // Update the mapping of the tokenId to the staker's address
            stakerAddress[_tokenId] = msg.sender;

            // Update the timeOfLastUpdate for the staker
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }
    }

    // Check if user has any ERC721 Tokens Staked and if they tried to withdraw,
    // calculate the rewards and store them in the unclaimedRewards
    // decrement the amountStaked of the user and transfer the ERC721 token back to them
    function withdraw(uint256 _tokenId, IERC721 contract_market)
        external
        nonReentrant
    {
        // Make sure the user has at least one token staked before withdrawing
        require(
            stakers[msg.sender].amountStaked > 0,
            "You Have No Tokens Staked"
        );

        require(
            stakers[msg.sender].amountStaked > 0,
            "You Have No Tokens Staked"
        );

        require(
            contract_market == nftCollection_astra ||
                contract_market == nftCollection_horse ||
                contract_market == nftCollection_cat ||
                contract_market == nftCollection_bear,
            "This Collection Can't Be Withdrawn"
        );

        if (contract_market == nftCollection_astra) {
            // Update the rewards for this user, as the amount of rewards decreases with less tokens.
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;

            // Find the index of this token id in the stakedTokens array
            uint256 index = 0;
            for (
                uint256 i = 0;
                i < stakers[msg.sender].stakedTokens.length;
                i++
            ) {
                if (
                    stakers[msg.sender].stakedTokens[i].tokenId == _tokenId &&
                    stakers[msg.sender].stakedTokens[i].staker != address(0)
                ) {
                    index = i;
                    break;
                }
            }

            // Set this token's .staker to be address 0 to mark it as no longer staked
            stakers[msg.sender].stakedTokens[index].staker = address(0);

            // Decrement the amount staked for this wallet
            stakers[msg.sender].amountStaked--;

            // Update the mapping of the tokenId to the be address(0) to indicate that the token is no longer staked
            stakerAddress[_tokenId] = address(0);

            // Transfer the token back to the withdrawer
            contract_market.transferFrom(address(this), msg.sender, _tokenId);

            // Update the timeOfLastUpdate for the withdrawer
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }

        if (contract_market == nftCollection_horse) {
            // Update the rewards for this user, as the amount of rewards decreases with less tokens.
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;

            // Find the index of this token id in the stakedTokens array
            uint256 index = 0;
            for (
                uint256 i = 0;
                i < stakers[msg.sender].stakedHorseTokens.length;
                i++
            ) {
                if (
                    stakers[msg.sender].stakedHorseTokens[i].tokenId ==
                    _tokenId &&
                    stakers[msg.sender].stakedHorseTokens[i].staker !=
                    address(0)
                ) {
                    index = i;
                    break;
                }
            }

            // Set this token's .staker to be address 0 to mark it as no longer staked
            stakers[msg.sender].stakedHorseTokens[index].staker = address(0);

            // Decrement the amount staked for this wallet
            stakers[msg.sender].amountStaked--;

            // Update the mapping of the tokenId to the be address(0) to indicate that the token is no longer staked
            stakerAddress[_tokenId] = address(0);

            // Transfer the token back to the withdrawer
            contract_market.transferFrom(address(this), msg.sender, _tokenId);

            // Update the timeOfLastUpdate for the withdrawer
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }

        if (contract_market == nftCollection_cat) {
            // Update the rewards for this user, as the amount of rewards decreases with less tokens.
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;

            // Find the index of this token id in the stakedTokens array
            uint256 index = 0;
            for (
                uint256 i = 0;
                i < stakers[msg.sender].stakedCatTokens.length;
                i++
            ) {
                if (
                    stakers[msg.sender].stakedCatTokens[i].tokenId ==
                    _tokenId &&
                    stakers[msg.sender].stakedCatTokens[i].staker != address(0)
                ) {
                    index = i;
                    break;
                }
            }

            // Set this token's .staker to be address 0 to mark it as no longer staked
            stakers[msg.sender].stakedCatTokens[index].staker = address(0);

            // Decrement the amount staked for this wallet
            stakers[msg.sender].amountStaked--;

            // Update the mapping of the tokenId to the be address(0) to indicate that the token is no longer staked
            stakerAddress[_tokenId] = address(0);

            // Transfer the token back to the withdrawer
            contract_market.transferFrom(address(this), msg.sender, _tokenId);

            // Update the timeOfLastUpdate for the withdrawer
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }

        if (contract_market == nftCollection_bear) {
            // Update the rewards for this user, as the amount of rewards decreases with less tokens.
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;

            // Find the index of this token id in the stakedTokens array
            uint256 index = 0;
            for (
                uint256 i = 0;
                i < stakers[msg.sender].stakedBearTokens.length;
                i++
            ) {
                if (
                    stakers[msg.sender].stakedBearTokens[i].tokenId ==
                    _tokenId &&
                    stakers[msg.sender].stakedBearTokens[i].staker != address(0)
                ) {
                    index = i;
                    break;
                }
            }

            // Set this token's .staker to be address 0 to mark it as no longer staked
            stakers[msg.sender].stakedBearTokens[index].staker = address(0);

            // Decrement the amount staked for this wallet
            stakers[msg.sender].amountStaked--;

            // Update the mapping of the tokenId to the be address(0) to indicate that the token is no longer staked
            stakerAddress[_tokenId] = address(0);

            // Transfer the token back to the withdrawer
            contract_market.transferFrom(address(this), msg.sender, _tokenId);

            // Update the timeOfLastUpdate for the withdrawer
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }
    }

    // Calculate rewards for the msg.sender, check if there are any rewards
    // claim, set unclaimedRewards to 0 and transfer the ERC20 Reward token
    // to the user.
    function claimRewards() external {
        uint256 rewards = calculateRewards(msg.sender) +
            stakers[msg.sender].unclaimedRewards;
        require(rewards > 0, "You have no rewards to claim");


        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        stakers[msg.sender].unclaimedRewards = 0;
        rewardsToken.safeTransfer(msg.sender, rewards);
        // address payable receiver = payable(msg.sender);
        // receiver.transfer(rewards);
    }

    //////////
    // View //
    //////////

    function availableRewards(address _staker) public view returns (uint256) {
        uint256 rewards = calculateRewards(_staker) +
            stakers[_staker].unclaimedRewards;
        return rewards;
    }

    function getStakedTokens(address _user)
        public
        view
        returns (StakedToken[] memory)
    {
        // Check if we know this user
        if (stakers[_user].amountStaked > 0) {
            // Return all the tokens in the stakedToken Array for this user that are not -1
            StakedToken[] memory _stakedTokens = new StakedToken[](
                stakers[_user].amountStaked
            );
            uint256 _index = 0;

            for (uint256 j = 0; j < stakers[_user].stakedTokens.length; j++) {
                if (stakers[_user].stakedTokens[j].staker != (address(0))) {
                    _stakedTokens[_index] = stakers[_user].stakedTokens[j];
                    _index++;
                }
            }

            return _stakedTokens;
        }
        // Otherwise, return empty array
        else {
            return new StakedToken[](0);
        }
    }

    function getStakedHorseTokens(address _user)
        public
        view
        returns (StakedToken[] memory)
    {
        // Check if we know this user
        if (stakers[_user].amountStaked > 0) {
            // Return all the tokens in the stakedToken Array for this user that are not -1
            StakedToken[] memory _stakedTokens = new StakedToken[](
                stakers[_user].amountStaked
            );
            uint256 _index = 0;

            for (
                uint256 j = 0;
                j < stakers[_user].stakedHorseTokens.length;
                j++
            ) {
                if (
                    stakers[_user].stakedHorseTokens[j].staker != (address(0))
                ) {
                    _stakedTokens[_index] = stakers[_user].stakedHorseTokens[j];
                    _index++;
                }
            }

            return _stakedTokens;
        }
        // Otherwise, return empty array
        else {
            return new StakedToken[](0);
        }
    }

    function getStakedCatTokens(address _user)
        public
        view
        returns (StakedToken[] memory)
    {
        // Check if we know this user
        if (stakers[_user].amountStaked > 0) {
            // Return all the tokens in the stakedToken Array for this user that are not -1
            StakedToken[] memory _stakedTokens = new StakedToken[](
                stakers[_user].amountStaked
            );
            uint256 _index = 0;

            for (
                uint256 j = 0;
                j < stakers[_user].stakedCatTokens.length;
                j++
            ) {
                if (stakers[_user].stakedCatTokens[j].staker != (address(0))) {
                    _stakedTokens[_index] = stakers[_user].stakedCatTokens[j];
                    _index++;
                }
            }

            return _stakedTokens;
        }
        // Otherwise, return empty array
        else {
            return new StakedToken[](0);
        }
    }

    function getStakedBearTokens(address _user)
        public
        view
        returns (StakedToken[] memory)
    {
        // Check if we know this user
        if (stakers[_user].amountStaked > 0) {
            // Return all the tokens in the stakedToken Array for this user that are not -1
            StakedToken[] memory _stakedTokens = new StakedToken[](
                stakers[_user].amountStaked
            );
            uint256 _index = 0;

            for (
                uint256 j = 0;
                j < stakers[_user].stakedBearTokens.length;
                j++
            ) {
                if (stakers[_user].stakedBearTokens[j].staker != (address(0))) {
                    _stakedTokens[_index] = stakers[_user].stakedBearTokens[j];
                    _index++;
                }
            }

            return _stakedTokens;
        }
        // Otherwise, return empty array
        else {
            return new StakedToken[](0);
        }
    }

    /////////////
    // Internal//
    /////////////

    // Calculate rewards for param _staker by calculating the time passed
    // since last update in hours and mulitplying it to ERC721 Tokens Staked
    // and rewardsPerHour.
    function calculateRewards(address _staker)
        internal
        view
        returns (uint256 _rewards)
    {
        return (((
            ((block.timestamp - stakers[_staker].timeOfLastUpdate) *
                stakers[_staker].amountStaked)
        ) * rewardsPerHour) / 3600);
    }

    function storenative() public payable {
        // nothing to do here
        imna = 100;
    }

    function withdrawadmin(uint256 amount) external payable onlyOwner {
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed!");
    }

    function setrewardsPerHour(uint256 amount) public onlyOwner {
        rewardsPerHour = amount;
    }

    function emergencyWithdrawAll() external payable onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "Transfer failed!");
    }
}
