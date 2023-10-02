import { EmbedBuilder } from 'discord.js'
import { DateTime } from 'luxon'

import colors from '../assets/colors'
import type Bot from './Client'

export default class DefaultEmbeds {
  public client: Bot | undefined

  setClient = (client: Bot): void => {
    this.client = client
  }

  error = (message: string): EmbedBuilder => {
    return new EmbedBuilder({
      title: 'Oops...',
      color: colors.PASTEL_RED,
      timestamp: DateTime.now().toMillis(),
      description: `\`\`\`${message}\`\`\``,
      footer: {
        text: `${this.client?.user?.username} | ${this.client?.user?.id}`,
        iconURL: this.client?.user?.displayAvatarURL()
      }
    })
  }
}
