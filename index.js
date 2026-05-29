const mineflayer = require('mineflayer')
const http = require('http')

// HTTP server để Render không tắt
http.createServer((req, res) => {
  res.end('Bot đang chạy!')
}).listen(3000, () => {
  console.log('HTTP server chạy trên port 3000')
})

function createBot() {
  console.log('Đợi 10 giây trước khi kết nối...')
  setTimeout(() => {
    const bot = mineflayer.createBot({
      host: 'quanvaloc.aternos.me',
      port: 11365,
      username: 'AFKBot',
      version: '1.21.11'
    })

    bot.on('spawn', () => {
      console.log('Bot đã vào server!')
      
      let angle = 0
      const radius = 1
      const speed = 0.05
      const height = 70

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
      console.log('Bị kick:', reason)
      setTimeout(createBot, 10000)
    })

    bot.on('error', () => {
      setTimeout(createBot, 10000)
    })

  }, 10000)
}

createBot()