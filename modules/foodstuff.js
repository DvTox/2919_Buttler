const fetch = require('node-fetch');
const dotenv = require('dotenv').config({ path:'config/env/.env'});

let menu = [];
let foodTime = [];
let n = 0;
let foodDay = 0;
function foodProcessing(rawfood,modeselec){

    let now_jso = new Date().toJSON().slice(0,10);
    let now = new Date();


    // console.log(rawfood);
    // let jfood = JSON.parse(rawfood);
    console.log(modeselec);   

    switch(modeselec){
case '0':
case'udf':

                //console.log('got here');
        menu = [];
	
        for (let x in rawfood){

            foodTime[n] = rawfood[x].datum.slice(0,10);

            if (foodTime[n] == now_jso){

                menu.push(rawfood[x].gerichtname.trim());
		n++;
            }
        }
	break;

    case '1':

        menu = [];
        let datearr = [];

        while(now.getDay() > 1){

            now.setDate(now.getDate() -1);

        }

        let i = 0;

        while(now.getDay() < 6){

            datearr.push(now.toJSON().slice(0, 10))
            now.setDate(now.getDate() +1);
        }
	    
        
	    
        for (let x in rawfood){


            foodTime[n] = rawfood[x].datum.slice(0,10);

            if (datearr.indexOf(foodTime[n]) > -1){

              menu.push(`${foodTime[n]}|${rawfood[x].gerichtname.trim()}`);
		      n++;

            }

        }
        menu = menu.sort(function(a,b){

            aDate=Date.parse(a.split('|')[0]);

            bDate=Date.parse(b.split('|')[0]);

            return aDate-bDate;
        })
        console.log(menu.length);
	menu = dashes(menu);
/*
            //Dash per day
            let menuLength=menu.length;

		for (let e = 0; e<=menuLength; e++){

		    aDate=Date.parse(menu[e].split('|')[0]);
	            bDate=Date.parse(menu[e+1].split('|')[0]);
		    if (aDate != bDate) {
			menu.splice(e+1,0,`-----------------------------------------------`);
			e++;
}

		}
/*
            for (let n = 3; n<=menuLength;n+=4){    
                console.log(n)
                menu.splice(n,0,`----------------------------------------------`);
            }
*/
            console.log("after for")
            // /Dash per day
	break;
    case '2':
	   
        menu = [];
            for (let x in rawfood){
                foodTime[n] = rawfood[x].datum.slice(0,10);
                menu.push(`${foodTime[n]}|${rawfood[x].gerichtname.trim()}`);
		n++;
            }
            menu = menu.sort(function(a,b){
            
            aDate=Date.parse(a.split('|')[0]);
            
            bDate=Date.parse(b.split('|')[0]);

            return aDate-bDate;
        })
                            //Dash per day
	   menu = dashes(menu);
/*
                for (let n = 3; n<menu.length;n+=4){    
                    console.log("test2")
                    menu.splice(n,0,`----------------------------------------------`);
                }*/
                // /Dash per day
    break;
    default:
        menu = 'Mode not Found'
	}
    return menu;
};

function dashes(menu){
let menuLength=menu.length;
	for (let e = 0; e<=menuLength; e++){

		aDate=Date.parse(menu[e].split('|')[0]);

                bDate=Date.parse(menu[e+1].split('|')[0]);
                if (aDate != bDate) {
                	menu.splice(e+1,0,`-----------------------------------------------`);
                       	e++;
		}

       }
return menu;
}


exports.sendforfood = async function(modeselec){

    const url = process.env.url
    const options = {
        headers: {
            'Accept': "application/json",
            'Authorization': `${process.env.apiauth}`
        }
    }
    let res = await fetch(url,options);
    
    if (res.status!=200){
        return ["HTTP STATUS CODE "+res.status];
    }

    let rawfood = await res.json();

    // let rawfood = await JSON.parse(res);
    // console.log(res.status==200);
    // console.log(rawfood);
    await foodProcessing(rawfood,modeselec);
    return menu;
};

