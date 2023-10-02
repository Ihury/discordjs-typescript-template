import type { AutocompleteInteraction, CommandInteraction } from 'discord.js'
import { ActionRowBuilder, ButtonBuilder } from 'discord.js'

import type Bot from '../structures/Client'
import Command from '../structures/Command'

export default class PingCommand extends Command {
  constructor (client: Bot) {
    super(client, {
      name: 'ping',
      description: 'Pong!'
    })
  }

  run = async (interaction: CommandInteraction): Promise<void> => {
    const button = new ButtonBuilder({
      label: 'Click me!',
      customId: 'ping',
      style: 1
    })

    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [button]
    })

    await interaction.reply({
      content: 'Pong!',
      ephemeral: true,
      components: [row]
    })
  }

  autocomplete = async (interaction: AutocompleteInteraction): Promise<void> => {}
}
