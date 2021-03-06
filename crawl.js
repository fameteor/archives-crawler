var fs = require('graceful-fs')
var https = require('https');

// https://github.com/bda-research/node-crawler#install



// ???????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????
// A MODIFIER

exampleUrl = "https://etatcivil-archives.vendee.fr/arkotheque/visionneuse/img_prot.php?i=f409d4b6a3.jpg&route=/0,2184,950,728/950,/0/default.jpg";

var cookie = '__utma=269985189.1934943798.1578905458.1580070694.1580105294.29; __utmz=269985189.1580105294.29.27.utmcsr=nomsdevendee.fr|utmccn=(referral)|utmcmd=referral|utmcct=/resultat_s.php; PHPSESSID=5uhlm7ol3fmsn68tjq18ud3nil; __utmc=269985189; __utmb=269985189.2.10.1580105294; __utmt=1';

// ???????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????

var userAgent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0';

var urlParams = exampleUrl.split('?')[1].split('&');
var nomImage = urlParams[0].replace('i=','');
var defX = urlParams[1].replace('route=/','').split('/')[0].split(',')[2];
var defY = urlParams[1].replace('route=/','').split('/')[0].split(',')[3];
console.log(nomImage);
console.log(defX);
console.log(defY);

var debutPath = "./images/";

/*
var nomImage = '968e244daf.jpg';
var defX = 994;
var defY = 1706/2;
*/

var crawlTasks = [];

var Crawler = require("crawler");

var c = new Crawler({
	encoding:	null,		// For image download
    jQuery:		false,		// Set false to suppress warning message.
	// maxConnections : 2,
	rateLimit: 	200, 	// `maxConnections` will be forced to 1
	userAgent:	userAgent,
	headers: {
		cookie: cookie
	},
    callback: function (error, res, done) {
		if(error){
			console.log(error);
		}
		else{
			if (res.statusCode === 200) {
				console.log(res.options.filename);
				fs.createWriteStream(res.options.filename).write(res.body);
			}
			else {
				console.log("Error :" + res.statusCode);
			}
		}
		done();
	}
});

//Node.js Function to save image from External URL.

// Créer le batch
for (var x = 0; x < 4; x++) {
	for (var y = 0; y < 4; y++) {
		var url = 'https://etatcivil-archives.vendee.fr/arkotheque/visionneuse/img_prot.php?i='
					+ nomImage
					+ '&route=/'
					+ (x * defX)
					+ ','
					+ (y * defY)
					+ ','
					+ defX
					+ ','
					+ defY
					+ '/'
					+ defX
					+ ',/0/default.jpg'
		var localPath = debutPath + "x" + (parseInt(x) + 1) + "y" + (parseInt(y) + 1) + ".jpg";
		var newCrawl = {
			uri: url,
			filename: localPath
		}
		crawlTasks.push(newCrawl);
	}
}


// On crawle les données
c.queue(crawlTasks);

// On exécute le batch image magick
