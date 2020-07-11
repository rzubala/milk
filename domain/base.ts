import { timezone } from "expo-localization"

class Base {
    id: string
    timestamp: number
    constructor(id: string, timestamp: number) {
        this.id = id
        this.timestamp = timestamp
    }
}
export default Base