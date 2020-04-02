
const Discord = require('discord.js');
var HashMap = require('hashmap');
const bot = new Discord.Client();
const token = 'NjkyODY5NDY4MTY2MDI5Mzg0.XoVyEg.J8aFGeO-AKR4N2uMqGF23ctnRD4';
const PREFIX = "!";
const emojiChannelID = '653442253234110469';
fs = require('fs');

class User{
    constructor(uname){
        this.name = uname;

    }
    static users = new HashMap();
    amountOfPosts = 0;
    amountPinned = 0;
    amountDeleted = 0;
    amountofW = 0;
    amountofL = 0;
   
    get toString(){
        return 'User ' + this.name + " has " + this.amountOfPosts + " posts, " + this. amountPinned + " pins, " + this.amountDeleted + " deleted, " + this.amountofW + " Ws, " + this.amountofL + " Ls." ;
      }
    get amountOfPosts(){
        return this.amountOfPosts;
    }
    get amountPinned(){
        return this.amountPinned;
    }
    get amountDeleted(){
        return this.amountDeleted;
    }
    get amountofW(){
        return this.amountofW;
    }
    get amountofL(){
        return this.amountofL;
    }
    set amountOfPosts(x){
        this.amountOfPosts = x;
    }
    set amountPinned(x){
        this.amountPinned = x;
    }
    set amountDeleted(x){
        this.amountDeleted = x;
    }
    set amountofW(x){
        this.amountofW = x;
    }
    set amountofL(x){
        this.amountofL = x;
    }



}

bot.on("ready", async ()=>{
    try {
        const channel = bot.channels.cache.get(emojiChannelID);
        if (!channel) return console.error('Invalid ID or missing channel.');
    
        const messages = await channel.messages.fetch({ limit: 100 });
      
        
        for (const [id, message] of messages) {
            if(User.users.has(message.author.username) == false){
                User.users.set(message.author.username, new User(message.author.username));
               // message.reply("User Created");
            }
            /*const reaction = message.reactions.cache.get('');
            if(reaction != undefined){
                console.log(reaction);
            }*/
       
            const mesreact = await message.reactions.cache.get('🇼');
            if(message.reactions.cache.has('🇼')){
                console.log(mesreact.count);
                User.users.get(message.author.username).amountofW = User.users.get(message.author.username).amountofW + mesreact.count;
            }
            const mesreactl = await message.reactions.cache.get('🇱');
            if(message.reactions.cache.has('🇱')){
                console.log(mesreactl.count);
                User.users.get(message.author.username).amountofW = User.users.get(message.author.username).amountofW + mesreactl.count;
            }
            
   
            
        }
      } catch(err) {
        console.error(err);
      }

    console.log("This bot is ready");
})
bot.on("message", msg=>{

    if(User.users.has(msg.author.username) == false){
        User.users.set(msg.author.username, new User(msg.author.username));
        msg.reply("User Created");
    }
    if(msg.content.includes("http")){
        User.users.get(msg.author.username).amountOfPosts = User.users.get(msg.author.username).amountOfPosts + 1;
    }
    if(msg.content.charAt(0) == '!'){
    let args = msg.content.substring(PREFIX.length).split(" "); 
    switch(args[0]){
        case 'createUser':
            User.users.set(msg.author.username, new User(msg.author.username));
            msg.reply("User Created");
            break;
        case 'posts':
                msg.reply("You have " + User.users.get(msg.author.username).amountOfPosts + " posts");
                break;

        case 'pinned':
                msg.reply("You have " + User.users.get(msg.author.username).amountPinned+ " pins");
                break;
        case 'deleted':
                msg.reply("You have " + User.users.get(msg.author.username).amountDeleted+ " deleted posts");
                break;
        case 'W':
                msg.reply("You have " + User.users.get(msg.author.username).amountofW+ " Ws");
                break;
        case 'L':
                msg.reply("You have " + User.users.get(msg.author.username).amountofL+ " Ls");
                break;
        case 'ratio':
                msg.reply("You have a ratio of " + (User.users.get(msg.author.username).amountofW/User.users.get(msg.author.username).amountofL)+ " Ws to Ls");
                break;
    }
}

})
bot.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    var placeholder = User.users.get(message.author.username).toString;
    var placetext = User.users.get(message.author.username).name + ".txt";
    fs.writeFile(placetext, placeholder, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
      });
    if(User.users.has(message.author.username) == false){
        User.users.set(message.author.username, new User(message.author.username));
        message.reply("User Created");
    }
    console.log(emoji.name);
if(emoji.name == '🇼'){

User.users.get(message.author.username).amountofW = User.users.get(message.author.username).amountofW + 1;
if(reaction.count == 4){
message.pin();
User.users.get(message.author.username).amountPinned = User.users.get(message.author.username).amountPinned + 1;
message.reply(message.author.username + " posted a white girl with freckles and it got pinned");
}

}
if(emoji.name == '🇱'){
    User.users.get(message.author.username).amountofL = User.users.get(message.author.username).amountofL + 1;
    if(reaction.count == 3){
        message.delete();
        User.users.get(message.author.username).amountDeleted = User.users.get(message.author.username).amountDeleted + 1;
        message.reply(message.author.username + " posted some some gay monkey porn and it got deleted");
        }
}

    // Remove the user's reaction
 
});
bot.login(token);
