
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");
const beginBtn = document.getElementById("beginBtn");
const coreBtn = document.getElementById("coreBtn");
const message = document.getElementById("message");
const replayBtn = document.getElementById("replayBtn");

let particles = [];
let animationStarted = false;
let revealed = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 2 + 0.4;
    this.speed = Math.random() * 0.8 + 0.2;
    this.opacity = Math.random() * 0.7 + 0.2;
    this.drift = (Math.random() - 0.5) * 0.5;
    this.color = Math.random() > 0.3 ? "#e51d3b" : "#b8b8c0";
  }

  update() {
    this.y -= this.speed;
    this.x += this.drift;

    if (this.y < -10) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function createParticles() {
  particles = [];

  const count = Math.min(
    130,
    Math.floor((canvas.width * canvas.height) / 8500)
  );

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

createParticles();
animate();

window.addEventListener("resize", createParticles);

// Start birthday experience
beginBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  birthday.classList.remove("hidden");

  animationStarted = true;

  document.body.animate(
    [
      { filter: "brightness(1)" },
      { filter: "brightness(1.7)" },
      { filter: "brightness(1)" }
    ],
    {
      duration: 900,
      easing: "ease-out"
    }
  );
});

// Reveal the birthday message
coreBtn.addEventListener("click", () => {
  if (revealed) return;

  revealed = true;

  coreBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.8)", opacity: 0.5 },
      { transform: "scale(1)", opacity: 1 }
    ],
    {
      duration: 700,
      easing: "ease-out"
    }
  );

  message.classList.remove("hidden");

  document.querySelector(".click-hint").textContent =
    "TRANSMISSION SUCCESSFULLY DECODED";

  message.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  createBurst();
});

// Particle burst effect
function createBurst() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < 75; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 5 + 2;

    const x = centerX + Math.cos(angle) * velocity * 10;
    const y = centerY + Math.sin(angle) * velocity * 10;

    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff233f";
    ctx.fillStyle = Math.random() > 0.5 ? "#ff233f" : "#d5d5dd";

    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// Replay
replayBtn.addEventListener("click", () => {
  revealed = false;
  animationStarted = false;

  message.classList.add("hidden");
  birthday.classList.add("hidden");
  intro.classList.remove("hidden");

  document.querySelector(".click-hint").textContent =
    "[ CLICK THE CORE TO UNLOCK YOUR MESSAGE ]";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
