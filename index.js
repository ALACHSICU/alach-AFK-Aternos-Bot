const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req, res) => {
  res.end('Bot đang chạy!')
}).listen(3000, () => {
  console.log('HTTP server chạy trên port 3000')
})

let botInstance = null
let isConnecting = false

function createBot() {
  if (isConnecting) return
  isConnecting = true

  console.log('Đợi 10 giây trước khi kết nối...')
  setTimeout(() => {
    console.log('Đang kết nối đến server...')
    
    const bot = mineflayer.createBot({
      host: 'quanvaloc.aternos.me',
      port: 11365,
      username: 'AFKBot',
      version: '1.21.11'
    })

    botInstance = bot

    bot.on('login', () => {
      console.log('Bot đã login thành công!')
      isConnecting = false
    })

    bot.on('spawn', () => {
      console.log('Bot đã vào server!')

      // Di chuyển nhẹ thay vì bay vòng tròn nhanh
      setInterval(() => {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
      }, 30000) // nhảy mỗi 30 giây

      setInterval(() => {
        bot.look(bot.entity.yaw + 0.5, 0, true)
      }, 5000) // xoay nhẹ mỗi 5 giây
    })

    bot.on('kicked', (reason) => {
      console.log('Bị kick, lý do:', JSON.stringify(reason))
      botInstance = null
      isConnecting = false
      setTimeout(createBot, 15000)
    })

    bot.on('error', (err) => {
      console.log('Lỗi:', err.message)
      botInstance = null
      isConnecting = false
      setTimeout(createBot, 15000)
    })

    bot.on('end', (reason) => {
      console.log('Kết nối kết thúc, lý do:', reason)
      botInstance = null
      isConnecting = false
      setTimeout(createBot, 15000)
    })

  }, 10000)
}

createBot()