import 'dotenv/config'

export default {
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID ?? '',
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN ?? '',
  API_BASE_URL: process.env.API_BASE_URL ?? ''
}
