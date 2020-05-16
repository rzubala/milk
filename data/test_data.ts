import Feeding from '../domain/feeding'

const TEST_DATA: Feeding[] = [
    new Feeding("1", new Date(2020, 4, 9, 3, 24, 0), 60),
    new Feeding("2", new Date(2020, 4, 9, 9, 12, 0), 70),
    new Feeding("3", new Date(2020, 4, 9, 13, 55, 0), 80),

    new Feeding("4", new Date(2020, 4, 10, 4, 25, 0), 65),
    new Feeding("5", new Date(2020, 4, 10, 10, 13, 0), 75),
    new Feeding("6", new Date(2020, 4, 10, 14, 45, 0), 85),
]

export default TEST_DATA