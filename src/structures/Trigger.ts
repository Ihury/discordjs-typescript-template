import type { Interaction } from 'discord.js'

import type Bot from './Client'
import { TriggerBase } from './TriggerBase'

export default abstract class Trigger<T extends Interaction> extends TriggerBase {
  public readonly name: string
  abstract run: (interaction: T, args?: string[]) => Promise<void>

  constructor (client: Bot, name: string) {
    super(client)
    this.name = name
  }
}
