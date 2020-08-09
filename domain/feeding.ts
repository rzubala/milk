class Feeding {
    id: string
    date: Date
    volume: number
    diff?: number
    sumMax: boolean = false
    max: boolean = false

    constructor(id: string, date: Date, volume: number) {
        this.id = id
        this.date = date
        this.volume = volume
    }

    setMax = () => {
        this.max = true
    }
    setSumMax = () => {
        this.sumMax = true
    }
}

export default Feeding