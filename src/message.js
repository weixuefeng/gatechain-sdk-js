
var Type = {
    MsgSend: 'MsgSend',
    MsgCreateVault: 'MsgCreateVault',
    MsgRevocableSend: 'MsgRevocableSend',
    MsgRevoke: 'MsgRevoke',
    MsgUpdateClearingHeight: 'MsgUpdateClearingHeight',
    MsgClearVaultAccount: 'MsgClearVaultAccount',
    MsgPublishMultiSigAccount: 'MsgPublishMultiSigAccount',
    MsgDelegate: 'MsgDelegate',
    MsgUndelegate: 'MsgUndelegate',
    MsgWithdrawDelegationReward: 'MsgWithdrawDelegationReward',
    MsgBeginRedelegate: 'MsgBeginRedelegate',

    MsgTrade: 'MsgDexTrade',
    MsgDexDeposit: 'MsgDexDeposit'
};

class Message {
    static buildMsgSend(from, to, amount, denom) {
        return {
            type: Type.MsgSend,
            value: {
                amount: [{
                    amount: amount + '',
                    denom: denom
                }],
                from_address: from,
                to_address: to
            }
        }
    }

    static buildMsgCreateVault(from, to, securityAddress, amount, denom, clearHeight, delayHeight, pubKey) {
        return {
            type: Type.MsgCreateVault,
            value: {
                amount: [
                    {
                        amount: amount + '',
                        denom: denom
                    }
                ],
                clearing_height: clearHeight + '',
                delay_height: delayHeight + '',
                from_address: from,
                pubkey: pubKey || '',
                security_address: securityAddress,
                to_address: to
            }
        }
    }

    static buildMsgRevocableSend(from, to, amount, denom) {
        return {
            type: Type.MsgRevocableSend,
            value: {
                amount: [
                    {
                        amount: amount + '',
                        denom: denom
                    }
                ],
                from_address: from,
                to_address: to
            }
        }
    }

    static buildMsgRevoke(vaultAddress, securityAddress, revokeAddress, height, txHash, msgIndex, amount, denom) {
        return {
            type: Type.MsgRevoke,
            value: {
                amount: [
                    {
                        amount: amount + '',
                        denom: denom
                    }
                ],
                vault_address: vaultAddress,
                security_address: securityAddress,
                revoke_address: revokeAddress,
                height: height,
                tx_hash: txHash,
                msg_index: msgIndex
            }
        }
    }

    static buildMsgUpdateClearingHeight(vaultAddress, clearHeight) {
        return {
            type: Type.MsgUpdateClearingHeight,
            value: {
                clearing_height: clearHeight + '',
                vault_address: vaultAddress
            }
        }
    }

    static buildMsgClearVaultAccount(from, vaultAddress) {
        return {
            type: Type.MsgClearVaultAccount,
            value: {
                from_address: from,
                vault_address: vaultAddress
            }
        }
    }

    static buildMsgTrade(trade) {
        return {
            type: Type.MsgTrade,
            value: {
                Trade: {
                    tradeId: trade.tradeId,
                    market: trade.market,
                    makerOrderId: trade.makerOrderId,
                    makerPubKey: trade.makerPubKey,
                    makerSide: trade.makerSide,
                    makerCoin: {
                        denom: trade.makerCoin.denom,
                        amount: trade.makerCoin.amount
                    },
                    makerPrice: {
                        denom: trade.makerPrice.denom,
                        amount: trade.makerPrice.amount
                    },
                    makerSign: trade.makerSign,
                    makerTime: trade.makerTime,
                    takerOrderId: trade.takerOrderId,
                    takerPubKey: trade.takerPubKey,
                    takerSide: trade.takerSide,
                    takerAmount: {
                        denom: trade.takerAmount.denom,
                        amount: trade.takerAmount.amount
                    },
                    takerPrice: {
                        denom: trade.takerPrice.denom,
                        amount: trade.takerPrice.amount
                    },
                    takerSign: trade.takerSign,
                    takerTime: trade.takerTime,
                    price: {
                        denom: trade.price.denom,
                        amount: trade.price.amount
                    },
                    amount: {
                        denom: trade.amount.denom,
                        amount: trade.amount.amount
                    },
                    makerAddAmount: {
                        denom: trade.makerAddAmount.denom,
                        amount: trade.makerAddAmount.amount
                    },
                    makerDelAmount: {
                        denom: trade.makerDelAmount.denom,
                        amount: trade.makerDelAmount.amount
                    },
                    makerFee: {
                        denom: trade.makerFee.denom,
                        amount: trade.makerFee.amount
                    },
                    takerFee: {
                        denom: trade.takerFee.denom,
                        amount: trade.takerFee.amount
                    },
                    time: trade.time,
                    sender: trade.sender
                }
            }
        }
    }

    static buildMsgDexDeposit(from, to, amount, denom) {
        return {
            type: Type.MsgDexDeposit,
            value: {
                Deposit: {
                    amount: [{
                        amount: amount + '',
                        denom: denom
                    }],
                    from: from,
                    to: to
                }
            }
        }
    }

    static buildMsgPublishMultiSigAccount(from, to, pubKey) {
        return {
            type: Type.MsgPublishMultiSigAccount,
            value: {
                from_address: from,
                to_address: to,
                pubkey: pubKey
            }
        }
    }

    static buildMsgDelegate(delegator, conAddress, amount, denom) {
        return {
            type: Type.MsgDelegate,
            value: {
                amount: {
                    amount: amount + '',
                    denom: denom
                },
                delegator_address: delegator,
                'con-account_address': conAddress
            }
        }
    }

    static buildMsgUndelegate(delegator, conAddress, amount, denom) {
        return {
            type: Type.MsgUndelegate,
            value: {
                amount: {
                    amount: amount + '',
                    denom: denom
                },
                delegator_address: delegator,
                'con-account_address': conAddress
            }
        }
    }

    static buildMsgWithdrawDelegationReward(delegator, conAddress) {
        return {
            type: Type.MsgWithdrawDelegationReward,
            value: {
                delegator_address: delegator,
                'con-account_address': conAddress
            }
        }
    }

    static buildMsgBeginRedelegate(delegator, conAddressSrc, conAddressDst, amount, denom) {
        return {
            type: Type.MsgBeginRedelegate,
            value: {
                amount: {
                    amount: amount + '',
                    denom: denom
                },
                delegator_address: delegator,
                'con-account_src_address': conAddressSrc,
                'con-account_dst_address': conAddressDst
            }
        }
    }
}

Message.Type = Type;

export default Message