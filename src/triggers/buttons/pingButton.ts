import type { ButtonInteraction } from 'discord.js'

import type Bot from '../../structures/Client'
import Trigger from '../../structures/Trigger'

export default class PingButton extends Trigger<ButtonInteraction> {
  constructor (client: Bot) {
    super(client, 'ping')
  }

  run = async (interaction: ButtonInteraction): Promise<void> => {
    await interaction.reply({
      content: 'Button clicked!',
      ephemeral: true
    })
  }
}
