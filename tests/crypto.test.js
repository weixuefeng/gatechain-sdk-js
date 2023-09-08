var should = require('should');
import * as crypto from '../src/crypto'
import * as Ripemd from '../src/crypto_api/ripemd.js'
import {toHex} from "../src/crypto_api/hex.js";

describe('crypto', function() {

    it('sign and verify message', function(done) {
        let privateKey = '401f37d21daa682cd6c3404b47803596ae2610d4c27a827b96151c14157a1f6e';
        let publicKey = 'caa45aef1a16bd3ad79afa3e9d169e5e1091e76bc0c7e500424b8fa712346b11';

        console.log(crypto.getPublicKey(privateKey).toString('hex'));
        should(crypto.getPublicKey(privateKey).toString('hex')).be.equal(publicKey);

        let message = 'hello world';

        let sig = crypto.sign(privateKey, message);
        console.log('signature:', sig.toString('hex'));

        let verify = crypto.verify(publicKey, message, sig.toString('hex'));
        console.log('verify:', verify);

        done();
    });

    it('test ripemd320', function(done) {
        let str = 'wangmmx'
        let expectedHasher = '4cd0453cd3bd51e08110ead3fb7a3cdc83374d1472a1271378633ad6ac9cee74ef1916147ed330ae';
        let hasher = new Ripemd.default({length: 320});
        hasher.update(str);
        let result = toHex(hasher.finalize());
        console.log(result)
        should(result).be.equal(expectedHasher);
        done();
    });

    it('test sha512', function(done) {
        let buffer = Buffer.from('7b22636861696e5f6964223a22746573746e657420222c22666565223a7b22616d6f756e74223a5b7b22616d6f756e74223a2231222c2264656e6f6d223a224e414e4f4754227d5d2c22676173223a22383031227d2c226d656d6f223a22222c226d736773223a5b5b2267743131743361743835653464347a3233787737367132663535707371763732766b34793263646638346563326c647a616a7865376c726c6d6d3076796c3538663576766a3636753378225d5d2c226e6f6e636573223a5b224d513d3d225d2c2276616c69645f686569676874223a5b2231222c22313030225d7d', 'hex');
        let result = crypto.sha256(buffer);
        console.log(result.toString('hex'));
        done();
    });
});
