var should = require('should');
import * as address from '../src/address'
import * as utils from '../src/utils'
import bech32 from 'bech32'

describe('address', function() {

    it('generate and check address', function(done) {
        // const publicKey = 'caa45aef1a16bd3ad79afa3e9d169e5e1091e76bc0c7e500424b8fa712346b11';
        const publicKey = Buffer.from('IS8A9dlM7gOoZGu6cxazu2TC4M4QCk5bwedFEelVDOs=', 'base64');
        console.log(publicKey.toString('hex'))
        const expectedAddress = 'gc11h9rf5u4xr08ka7mmvnv95cy993k2m7vtwx97aa';

        let addr = address.genSingleSigAddress(publicKey);
        console.log(addr);

        let valid = address.checkAddress(addr);
        console.log(valid);

        // should(addr).be.equal(expectedAddress);
        // should(valid).be.exactly(true);

        addr = address.genSingleSigAddress(publicKey, address.VAULT_SINGLE_SIG_ADDRESS_PREFIX);
        console.log(addr);

        valid = address.checkAddress(addr);
        console.log(valid);

        console.log(address.checkAddress('0xd07b4f8462671f3d6322abcd28151c4cc5bdb0b2'));
        console.log(address.checkEthChecksumAddress('0x3574f849b6ffED10Ca661DD242770AF6048A78F8'));
        console.log(address.checkAddress('0xd07b4f8462671f3d6322abcd28151c4cc5bdb0b200'));
        console.log(address.checkEthChecksumAddress('0x3574f849b6ffED10Ca661DD242770AF6048A78f8'));

        done();
    });

    it('generate and check multi-sig address', function(done) {
        const pubKey1 = '02dbc535b4c570b8ffd32ec73dbe2324595e817f2b8dffaad16c7824994c84bdd7';
        const pubKey2 = '03e0a001b2c863bc5b5944769ef85eac8cc49eef2a56ef2e236dda0ed3c0774e0e';
        const expectedAddress = 'gt2145szpwmnetulqs3nlq8xnk2uaptac8avlgwwpt';

        let addr = address.genMultiSigAddress([pubKey1, pubKey2], 1);
        console.log(addr);

        let valid = address.checkAddress(addr);
        console.log(valid);

        // should(addr).be.equal(expectedAddress);
        // should(valid).be.exactly(true);

        addr = address.genMultiSigAddress([pubKey1, pubKey2], 1, address.VAULT_SINGLE_SIG_ADDRESS_PREFIX);
        console.log(addr);

        valid = address.checkAddress(addr);
        console.log(valid);

        let a = 'gc1pub18q2fguggqyfztc0p5razq5du4enurxq5tuwt0l246hyfnx4e46ffq2zrmdu62qeg9akle98fzgj7rcdqlgsgws8qcmue8ds7nurjvejkydtv0eqjy9gc7qvxev3gknwl3q97zyqwcg9ek';
        let decoded = bech32.decode(a, 1023);
        console.log(Buffer.from(bech32.fromWords(decoded.words)).toString('hex'))

        a = 'gc1pub1ytql0csgqyfz2pmdfxzjqz6e77y5p2rs5pkwwakcjukjycwa4nzxrd2tmanmd9z3re6fjdc6zgjswm2fs5sr83n4xgxh9lcufhfrt98q02zlngpcht75wzz75f84ea80fesxmustuzjdz';
        decoded = bech32.decode(a, 1023);
        console.log(Buffer.from(bech32.fromWords(decoded.words)).toString('hex'))

        // a = 'gt1pub1addwnpepqtdu2dd5c4ct3l7n9mrnm03ry3v4aqtl9wxll2k3d3uzfx2vsj7aw980yfa';
        // decoded = bech32.decode(a, 1023);
        // console.log(Buffer.from(decoded.words).toString('hex'))
        //
        // console.log(utils.genMultiSigPubKeyBech32([pubKey1, pubKey2], 1))

        done();
    });

});
