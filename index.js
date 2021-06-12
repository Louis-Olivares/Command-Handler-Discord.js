/**
 * Declaraciones requerimos de discord.js | Instalación: npm install discord.js --save ó npm i discord.js
 */
const { Client, Collection, MessageEmbed, DiscordAPIError } = require('discord.js'); // definimos Client, Collection.... y lo de mas que utilizaremos.
// Definimos client
const client = new Client({
    disableMentions: "everyone",
    restTimeOffset: 0,
    ws: { intents: 32767 }
});
// Definimos Discord
const Discord = require('discord.js');
// Definimos Fs
const fs = require('fs');
// Collection
client.commands = new Collection();
// Comenzamos con la base del "Command Handler"
// requerimos Collection
client.comandos = new Discord.Collection()
// Creamos un let el cual contene la carpeta que llamaremos

let nombres = fs.readFileSync("<ruta de la carpeta>").filter((f) => f.endsWith(".js"))
/**
 * Aca esta el Punto Infortante, si tenemos mas carpetas con mas comandos por separados tendriamos que hacer otro let con diferente nombre y llamando a la otra carpeta
 * un ejemplo de ello es este 
 * let nombre n2 = fs.readFileSync("<ruta de la carpeta n2>").filter((f) => f.endsWith(".js"))
 * se pondria abajo de la primera ruta que llamamos
 */
// Ahora para llamar los archivos de cada cartera lo hacemos de la siguiente manera
for (var nombre of nombres) {
    let comandos = require("<ruta de la carpeta>/" + nombre) // aca se debe dejar el "/" para que pueda entrar y ver los archivos ejemplo <../../carpeta/ + nombre>
    client.comandos.set(comandos.name, comandos)
    var ping = new Date() // esto es Opcional, pero muestra el Ping que tiene cada archivo al cargar en la consola
    console.log(`Archivo ${nombre} cargado correctamente | [${ping.getMilliseconds()}ms]`)
}
/**
 * Si agregan otra carpeta de comandos tendrian que agregar otro for debajo de este mismo.
 */
// Ahora debemos llamar al comando por el nombre para que nos mande un mensaje al chat cuando requeramos el comando
// Creamos un client.on
client.on('message', async (message) => { // pueden poner en ves de (message) poner (msg)
    if(message.author.bot) return; // identificamos si es un bot que retorne a los mensajes
    if(message.channel.type == "dm") return; // identificamos si es en el dm del bot que require el comando retorne para que no, nos mande error de "id of undefined"

    let prefix = "<prefix>" // Definimos prefix
    if(!message.content.startsWith(prefix)) return; // Le decimos que si ponen no mas el prefix retorne para que no nos de error
    
    let args = message.content.slice(prefix.length).trim().split(/ +/g); // definimos argumentos
    let command = args.shift().toLowerCase(); // definimos command (comandos)

    /**
     * Ahora comenzaremos el code para que lleme el nombre de cada archivo
     */
    let cmd = client.comandos.get(command) || client.comandos.find((c) => c.aliases && c.aliases.includes(command)); // Llamamos al comando y si no lo reconoce por el nombre que lo llame por el alias
    if(!cmd) {
        return cmd.run(client, message, args) // definimos client, mesasge y args en el run para que funcione a la hora de llamar el comando o requerirlo
    } // y por ultimo cerramos el comando
}); 

/**
 * Ya tenemos lista para poner cualquier comando y que funcionen ahora nos falta poner a funcionar el comando
 * para ello debemos crear algun comando, para ello crearemos un ejemplo del ping.
 */
// Demos poner en la carpeta que requerimos el archivo que queramos
module.exports = {
    name: "nombre del comando",
    aliases: ["alias del comando"],
    description: "una breve descripcion si queremos si no lo excluimos",
    run: async (client, message, args) => { // llamamos la funcion del run
        // agregamos cualquier comando
        message.channel.send("Si funciona el comando, ahora ya tienes el Command Handler listo :)")
        /**
         * y asi agregas el comando si es en Embed tambien es facil Solo que tienes que llamar a Discord ó MessageEmbed
         */
    }
}
// Para el embed 

const { MessageEmbed } = require('discord.js'); // llamamos a MessageEmbed

module.exports = {
    name: "nombre del comando",
    aliases: ["alias del comando"],
    description: "una breve descripcion si queremos si no lo excluimos",
    run: async (client, message, args) => { // llamamos la funcion del run
        const mensajeembed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Si funciona el comando, ahora ya tienes el Command Handler listo :)")
        message.channel.send(mensajeembed);
        /**
         * y ya estaria todo recuerda, cuando uses const debes ponerlo arriba del (module.exports = {)
         */
    }
}

/**
 * Espero averlos ayudado con este facil Command Handler si tienen alguna duda me escriven al Discord: Louis.#5409
 * que los estare ayudando con gusto
 */