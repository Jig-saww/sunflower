let highestZ = 1;
class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;
      this.prevTouchX = this.touchX;
      this.prevTouchY = this.touchY;
      if (e.touches.length === 2) {
        this.rotating = true;
      }
      if (!this.holdingPaper) {
        this.holdingPaper = true;
        paper.style.zIndex = highestZ;
        highestZ += 1;
      }
    });
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!this.rotating) {
        this.velX = touch.clientX - this.prevTouchX;
        this.velY = touch.clientY - this.prevTouchY;
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
        this.prevTouchX = touch.clientX;
        this.prevTouchY = touch.clientY;
      } else {
        const dirX = touch.clientX - this.touchX;
        const dirY = touch.clientY - this.touchY;
        const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
        const dirNormalizedX = dirX / dirLength;
        const dirNormalizedY = dirY / dirLength;
        const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
        let degrees = 180 * angle / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        this.rotation = degrees;
      }
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
