const XLSX = require('xlsx');
const fs = require('fs');
const planods='./import/plan.ods'
const htmlToImage = require('node-html-to-image');

let content=[];

exports.setplan=async function(mode){

	console.log("set")
	try {
		if (fs.existsSync(planods)){
			var workbook = XLSX.readFile(planods);
			var first_sheet_name = workbook.SheetNames[0];
		
			console.log(first_sheet_name);
			
			var worksheet = workbook.Sheets[first_sheet_name];
			var sheethtml=XLSX.utils.sheet_to_html(worksheet);
					
			console.log(sheethtml);			
			htmlToImage({
				output: './config/plan.png',
				html: sheethtml
				})
		}else{
			console.log('file not found')
		}
	} catch(e) {
		// statements
		console.log(e);
	}
	
	return content;
}
//12*5