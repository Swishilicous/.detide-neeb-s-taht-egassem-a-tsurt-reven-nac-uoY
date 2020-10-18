const { Plugin } = require('powercord/entities');
const { channels, getModule } = require('powercord/webpack');
const unicode = ' ‫';
const zws = '​';
module.exports = class edited extends Plugin {
  startPlugin () {
    const queue = getModule(x => x.enqueue, false);
    const { editMessage } = getModule(['editMessage', 'sendMessage'], false);
    powercord.api.commands.registerCommand({
      command: 'edited',
      description: 'Replaces "edited" with the actual edited text that shows up on edited messages.',
      usage: '{c} <before edited> edited <after edited>',
      executor: (args) => {
        const msg = `${args.join(' ').split('edited').reverse().map(str => unicode + str).join('')}${zws}`;
        queue.enqueue({ message: { content: msg,
          channelId: channels.getChannelId() },
        type: 0
        }, e => {
          editMessage(e.body.channel_id, e.body.id, { content: msg.replace(zws, ''),
            channelId: channels.getChannelId() });
        }
        );
      }
    });
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('edited');
  }
};
