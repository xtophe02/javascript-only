class Timer {
  //CREATES IMEDIATLY WHEN TIMER IS CALLED
  constructor(durationInput, starButton, pauseButton, callBacks) {
    this.durationInput = durationInput;
    this.starButton = starButton;
    this.pauseButton = pauseButton;
    this.starButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
    this.onStart = callBacks.onStart;
    this.onComplete = callBacks.onComplete;
    this.onTick = callBacks.onTick;
  }
  //FIX THIS WITH ARROW FUNC, SO WILL BIND WITH THE PARENT (TIMER)
  start = () => {
    //TO AVOID WAITING 1S TO START THE COUNTINGG
    this.onStart(this.timeRemaining);
    this.tick();

    this.idTimer = setInterval(this.tick, 50);
  };
  pause = () => {
    clearInterval(this.idTimer);
  };
  onDurationChange() {}
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      this.onComplete();
    } else {
      //SET = GET - 1
      this.onTick(this.timeRemaining); //GET TIMEREMAIN OUTSIDE
      this.timeRemaining = this.timeRemaining - 0.05;
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
