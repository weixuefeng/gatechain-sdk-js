var should = require('should');
import Transaction from '../src/transaction'
import Message from '../src/message'
import Fee from '../src/fee'

describe('transaction', function() {

    it('build and sign transaction', function(done) {
        let params = {
            accountNumber: 1306,
            chainId: 'testnet',
            network: 'testnet',
            validHeight: 10086,
            memo: ''
        };
        let tx = new Transaction(params);

        let msg = Message.buildMsgSend('cosmos16jr52rv76ygmzl2tuvjw3mw4f9drlstjvz6jpp', 'cosmos18ttnq3yaecgc9xmmjkue3u6uf5n5kcx0npzxak', 100, 'muon');
        tx.addMsg(msg);

        let fee = Fee.build(30000, 30, 'muon');
        tx.setFee(fee);

        let privateKey = 'e31668b196eef6682cd348279b9c10555906f864a2bd533cf2ecd2e3002b3a1c';
        tx.sign(privateKey);

        console.log(JSON.stringify(tx.toObject(), null, 4));

        done();
    });

    it('build and sign trade transaction', function(done) {
        let params = {
            accountNumber: 1306,
            chainId: 'gaia-13001',
            sequence: 0,
            memo: ''
        };
        let tx = new Transaction(params);

        let trade = {
            "tradeId": "10000",
            "market": "eos_stake",
            "makerOrderId": "1",
            "makerPubKey": "cosmospub1addwnpepq2fnzd6zepvjsrlgr9hs3zlcvdklycx35qyl23mmr3mdr2z9pslhzk0gx8x",
            "makerSide": "buy",
            "makerCoin": {
                "denom": "coin174876e800",
                "amount": "1000"
            },
            "makerPrice": {
                "denom": "stake",
                "amount": "1"
            },
            "makerSign": "wEQW0H1MDRQkJwW6Cv7QdNa7nHKknLCefJpAbrqOXiAakN3V3lO7pTggjTgLcTuFeFoK2hypiRKZfWhUZqbMuw==",
            "makerTime": "2019-06-13T02:58:11Z",
            "takerOrderId": "2",
            "takerPubKey": "cosmospub1addwnpepqtdnwvn9u5vhcq4wguqez2alulq5vdu9da9q0ce00ng4ex76hsczusdrxw0",
            "takerSide": "sell",
            "takerAmount": {
                "denom": "coin174876e800",
                "amount": "1000"
            },
            "takerPrice": {
                "denom": "stake",
                "amount": "1"
            },
            "takerSign": "vj28mUnMzjaZlhhFR+331azetnU0BJgMPx37aO9wS0B3gpUT1RLIaJoOuhdfR9c867KWJYv6tdDzDWeth80ehw==",
            "takerTime": "2019-06-13T02:58:11Z",
            "price": {
                "denom": "stake",
                "amount": "1"
            },
            "amount": {
                "denom": "coin174876e800",
                "amount": "10"
            },
            "makerAddAmount": {
                "denom": "coin174876e800",
                "amount": "10"
            },
            "makerDelAmount": {
                "denom": "stake",
                "amount": "10"
            },
            "makerFee": {
                "denom": "coin174876e800",
                "amount": "1"
            },
            "takerFee": {
                "denom": "stake",
                "amount": "1"
            },
            "time": "0001-01-01T00:00:00Z",
            "sender": "cosmos1sqpcmfmpxkrm55ca032tj2hsckj35rfp567fl8"
        };
        let msg = Message.buildMsgTrade(trade);
        tx.addMsg(msg);

        let fee = Fee.build(30000, 30, 'muon');
        tx.setFee(fee);

        let privateKey = 'e31668b196eef6682cd348279b9c10555906f864a2bd533cf2ecd2e3002b3a1c';
        tx.sign(privateKey);

        console.log(JSON.stringify(tx.toObject(), null, 4));

        done();
    });

    it('multi-sig', function(done) {
        let params = {
            accountNumber: 1,
            chainId: 'testing',
            sequence: 0,
            memo: ''
        };
        let tx = new Transaction(params);

        let msg = Message.buildMsgSend('gt21tjuuayhmzmfluvpcu6zmla4em0tss8ndz85hwq', 'gt11vdrs23ywese3q57wvgtfrfjw095nkllwykrmwn', 100, 'gt');
        tx.addMsg(msg);

        let fee = Fee.build(30000, 30, 'muon');
        tx.setFee(fee);

        let signatures = [
            // {
            //     publicKey: '02dbc535b4c570b8ffd32ec73dbe2324595e817f2b8dffaad16c7824994c84bdd7',
            //     signature: 'e68c8bdd30032351672c41b231939df0c416e06e08a668e33cbf308f03ddaeb0365f827c05da2496d7feb2708e90afbab4396f9ba6297c71241184e362a781c5'
            // },
            {
                publicKey: '03e0a001b2c863bc5b5944769ef85eac8cc49eef2a56ef2e236dda0ed3c0774e0e',
                signature: '206ed50cd81f781f5d11558d042eaa1c406c1e162d86cd524bbb5b938846b75850334895e1724e5365de29b25118d7f408c193834bf5a2b2587ea7132b92cb40'
            }
        ];
        let pubKeys = ['02dbc535b4c570b8ffd32ec73dbe2324595e817f2b8dffaad16c7824994c84bdd7', '03e0a001b2c863bc5b5944769ef85eac8cc49eef2a56ef2e236dda0ed3c0774e0e'];
        tx.setMultiSignatures(signatures, 1, pubKeys);

        console.log(JSON.stringify(tx.toObject(), null, 4));

        done();
    });
});
