import chalk from 'chalk'

import type Bot from './Client'
import type ApiController from './ApiController'
import type DefaultEmbeds from './DefaultEmbeds'

export abstract class TriggerBase {
  public readonly client: Bot
  public readonly chalk: typeof chalk
  public readonly api: ApiController
  public readonly defaultEmbeds: DefaultEmbeds

  constructor (client: Bot) {
    this.client = client
    this.chalk = chalk
    this.api = client.apiController
    this.defaultEmbeds = client.defaultEmbeds
  }
}
