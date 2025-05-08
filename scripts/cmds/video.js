module.exports = {

  config: {

    name: "auto",

    version: "0.0.2",

    permission: 0,

    prefix: false,

    credits: "Arafat",

    description: "Auto download video (TikTok, FB, IG etc)",

    category: "user",

    usages: "",

    cooldowns: 5,

  },


  onStart: async function () {},


  onChat: async function ({ api, event }) {

    const axios = require("axios");

    const fs = require("fs-extra");

    const { alldown } = require("nayan-videos-downloader");


    const content = event.body || '';

    const body = content.toLowerCase();


    if (body.startsWith("https://")) {

      if (

        body.includes("tiktok.com") ||

        body.includes("facebook.com") ||

        body.includes("instagram.com") ||

        body.includes("fb.watch")

      ) {

        api.setMessageReaction("🔍", event.messageID, () => {}, true);


        try {

          const data = await alldown(content);

          const { low, high, title } = data.data;


          api.setMessageReaction("✔️", event.messageID, () => {}, true);


          const video = (await axios.get(high || low, {

            responseType: "arraybuffer"

          })).data;


          const path = __dirname + "/cache/auto.mp4";

          fs.writeFileSync(path, Buffer.from(video, "utf-8"));


          return api.sendMessage({

            body: `《TITLE》: ${title}`,

            attachment: fs.createReadStream(path)

          }, event.threadID, () => fs.unlinkSync(path), event.messageID);


        } catch (err) {

          api.setMessageReaction("❌", event.messageID, () => {}, true);

          return api.sendMessage("❌ ভিডিও ডাউনলোড করতে ব্যর্থ হয়েছে আবার চেষ্টা করুন!", event.threadID, event.messageID);

        }

      }

    }

  }

};
