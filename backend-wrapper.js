const food = require('./modules/foodstuff.js');
const HW = require('./modules/HW.js');
const plan = require('./modules/plan.js');
const xkcd = require('./modules/xkcd.js');

let args = process.argv;
args.splice(0,2);
console.log(args)
switch(args[0]){
    case ('food'):
        async function servefood(modeselec){
   	        let sfood = await food.sendforfood(modeselec);
       	    console.log(sfood);
        }

        if(args[1] == '--help'){
            console.log('!food: +0 == Today | +1 == This Week | +2 == AllFood');
        }else if(args[1] == undefined){
            servefood('udf');
        }else{
            servefood(args[1]);
        }
        break;
    case('echo'):
        console.log(args[1]);
        break;
    case('plan'):
        async function t(mode){
            let answer = await plan.getplan(mode);
            console.log(answer);
        };
        if (args[1]!= undefined){
            t(args[1]);
        }else{
            t('get');
        };
        break;
        
    case('xkcd'):
    let xkcdJSON;
    if (args[1] == undefined){
        xkcdJSON = xkcd.getXKCD(true, 0);
    }else if(args[1]){
        xkcdJSON = xkcd.getXKCD(false, args[1]);
    }
    const xkcdans = new Discord.MessageEmbed()
    .setTitle(xkcdJSON.safe_title)
    .setURL("https://xkcd.com/"+xkcdJSON.num)
    .setImage(xkcdJSON.img)
    .setDescription(xkcdJSON.alt);
msg.channel.send(xkcdans)

};
