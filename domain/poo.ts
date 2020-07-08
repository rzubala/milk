import Base from './base'

class Poo extends Base {
    count: number
    constructor(id: string, timestamp: number, count: number ) {
        super(id, timestamp)
        this.count = count
    }
}
export default Poo