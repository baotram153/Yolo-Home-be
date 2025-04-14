const { PrismaClient, Prisma } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
    const tables = ["user", "device", "notification", "automationScenario", "deviceLog", "deviceCommand", "feed"]
    for (const table of tables.slice().reverse()) {
        await prisma[table].deleteMany()
        console.log(`Deleted all records from ${table}`)
    }

    for (const table of tables) {
        await prisma[table].createMany({
            data: require(`./seed/${table}.json`),
        })
        console.log(`Seeded ${table}`)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

