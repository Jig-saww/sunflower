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
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('touchmove', this.handleMove, { passive: false });

    paper.addEventListener('mousedown', this.handleMouseDown);
    paper.addEventListener('touchstart', this.handleTouchStart);

    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('touchend', this.handleTouchEnd);
  }

  handleMove = (e) => {
    e.preventDefault(); // Prevent default behavior to prevent scrolling on touch devices
    if (!this.rotating) {
      if (e.type === 'mousemove') {
        this.velX = e.clientX - this.prevTouchX;
        this.velY = e.clientY - this.prevTouchY;
        this.prevTouchX = e.clientX;
        this.prevTouchY = e.clientY;
      } else if (e.type === 'touchmove' && e.touches.length === 1) {
        const touch = e.touches[0];
        this.velX = touch.clientX - this.prevTouchX;
        this.velY = touch.clientY - this.prevTouchY;
        this.prevTouchX = touch.clientX;
        this.prevTouchY = touch.clientY;
      }
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  };

  handleMouseDown = (e) => {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    paper.style.zIndex = highestZ;
    highestZ += 1;
    if (e.button === 0) {
      this.prevTouchX = e.clientX;
      this.prevTouchY = e.clientY;
    } else if (e.button === 2) {
      this.rotating = true;
    }
  };

  handleTouchStart = (e) => {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    paper.style.zIndex = highestZ;
    highestZ += 1;
    const touch = e.touches[0];
    this.prevTouchX = touch.clientX;
    this.prevTouchY = touch.clientY;
  };

  handleMouseUp = () => {
    this.holdingPaper = false;
    this.rotating = false;
  };

  handleTouchEnd = () => {
    this.holdingPaper = false;
    this.rotating = false;
  };
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
