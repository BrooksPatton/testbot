/**
 * Created by summerbreez on 6/3/17.
 */

var SlackBot = require('slackbots');
const ssredis = require('./ssredis')
const Secrets = require('./secrets');
const secrets = new Secrets();
const redFront = ssredis.createClient(secrets.mongred.redis1Port, secrets.mongred.ip)

// create a bot
var bot = new SlackBot({
    token: 'xoxb-192390456148-MSAb5sKsjsDhlEfQMet1svhN', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'testbot2'
});

const onStart = function(){
    return new Promise(function(resolve, reject){
        bot.on('start', function(data){

            var params = {
                icon_emoji: ':cat:'
            };

            // define channel, where bot exist. You can adjust it there https://my.slack.com/services
            bot.postMessageToChannel('general', 'testbot2 is online', params);
            resolve()

        })
    })
}

const onMessage = function(){
    return new Promise(function(resolve, reject){
        bot.on('message', function(data){
            switch (data.text){
                case 'help':
                    bot.postMessageToChannel('general', 'here are the info')
                    break
                case 'testbot2 listItems':
                    bot.postMessageToChannel('general', 'lists')
                    break
                case 'testbot2 turnOnItem':
                    bot.postMessageToChannel('general', 'turned on item')
                    break
                case 'testbot2 turnOffItem':
                    bot.postMessageToChannel('general', 'turned off item')
                    break
                default:
                    break
            }

            resolve(data.text)

        })
    })
}

// onStart()
onMessage().then(function(data1){
    console.log('data1', data1)
})

// async function startMessage(){
//     await onMessage()
// }

// bot.on('message', function(data){
//     console.log(data.text)
//
//     switch (data.text)
//     {
//         case 'help':
//             bot.postMessageToChannel('general', 'here are the info')
//             break
//         case 'testbot2 listItems':
//             bot.postMessageToChannel('general', 'lists')
//             break
//         case 'testbot2 turnOnItem':
//             bot.postMessageToChannel('general', 'turned on item')
//             break
//         case 'testbot2 turnOffItem':
//             bot.postMessageToChannel('general', 'turned off item')
//             break
//         default:
//             break
//     }
// })
