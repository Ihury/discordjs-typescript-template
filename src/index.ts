import config from './config'
import Client from './structures/Client'

const client = new Client({ intents: ['Guilds'] })

client.login(config.DISCORD_BOT_TOKEN).catch(console.error)

process.on('unhandledRejection', (err) => {
  console.log(client.chalk.red('Unhandled Rejection:'))
  console.error(err)
})

process.on('uncaughtException', (err) => {
  console.log(client.chalk.red('Uncaught Exception:'))
  console.error(err)
})
