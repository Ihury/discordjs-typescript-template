import type { AutocompleteInteraction, StringSelectMenuInteraction, CommandInteraction, Interaction, ButtonInteraction, ModalSubmitInteraction } from 'discord.js'

import Event from '../../structures/Event'
import type Bot from '../../structures/Client'

export default class InteractionCreateEvent extends Event {
  constructor (client: Bot) {
    super(client, 'interactionCreate')
  }

  run = async (interaction: Interaction): Promise<void> => {
    if (!interaction.inGuild()) return

    if (interaction.isCommand() || interaction.isMessageContextMenuCommand()) {
      await this.handleCommandInteraction(interaction).catch(console.error)
    } else if (interaction.isAutocomplete()) {
      await this.handleAutocompleteInteraction(interaction).catch(console.error)
    } else if (interaction.isStringSelectMenu()) {
      await this.handleStringSelectMenuInteraction(interaction).catch(console.error)
    } else if (interaction.isButton()) {
      await this.handleButtonInteraction(interaction).catch(console.error)
    } else if (interaction.isModalSubmit()) {
      await this.handleModalSubmitInteraction(interaction).catch(console.error)
    }
  }

  private async handleCommandInteraction (interaction: CommandInteraction): Promise<void> {
    const command = this.client.commands.find(
      (c) => c.data.name === interaction.commandName
    )

    if (command === undefined) return

    command.run(interaction).catch(console.error)
  }

  private async handleAutocompleteInteraction (interaction: AutocompleteInteraction): Promise<void> {
    const command = this.client.commands.find(
      (c) => c.data.name === interaction.commandName
    )

    if (command === undefined) return

    command.autocomplete(interaction).catch(console.error)
  }

  private async handleStringSelectMenuInteraction (interaction: StringSelectMenuInteraction): Promise<void> {
    const [name, ...args] = interaction.customId.split(' ')
    const menu = this.client.triggers.menus.find((m) => m.name === name)
    if (menu === undefined) return

    menu.run(interaction, args).catch(console.error)
  }

  private async handleButtonInteraction (interaction: ButtonInteraction): Promise<void> {
    const [name, ...args] = interaction.customId.split(' ')
    const button = this.client.triggers.buttons.find((m) => m.name === name)
    if (button === undefined) return

    button.run(interaction, args).catch(console.error)
  }

  private async handleModalSubmitInteraction (interaction: ModalSubmitInteraction): Promise<void> {
    const [name, ...args] = interaction.customId.split(' ')
    const modal = this.client.triggers.modals.find((m) => m.name === name)
    if (modal === undefined) return

    modal.run(interaction, args).catch(console.error)
  }
}
