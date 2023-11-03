// Constants
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: "blue",
    speed: 5,
    dx: 0,
    dy: 0,
    bounceCount: 0,
};

// Function to draw the ball on the canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Function to update the canvas
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Check boundaries and update ball position
    if (ball.x - ball.radius + ball.dx < 0 || ball.x + ball.radius + ball.dx > canvas.width) {
        ball.dx = -ball.dx;
        ball.bounceCount++;
    }
    if (ball.y - ball.radius + ball.dy < 0 || ball.y + ball.radius + ball.dy > canvas.height) {
        ball.dy = -ball.dy;
        ball.bounceCount++;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    drawBall();
    requestAnimationFrame(updateCanvas);
}

// Event listener for canvas click
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);
    ball.dx = Math.cos(angle) * ball.speed;
    ball.dy = Math.sin(angle) * ball.speed;
});

// Event listener for the reset button
resetButton.addEventListener("click", () => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 0;
    ball.dy = 0;
    ball.bounceCount = 0;
});

// Start the game
updateCanvas();
