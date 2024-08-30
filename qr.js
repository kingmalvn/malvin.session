const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Maher_Zubair,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function SIGMA_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Maher_Zubair = Maher_Zubair({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Maher_Zubair.ev.on('creds.update', saveCreds)
			Qr_Code_By_Maher_Zubair.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id, { text: "" + b64data });
	
				   let SIGMA_MD_TEXT = `
*_Pair Code Connected by Malvin Tech*
*_Made With 🤍_*

> You have completed the first step of Deploying *A Whatsapp Bot*, Copy the above message and deploy your bot.Meanwhile you must follow the 4 steps. 

> 1st STEP
*TAP THE LINK BELOW AND FOLLOW THE CHANNEL* 
𓄂 https://whatsapp.com/channel/0029Vac8SosLY6d7CAFndv3Z

> 2nd STEP
*YOU MUST JOIN OUR GROUP FOR UPDATES ON THIS BOT*
𓄂 https://chat.whatsapp.com/GFp6TrVc6ebAPK9qIsEu50

> 3rd STEP
*FORK AND STAR 🌟 THE REPO FOR COURAGE*
𓄂 https://github.com/kingmalvn/RAVENS-MD 

> 4th STEP 
*VISIT FOR TUTORIALS IF YOU DON'T KNOW HOW TO DEPLOY*
𓄂 https://youtube.com/@MalvinKing_TECH 

*DEVELOPER1: KING MALVIN*
𓄂 https://wa.me/263780166288

*DEVELOPER2: KING MALVIN*
𓄂 https://wa.me/263780958186

*FOLLOW MY GITHUB PAGE*
𓄂 https://github.com/kingmalvn 

> MADE ON EARTH BY KING MALVIN🇿🇼
> CREATED BY MALVIN`
	 await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id,{text:SIGMA_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Maher_Zubair.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					SIGMA_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await SIGMA_MD_QR_CODE()
});
module.exports = router
