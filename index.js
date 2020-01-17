const discord = require ('discord.js');
const dotenv = require('dotenv').config({ path:'config/env/.env'});
const food = require('./modules/foodstuff.js');
const HW = require('./modules/HW.js');
const plan = require('./modules/plan.js');


//const foodservice = require('./foodservice.js');
const bot = new discord.Client();

const Token = process.env.TOKEN;

const Prefix = '!';

bot.on('ready', () =>{
    console.log('This Bot is online');
})

bot.on('message', msg => {
    
    let args = msg.content.substring(Prefix.length).split(" ");

    switch(args[0]){

        case ('food'):

            async function servefood(modeselec){

               	let sfood = await food.sendforfood(modeselec);
                console.log(sfood);
                if(sfood != []){

                    msg.channel.send(sfood);           
                    console.log(`sending food ......`);
                } else{
                    msg.channel.send('sorry no Food found')
                }

            }

            if(args[1] == '--help'){
                msg.channel.send('!food: +0 == Today | +1 == This Week | +2 == AllFood');
            }
            else if(args[1] == undefined){
                servefood('udf');
            }
            else{
                servefood(args[1]);
            }
            break;

        case('echo'):
            msg.channel.send(args);
            console.log(args);
            break;
        case('plan'):
        async function t(mode){
            let answer = await plan.getplan(mode);
            console.log(answer);
        };
        if (args[1]== 'set'){
            t('set');
        }else{
            t('get');
            msg.channel.send({
                files: [{
                    attachment: './config/plan.png',
                    name: 'plan.png'
                }]
            })
            .then(console.log)
            .catch(console.error)
        };
        break;
    };

});

bot.login(Token);
