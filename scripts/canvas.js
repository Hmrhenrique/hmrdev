const canvas = document.querySelector('canvas')
canvas.width = innerWidth
const c = canvas.getContext('2d')

const mouse = {
    x: null,
    y: null,
    radius: 100
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window;addEventListener('resize', () => {
    init()
})

function getDistance(x1, y1, x2, y2){
    let dx = x2 - x1
    let dy = y1 - y2
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

class Particle {
    constructor() {
        this.radius = (Math.random() * 3) + 1
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius
        this.velocity = {
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 3
        }
        this.lineOpacity = 0.1
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = 'rgb(255, 255, 255)'
        c.fill()
        c.closePath()
    }

    update(particleArray) {
         //interaçao
         let dx = mouse.x - this.x
         let dy = mouse.y - this.y
         let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
         let maxDistance = mouse.radius
         let force = (maxDistance - distance) / maxDistance
         let forceDirectionX = dx / distance
         let forceDirectionY = dy / distance
         let directionX = forceDirectionX * force * 150
         let directionY = forceDirectionY * force * 150
         
         if (distance < mouse.radius){
                 this.x -= directionX
                 this.y -= directionY   
         }

        // desenhando linhas
        particleArray.forEach(particle => {
            if (this !== particle){
                if (getDistance(this.x, this.y, particle.x, particle.y) < 100){
                    c.beginPath()
                    c.moveTo(this.x, this.y)
                    c.lineTo(particle.x, particle.y)
                    c.strokeStyle = `rgba(255, 255, 255, ${.3})`
                    c.stroke()
                    c.closePath()
                }
            }
        })
        //movimento 

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = -this.velocity.x
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

let particleArray  
function init() {
    let amountOfParticles = innerWidth / 8
    console.log(amountOfParticles)
    canvas.width = innerWidth
    canvas.height = innerHeight
    particleArray = []
    for (let i = 0; i < amountOfParticles; i++) {
        particleArray.push(new Particle())
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    particleArray.forEach(particle => {
        particle.draw()
        particle.update(particleArray)
    });
}

init()
animate()