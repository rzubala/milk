import Base from './base'

class Weight extends Base {
    weight: number
    constructor(id: string, timestamp: number, weight: number) {
        super(id, timestamp)
        this.weight = weight
    }
}
export default Weight