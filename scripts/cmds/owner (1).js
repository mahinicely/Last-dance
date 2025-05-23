const { getStreamFromURL } = global.utils;
module.exports = {
  config: {
    name: "owner",
    version: 2.1,
    author: "Jani nh ke manger nati cng marche 🙂",
    longDescription: "Info about bot and owner",
    category: "Special",
    guide: {
      en: "{p}owner or just type owner"
    },
    usePrefix: false
  },
  onStart: async function (context) {
    await module.exports.sendOwnerInfo(context);
  },
  onChat: async function ({ event, message, usersData }) {
    const prefix = global.GoatBot.config.prefix;
    const body = (event.body || "").toLowerCase().trim();
    const triggers = ["owner", `${prefix}owner`];
    if (!triggers.includes(body)) return;
    await module.exports.sendOwnerInfo({ event, message, usersData });
  },
  sendOwnerInfo: async function ({ event, message, usersData }) {
    const videoURL = "https://files.catbox.moe/nt29t4.mp4";
    const attachment = await getStreamFromURL(videoURL);
    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const mentions = [{ id, tag: name }];
    const info = `
⫷          O᩶w᩶n᩶e᩶r᩶ I᩶n᩶f᩶o᩶          ⫸
┃ ☁️ 𝗡𝗮𝗺𝗲:     𝐌𝐀𝐇𝐈𝐍
┃ ⚙️ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲:  💋𝐌𝐢𝐬𝐬 𝐌𝐚𝐤𝐢𝐦𝐚💌🦋 くめ
┃ 🎂 𝗔𝗴𝗲:             15 +
┃ 🧠 𝗖𝗹𝗮𝘀𝘀:           𝐒𝐞𝐜𝐫𝐞𝐭
┃ ❤️ 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻:      𝐁𝐎𝐋𝐁𝐎 𝐍𝐀
┃ ♂️ 𝗚𝗲𝗻𝗱𝗲𝗿:         𝐌𝐚𝐥𝐞
┃ 🏠 𝗙𝗿𝗼𝗺:           𝐑𝐀𝐉𝐒𝐇𝐀𝐇𝐈
┃ 💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿:     𝐕𝐚𝐠
♡ 𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐮𝐬𝐢𝐧𝐠 𝐦𝐲 𝐛𝐨𝐭 ♡
    `.trim();
    message.reply({
      body: info,
      attachment,
      mentions
    });
  }
};
