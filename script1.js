let highestZ = 1;
class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentX = 0;
  currentY = 0;
  rotating = false;
  init(paper) {
    const moveHandler = (x, y) => {
      if (!this.rotating) {
        this.mouseX = x;
        this.mouseY = y;
        this.velX = this.mouseX - this.prevX;
        this.velY = this.mouseY - this.prevY;
      }
      const dirX = x - this.touchX;
      const dirY = y - this.touchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (180 * angle) / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentX += this.velX;
          this.currentY += this.velY;
        }
        this.prevX = x;
        this.prevY = y;
        paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    const startHandler = (x, y, isRotate) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      if (!isRotate) {
        this.touchX = x;
        this.touchY = y;
        this.prevX = x;
        this.prevY = y;
      } else {
        this.rotating = true;
      }
    };

    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Mouse events
    document.addEventListener("mousemove", (e) => {
      moveHandler(e.clientX, e.clientY);
    });
    paper.addEventListener("mousedown", (e) => {
      startHandler(e.clientX, e.clientY, e.button === 2);
    });
    window.addEventListener("mouseup", endHandler);

    // Touch events
    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startHandler(touch.clientX, touch.clientY, e.touches.length > 1);
    });
    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      moveHandler(touch.clientX, touch.clientY);
    });
    window.addEventListener("touchend", endHandler);
  }
}
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
