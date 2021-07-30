const { Plugin } = require("powercord/entities");

module.exports = class Sarcasm extends Plugin {
    startPlugin() {
        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substring(0,index) + chr + str.substring(index+1);
        }

        powercord.api.commands.registerCommand({
            command: 'sarcasm',
            aliases: [ 'sarc' ],
            description: 'Converts your message to sarcasm',
            usage: '{c} [ message ]',

            executor: (args) => {
                let content = args.join(' ');
                content = content.toLowerCase();
                
                for (let i = 0; i < content.length; i += 2) {
                    content = setCharAt(content, i, content[i].toUpperCase());
                }
                
                return {
                    send: true,
                    result: content
                }
            },

            autocomplete : (args) => {
                if (args.length < 1) {
                    return false;
                } else {
                    return {
                        commands: {
                            command: "message",
                            description: 'message'
                        },
                        header: "Sarcasm Converter"
                    }
                }
            }
        })
    }

    pluginWillUnload () {
        powercord.api.commands.unregisterCommand('sarcasm');
    }
}