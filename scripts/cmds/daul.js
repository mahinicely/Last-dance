const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "daul",
    aliases: [],
    author: "Mahi--",
    version: "1.0",
    cooldowns: 20,
    role: 2,
    shortDescription: "Generate an image using DAUL AI",
    longDescription: "Generates an image based on a prompt and optional aspect ratio.",
    category: "ai",
    guide: "{p}daul <prompt> --ar <aspect ratio>"
  },

  onStart: async function ({ message, args, api, event }) {
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 105, 45, 45);
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    if (!args[0]) return message.reply("❌ | You need to provide a prompt.");

    const rawPrompt = args.join(" ");
    const arMatch = rawPrompt.match(/--ar\s+([\d:]+)/i);
    const aspectRatio = arMatch ? arMatch[1] : "1:1";
    const prompt = rawPrompt.replace(/--ar\s+[\d:]+/i, "").trim();

    api.sendMessage("⏳ | Generating image, please wait...", event.threadID, event.messageID);

    try {
      const apiUrl = `https://mahi-apis.onrender.com/api/daul?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(aspectRatio)}`;

      const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

      const imgPath = path.join(cacheDir, `${Date.now()}_daul.png`);
      fs.writeFileSync(imgPath, Buffer.from(response.data, "binary"));

      const stream = fs.createReadStream(imgPath);
      return message.reply({ body: "", attachment: stream });
    } catch (err) {
      console.error(err);
      return message.reply("❌ | Something went wrong while generating the image.");
    }
  }
};
