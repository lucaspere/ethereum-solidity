// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/ITokenPair.sol";
import "./interfaces/IPairFactory.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

abstract contract TokenPair is ITokenPair, ERC20, ReentrancyGuard {
    address public factory;
    address public tokenA;
    address public tokenB;
    uint256 public kLast;
    uint256 private reserveA;
    uint256 private reserveB;
    uint256 private constant MINIMUM_LIQUIDITY = 10**3;
    uint256 private blockTimestampLast;

    bytes4 private constant SELECTOR =
        bytes4(keccak256(bytes("transfer(address,uint256)")));

    constructor() ERC20("DEX Token Pair", "DEX-TP") {
        factory = msg.sender;

    }

    function initialize(address _tokenA, address _tokenB) external {
        require(msg.sender == factory, "NOT_FACTORY");
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function getReserves()
        public
        view
        returns (
            uint256 _reserveA,
            uint256 _reserveB,
            uint256 _blockTimestampLast
        )
    {
        _reserveA = reserveA;
        _reserveB = reserveB;
        _blockTimestampLast = blockTimestampLast;
    }

    function _setReserves(uint256 _reserveA, uint256 _reserveB) private {
        reserveA = _reserveA;
        reserveB = _reserveB;
        blockTimestampLast = block.timestamp;

        emit Sync(reserveA, reserveB);
    }

    function _safeTransfer(address token, address to, uint256 value) private {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(SELECTOR, to, value)
        );

        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TRANSFER_FAILED"
        );
    }

    function mint(
        address to
    ) external nonReentrant returns (uint256 liquidity) {
        (uint256 _reserveA, uint256 _reserveB, ) = getReserves();

        uint256 balanceA = IERC20(tokenA).balanceOf(address(this));
        uint256 balanceB = IERC20(tokenB).balanceOf(address(this));

        uint256 amountA = balanceA - _reserveA;
        uint256 amountB = balanceB - _reserveB;

        bool hasReward = _mintReward(_reserveA, _reserveB);
        uint256 _totalSupply = totalSupply();

        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amountA * amountB) - MINIMUM_LIQUIDITY;
        } else {
            liquidity = Math.min(
                (amountA * _totalSupply) / _reserveA,
                (amountB * _totalSupply) / _reserveB
            );
        }

        require(liquidity > 0, "INSUFFICIENT_LIQUIDITY_MINTED");

        _mint(to, liquidity);

        _setReserves(balanceA, balanceB);

        if(hasReward) kLast = reserveA * reserveB;
        emit Mint(msg.sender, amountA, amountB);
    }

    function _mintReward(uint256 _reserveA, uint256 _reserveB) private returns (bool hasReward) {
        address rewardTo = IPairFactory(factory).rewardTo();
        hasReward = rewardTo != address(0);
        uint256 _kLast = kLast; // gas saving
        if (hasReward) {
            if(_kLast != 0) {
                uint256 rootK = Math.sqrt(_reserveA * _reserveB);
                uint256 rootKLast = Math.sqrt(_kLast);

                if(rootK > _kLast) {
                    uint256 liquidity = (totalSupply() * (rootK - _kLast)) / (rootKLast + rootK * 9);

                    if (liquidity > 0) {
                        _mint(rewardTo, liquidity);
                    }
                }
            }
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }

    function burn(address to) external nonReentrant() returns (uint256 amountA, uint256 amountB) {
        
    }
}
