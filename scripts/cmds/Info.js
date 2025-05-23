const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "info",
    version: "2.0",
    author: "✨ Eren Yeh ✨ (Modified by Dbz_Mahin)",
    shortDescription: "Display user info with video.",
    longDescription: "Stylized Ariyan bot info with uptime.",
    category: "INFO",
    guide: {
      en: "[user]",
    },
  },

  onStart: async function ({ api, event }) {
    // Uptime formatter
    const sec = process.uptime();
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = Math.floor(sec % 60);
    const botUptime = `${hrs}𝗁 ${mins}𝗆 ${secs}𝗌`;

    // Stylized message
    const messageBody = `
.          ┌────★────┐
🙈         𝐌𝐚𝐤𝐢𝐦𝐚    𝖡𝗈͢𝗍   𝐈𝐧𝐟𝐨                  
           └────★────┘

👤  ͟𝗨͟𝘀͟𝗲͟𝗿͟ ͟𝗜͟𝗻͟𝗳͟𝗈͟
┌──────────────────┐
│   ◓𝖭͟𝖺͟𝗆͟𝖾͟ : 𝐌𝐚𝐡𝐢𝐧 (𝐑𝐞𝐧𝐭𝐚𝐫𝐨)                     
│   ◒ 𝖠͟𝗀͟𝖾͟ ; 𝟣5+          
│   ☯︎𝖫͟𝗈͟𝖼͟𝖺͟𝗍͟𝗂͟𝗈͟𝗇͟ ; 𝐑𝐚𝐣𝐬𝐡𝐚𝐡𝐢♪
│   ◒ 𝖠͟𝖻͟𝗈͟𝗎͟𝗍͟ : 𝐁𝐨𝐭 &              
│    𝐉𝐚𝐯𝐚𝐬𝐜𝐫𝐢𝐩𝐜𝐭  𝐋𝐨𝐯𝐞𝐫𝖨 
│    𝐀𝐥𝐰𝐚𝐲𝐬 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠 𝐀𝐛𝐨𝐮𝐭 𝐀𝐥𝐥(💌)
└──────────────────┘

🤖 𝗕𝗼𝘁 𝗗𝗲𝘁𝗮𝗶𝗹𝘀:
┌──────────────────┐
│   ◓𝐍𝐚𝐦𝐞 : 💋𝐌𝐢𝐬𝐬 𝐌𝐚𝐤𝐢𝐦𝐚🦋
│   ◒ 𝐎𝐖𝐍𝐄𝐑 : 𝐌𝐚𝐡𝐢𝐧
│   ✿︎ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧   : 7.0
│   ♡︎ 𝗨𝗽𝘁𝗶𝗺𝗲 : ${botUptime}    
└──────────────────┘

〽️ 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝐌𝐚𝐤𝐢𝐦𝐚 𝐁𝐨𝐭✨!
`;

    // Optional video (can skip if not needed)
    const videoLinks = ["https://scontent.xx.fbcdn.net/v/t42.3356-2/500354222_10062637227132774_9157871495285594911_n.mp4?_nc_cat=103&_nc_cb=47395efc-686078dc&ccb=1-7&_nc_sid=4f86bc&_nc_eui2=AeEWbRBbouef34zoePcHMy0mgVNsIwIKl3uBU2wjAgqXe3n8vDZ2fB74p6YB0RsLhNowlAut49hxgvtQzLkU82CC&_nc_ohc=9y0Tuv9z-nkQ7kNvwFyJ1ZY&_nc_oc=Adlm4Da2w0V8xVSv8x_SxUfQS7jQgqHNxyCcizx_k7i6AlYEvjlFDqT9htFkoggdOmA&_nc_zt=28&_nc_ht=scontent.xx&_nc_gid=UQ3RjWmj7U-IPob0qtM38g&oh=03_Q7cD2QHdEs6jk-K6MISd1tDBBvXNvTuek1Jnp3jLGXz_WIwH0A&oe=6831C7DE&dl=1"];
    const videoPaths = [];

    for (let i = 0; i < videoLinks.length; i++) {
      const videoPath = `${__dirname}/cache/info_vid${i}.mp4`;
      await new Promise((res, rej) => {
        request(videoLinks[i])
          .pipe(fs.createWriteStream(videoPath))
          .on("close", () => {
            videoPaths.push(videoPath);
            res();
          })
          .on("error", rej);
      });
    }

    // Send the message
    api.sendMessage({
      body: messageBody,
      attachment: videoPaths.map(path => fs.createReadStream(path))
    }, event.threadID, () => {
      videoPaths.forEach(path => fs.unlinkSync(path));
    }, event.messageID);
  }
};
