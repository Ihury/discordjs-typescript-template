import type Bot from './Client'
import { TriggerBase } from './TriggerBase'

export default abstract class Event extends TriggerBase {
  public readonly name: string

  constructor (client: Bot, name: string) {
    super(client)
    this.name = name
  }
}
