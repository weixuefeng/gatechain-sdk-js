
class Fee {
    static build(gas, fee, denom) {
        return {
            amount: [{
                amount: fee + '',
                denom: denom
            }],
            gas: gas + ''
        }
    }
}

export default Fee