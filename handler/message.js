const { decryptMedia } = require('@open-wa/wa-automate');
const fs = require('fs');
const mime = require('mime-types');
const fetch = require('node-fetch')
const config = require('../config.json')
const {
  arrMenu,
  arrHelp,
  arrYui,
  arrInfo,
  arrSaran,
  arrDonasi,
  arrFb,
  arrTiktok,
  arrYt,
  arrYtmp3,
  arrIg,
  arrTwitter,
  arrStorynime,
  arrWaifu,
  arrBlush,
  arrLapor,
  arrPinterestVideo,
  arrPinterestImage,
  arrSimSimi
} = require('../commands/command');

const start = async (client) => {
  client.onMessage(async (message) => {
    const messBody = message.body;
    const splt = messBody.split(' ');
    const splt2 = messBody.split(' ')
    splt2.shift()
    const mess = splt2.join(' ')

    try {
      // Menu
      if (arrMenu.includes(messBody.toLowerCase())) {
        await client.sendText(
          message.from,
          'List menu bot saat ini\n\n1. Gambar ke stiker\n2. Video ke stiker (bisa tapi ada sedikit isu ukuran file)\n3. Stiker ke gambar\n4. Fb Video Downloader\n5. Tiktok Downloader\n6. YT Downloader\n7. YT Mp3 Downloader\n8. Instagram Video Downloader\n9. Twitter Video Downloader \n~10. Pinterest Image Downloader~\n~11. Pinterest Video Downloader~\n12. Ngobrol sama bot\nKetik *!help* untuk cara penggunaan'
        );
      }

      // Help
      if (arrHelp.includes(messBody.toLowerCase())) {
        await client.sendText(
          message.from,
          'Cara memakai bot ini:\n\n1. Kirim gambar atau video untuk mengubah menjadi stiker\n2. Kirim stiker untuk mengubah ke gambar\n3. FB video downloader (contoh: *!fb* https://fb.com)\n4. Tiktok downloader (contoh: *!tiktok* https://tiktok.com)\n5. YT downloader (contoh: *!yt* https://youtube.com)\n6. YT Mp3 downloader (contoh *!ytmp3* https://youtube.com)\n7. Instagram video downloader (contoh: *!ig* https://instagram.com)\n8. Twitter video downloader (contoh: *!twitter* https://twitter.com)\n~9. Pinterest Image downloader (contoh: *!ptimg* https://pinterest.com)~\n~10. Pinterest Video Downloader (contoh: *!ptvid* https://pinterest.com)~\n\nNgobrol sama bot tinggal kasih command *!p* didepannya (Contoh: !p halo bang)\nCatatan: Apabila bot tidak merespon, server yang digunakan bot sedang tidak aktif. Atau bisa chat owner wa.me/6285747490856 bila bot bermasalah'
        );
      }

      // Yui
      if (arrYui.includes(messBody.toLowerCase())) {
        await client.sendText(
          message.from,
          'Hai, selamat datang di Yui Bot.\n\nKetik *!menu* untuk melihat menu.\nKetik *!help* apabila perlu bantuan\nKetik *!info* untuk melihat informasi tentang bot ini\nKetik *!saran* untuk memberi saran kepada bot ini\nKetik *!donasi* jika kamu ingin mendukung bot ini\nKetik *!lapor* untuk melapor masalah bot ke owner'
        );
      }

      // Info
      if (arrInfo.includes(messBody.toLowerCase())) {
        await client.sendText(
          message.from,
          'Bot ini berjalan di local server (laptop owner sendiri). bot tidak selamanya aktif, terkadang bot akan mati apabila terjadi error dikarenakan bot ini masih dalam pengembangan.\n\nNote: Kemungkinan saat weekend bot mati karena ownernya mau hunting cosplayer. hehe'
        );
      }

      // Saran
      if (arrSaran.includes(messBody.toLowerCase())) {
        await client.sendText(
          message.from,
          'Saran atau kritik anda sangat berguna bagi bot ini https://bit.ly/KritikSaranYuiBot'
        );
      }

      // Donasi
      if (arrDonasi.includes(messBody.toLowerCase())) {
        await client.sendText(
          message.from,
          'Kamu bisa donasi untuk bot ini di https://trakteer.id/yui-bot'
        );
      }

      // lapor
      if (arrLapor.includes(messBody.toLowerCase())) {
        await client.sendText(
          message.from,
          'kamu bisa chat owner bila bot bermasalah di wa.me/6285747490856'
        );
      }

      // Image to sticker
      if (message.mimetype && message.type === 'image' && message.isMedia) {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${
          message.mimetype
        };base64,${mediaData.toString('base64')}`;

        await client.sendImageAsSticker(message.from, imageBase64, {
          author: 'Yui',
          keepScale: true,
          pack: 'Yui-Sticker',
        });

        fs.writeFile(filename, mediaData, (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('The img was saved');
          fs.unlink(filename, () => {
            console.log('The img was deleted');
          });
        });
      }

      // Sticker to image
      if (
        message.mimetype === 'image/webp' &&
        message.type === 'sticker' &&
        !message.isMedia &&
        !message.isAnimated
      ) {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${
          message.mimetype
        };base64,${mediaData.toString('base64')}`;

        await client.sendImage(message.from, imageBase64, filename);

        fs.writeFile(filename, mediaData, (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('The sticker was saved');
          fs.unlink(filename, () => {
            console.log('The sticker was deleted');
          });
        });
      }

      // mp4 to sticker
      if (message.mimetype && message.type === 'video' && message.isMedia) {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
        const videoBase64 = `data:${
          message.mimetype
        };base64,${mediaData.toString('base64')}`;

        fs.writeFile(filename, mediaData, async (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('The video was saved');
          const fileSize = fs.statSync(filename);

          if (fileSize.size < 1499999) {
            try {
              await client.sendMp4AsSticker(
                message.from,
                videoBase64,
                {
                  crop: false,
                  fps: 10,
                  loop: 0,
                  startTime: '00:00:00.0',
                  endTime: '00:00:05.0',
                },
                {
                  author: 'Yui',
                  pack: 'Yui-Sticker',
                }
              );
            } catch (error) {
              await client.reply(message.from, 'Ukuran file terlalu besar', message.id);
              fs.unlink(filename, () => {
                console.log('The video was deleted');
              });
              console.log(error);
            }
            
          } else {
            await client.reply(message.from, 'Ukuran file terlalu besar', message.id);
          }

          fs.unlink(filename, () => {
            console.log('The video was deleted');
          });
        });
      }

      // FB Downloader
      if (arrFb.includes(splt[0])) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/facebook?apikey=${config.lol}&url=${splt[1]}`
        );

        const result = await response.json();
        if (result.status == 200) {
            console.log(result.result);
            await client.sendFileFromUrl(
            message.from,
            result.result,
            `${Date.now()}.mp4`
          );
            console.log('Success Send FB vid');
        } else {
          await client.reply(message.from, 'Url tidak valid', message.id)
        }
        
      }

      // Tiktok Downloader
      if (arrTiktok.includes(splt[0])) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/tiktok?apikey=${config.lol}&url=${splt[1]}`
        );

        const result = await response.json();
        if (result.status == 200) {
            console.log(result);
            await client.sendFileFromUrl(
            message.from,
            result.result.link,
            `${Date.now()}.mp4`
          );
          console.log('Success send tiktok vid');
        } else {
          await client.reply(message.from, 'Url tidak valid', message.id)
        }
        
      }

      // YT Downloader
      if (arrYt.includes(splt[0])) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/ytvideo?apikey=${config.lol}&url=${splt[1]}`
        );

        const result = await response.json();
        if (result.status == 200) {
            console.log(result.result.link.link);
            await client.sendFileFromUrl(
            message.from,
            result.result.link.link,
            `${Date.now()}.mp4`
          );
          console.log('Success send vid yt');
        } else {
          await client.reply(message.from, 'Url tidak valid', message.id)
        }
      }

      // Instagram Downloader
      if (arrIg.includes(splt[0])) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/instagram2?apikey=${config.lol}&url=${splt[1]}`
        );

        const result = await response.json();
        if (result.status == 200 && result.result.media.length != 0) {
            console.log(result.result.media[0]);
            await client.sendFileFromUrl(
            message.from,
            result.result.media[0],
            `${Date.now()}.mp4`
          );
          console.log('Success send vid ig');
        } else {
          await client.reply(message.from, 'Url tidak valid', message.id)   
        }
      }

      // Twitter Downloader
      if (arrTwitter.includes(splt[0])) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/twitter?apikey=${config.lol}&url=${splt[1]}`
        );

        const result = await response.json();
        if (result.status == 200 && result.result.link.length != 0) {
            console.log(result.result.link[0].link);
            await client.sendFileFromUrl(
            message.from,
            result.result.link[0].link,
            `${Date.now()}.mp4`
          );
          console.log('Success send vid twitter');
        } else {
          await client.reply(message.from, 'Url tidak valid', message.id)
        }
      }

      // Yt Mp3
      if (arrYtmp3.includes(splt[0])) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/ytaudio?apikey=${config.lol}&url=${splt[1]}`
        );

        const result = await response.json();
        if (result.status == 200) {
            console.log(result.result.link.link);
            await client.sendFileFromUrl(
            message.from,
            result.result.link.link,
            'yt.mp3'
          );
          console.log('Success send ytmp3');
        } else {
          await client.reply(message.from, 'Url tidak valid', message.id)
        }
      }

      // Pinterest Image
      if (arrPinterestImage.includes(splt[0])) {
        // const response = await fetch(
        //   `https://api.lolhuman.xyz/api/pinterestdl?apikey=${config.lol}&url=${splt[1]}`
        // );

        // const result = await response.json();
        // if (result.status == 200) {
        //     // console.log(result.result['736x']);
        //     await client.sendFileFromUrl(
        //     message.from,
        //     result.result['736x'],
        //   );
        // } else {
        //   await client.reply(message.from, 'Url tidak valid', message.id)
        // }
        client.sendText(
          message.from,
          'Fitur ini sedang dinonaktifkan'
        );
      }

      // Pinterest Video
      if (arrPinterestVideo.includes(splt[0])) {
        // const response = await fetch(
        //   `https://api.lolhuman.xyz/api/pinterestvideo?apikey=${config.lol}&url=${splt[1]}`
        // );

        // const result = await response.json();
        // if (result.status == 200) {
        //     // console.log(result.result['736x']);
        //     await client.sendFileFromUrl(
        //     message.from,
        //     result.result['720p'],
        //   );
        // } else {
        //   await client.reply(message.from, 'Url tidak valid', message.id)
        // }

        await client.sendText(
          message.from,
          'Fitur ini sedang dinonaktifkan'
        );
      }

      // Story Anime
      if (arrStorynime.includes(messBody.toLowerCase())) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/storynime?apikey=${config.lol}`
        );
        const result = await response.json();

        console.log(response);
        await client.sendFileFromUrl(
          message.from,
          result.result,
          `${Date.now()}.mp4`
        );
      }

      // SimSimi
      if (arrSimSimi.includes(splt[0])) {
        const response = await fetch(
          `https://api.lolhuman.xyz/api/simi?apikey=${config.lol}&text=${mess}&badword=false`
        );
        const result = await response.json()

        await client.sendText(message.from, result.result)
      }

      // Random Waifu
      if (arrWaifu.includes(messBody.toLowerCase())) {
        const result = `https://api.lolhuman.xyz/api/random/waifu?apikey=${config.lol}`;

        await client.sendFileFromUrl(
          message.from,
          result,
          `${Date.now().toString()}.png`
        );
      }

      // Random blush
      if (arrBlush.includes(messBody.toLowerCase())) {
        const result = `https://api.lolhuman.xyz/api/random/blush?apikey=${config.lol}`;

        await client.sendFileFromUrl(message.from, result);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = start;
