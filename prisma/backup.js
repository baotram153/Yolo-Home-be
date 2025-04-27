const fs = require('fs')
const { PrismaClient, Prisma } = require("@prisma/client")
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    
    // Get all users
    const data = {
    users : await prisma.user.findMany(),
    automationScenarios : await prisma.automationScenario.findMany(),
    devices : await prisma.device.findMany(),
    deviceCommands : await prisma.deviceCommand.findMany(),
    deviceLogs : await prisma.deviceLog.findMany(),
    feed : await prisma.feed.findMany(),
    notifications : await prisma.notification.findMany(),
    userSessions : await prisma.userSession.findMany(),
    }
    
    // Convert to JSON and write to file
    Object.keys(data).forEach((key) => {
        console.log(`Found ${data[key].length} records in ${key}`)
        fs.writeFileSync(
            path.resolve(__dirname, `./backup_seed/${key}.json`), 
            JSON.stringify(data[key], null, 2), 'utf-8')
    })

    console.log('Backup completed successfully!')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })