const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req, res) => {
  res.end('Bot đang chạy!')
}).listen(3000, () => {
  console.log('HTTP server chạy trên port 3000')
})

function createBot() {
  console.log('Đợi 10 giây trước khi kết nối...')
  setTimeout(() => {
    console.log('Đang kết nối đến server...')
    const bot = mineflayer.createBot({
      host: 'quanvaloc.aternos.me',
      port: 11365,
      username: 'AFKBot',
      version: '1.21.11'
    })

    bot.on('login', () => {
      console.log('Bot đã login thành công!')
    })

    bot.on('spawn', () => {
      console.log('Bot đã vào server!')
      
      let angle = 0
      const radius = 5
      const speed = 0.05
      const height = 80

      setInterval(() => {
        const centerX = bot.entity.position.x
        const centerZ = bot.entity.position.z
        
        const x = centerX + radius * Math.cos(angle)
        const z = centerZ + radius * Math.sin(angle)

        bot.entity.position.set(x, height, z)
        bot.look(angle + Math.PI / 2, 0)

        angle += speed
        if (angle >= Math.PI * 2) angle = 0
      }, 50)
    })

    bot.on('kicked', (reason) => {
      console.log('Bị kick, lý do:', JSON.stringify(reason))
      setTimeout(createBot, 10000)
    })

    bot.on('error', (err) => {
      console.log('Lỗi:', err.message)
      setTimeout(createBot, 10000)
    })

    bot.on('end', (reason) => {
      console.log('Kết nối kết thúc, lý do:', reason)
      setTimeout(createBot, 10000)
    })

  }, 10000)
}

createBot()