/**
* No soy bueno explicando asi que aca dejo el code
*/
// Carpeta index.js
const { Client, Collection, MessageEmbed, DiscordAPIError } = require('discord.js');
const client = new Client({
    disableMentions: "everyone",
    restTimeOffset: 0,
    ws: { intents: 32767 }
});

const Discord = require('discord.js');
const fs = require('fs');
client.commands = new Collection();
client.comandos = new Discord.Collection()

let nombres = fs.readFileSync("<ruta de la carpeta>").filter((f) => f.endsWith(".js"))

for (var nombre of nombres) {
    let comandos = require("<ruta de la carpeta>/" + nombre)
    client.comandos.set(comandos.name, comandos)
    var ping = new Date()
    console.log(`Archivo ${nombre} cargado correctamente | [${ping.getMilliseconds()}ms]`)
}

client.on('message', async (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let prefix = "<prefix>"
    if(!message.content.startsWith(prefix)) return;
    
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let cmd = client.comandos.get(command) || client.comandos.find((c) => c.aliases && c.aliases.includes(command));
    if(!cmd) {
        return cmd.run(client, message, args)
    }
});

// Esto ira en la carpeta que quieran, o donde este comando
module.exports = {
    name: "nombre del comando",
    aliases: ["alias del comando"],
    description: "una breve descripcion si queremos si no lo excluimos",
    run: async (client, message, args) => {
        message.channel.send("Si funciona el comando, ahora ya tienes el Command Handler listo :)")
    }
}
