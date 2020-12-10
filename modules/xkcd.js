const fetch = require('node-fetch');
const dotenv = require('dotenv').config({ path:'config/env/.env'});
//const Discord = require('discord.js')

exports.getXKCD = async function(curr, num){
	var xkcdJSON,xkcdRes;
	if (curr) {
		xkcdRes = await fetch('https://xkcd.com/info.0.json')
		if (xkcdRes.status!=200){
			console.log("Non 200 status code: "+xkcdRes.status);
			return "ERROR";
		}
	}else{
		xkcdRes = await fetch('https://xkcd.com/'+num+'/info.0.json')
		if (xkcdRes.status!=200){
			console.log("Non 200 status code: "+xkcdRes.status);
			return "ERROR";
		}
	}
	xkcdJSON = await xkcdRes.json();
	
return xkcdJSON;
}