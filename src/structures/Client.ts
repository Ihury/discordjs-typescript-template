import { Client, type ClientOptions, type ApplicationCommandData } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'

import { capitalize } from '../utils/utils'
import DefaultEmbeds from './DefaultEmbeds'
import ApiController from './ApiController'
import type Trigger from './Trigger'
import type Command from './Command'
import config from '../config'

export default class Bot extends Client {
  public chalk: typeof chalk
  public defaultEmbeds: DefaultEmbeds
  public apiController: ApiController
  public triggers: Record<string, Array<Trigger<any>>> = {}
  public commands: Command[] = []
  public config = config

  constructor (options: ClientOptions) {
    super(options)

    this.chalk = chalk
    this.defaultEmbeds = new DefaultEmbeds()
    this.apiController = new ApiController()
  }

  private readonly readTriggers = async (
    dir: string,
    callback: (data: any) => void
  ): Promise<void> => {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)

      if (fs.statSync(filePath).isDirectory()) { await this.readTriggers(filePath, callback) }

      if (file.endsWith('.ts')) {
        const data = await import(
          `file:///${path.join(process.cwd(), filePath)}`
        )
        callback(data.default)
      }
    }
  }

  private readonly registryEvents = async (dir: string): Promise<void> => {
    await this.readTriggers(dir, (Event) => {
      const event = new Event(this)
      this.on(event.name, event.run)
    })
  }

  private readonly registryTriggers = async (dir: string): Promise<void> => {
    const triggers = fs.readdirSync(dir)
    for (const trigger of triggers) {
      this.triggers[trigger] = []
      await this.readTriggers(path.join(dir, trigger), (Trigger) => {
        const triggerObject = new Trigger(this)
        this.triggers[trigger].push(triggerObject)
      })
      console.log(this.chalk.cyan(`${capitalize(trigger)} loaded!`))
    }
  }

  private readonly readCommands = async (dir: string): Promise<void> => {
    await this.readTriggers(dir, (Command) => {
      const command = new Command(this)
      this.commands.push(command)
    })
  }

  public registryCommands = async (global = false): Promise<void> => {
    try {
      const commands: ApplicationCommandData[] = this.commands.map((command) => command.data)
      if (global) {
        await this.application?.commands.set(commands)
        console.log(this.chalk.cyan('Command registered globally!'))
      } else {
        const guild = this.guilds.cache.get(
          process.env.DISCORD_GUILD_ID as string
        )
        if (guild == null) {
          console.log(this.chalk.red('Guild not found to registry commands!'))
          return
        }

        await guild.commands.set(commands)
        console.log(this.chalk.cyan('Command registered in guild!'))
      }
    } catch (err) {
      console.error(err)
    }
  }

  public async login (token: string): Promise<string> {
    await this.registryEvents('./src/events')
    console.log(chalk.cyan('\nEvents loaded!'))

    await this.registryTriggers('./src/triggers')
    console.log(chalk.cyan('Triggers loaded!'))

    await this.readCommands('./src/commands')
    console.log(chalk.cyan('Commands loaded!\n'))

    return await super.login(token)
  }
}
