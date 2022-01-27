const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

//MAKE NEW INSTANCE OF TIMER WITH 3X ARGS AND A CALLBACK
new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    this.totalDuration = totalDuration;
    let currentOffset = -(perimeter / (totalDuration * 20));
    //The value 20 is a result of 1000millisenconds divided by 50milliseconds used in the setInterval
    this.currentOffset = currentOffset;
  },
  onTick(timeRemaining) {
    circle.setAttribute('stroke-dashoffset', this.currentOffset);
    this.currentOffset =
      this.currentOffset - perimeter / (this.totalDuration * 20);
  },
  onComplete() {
    console.log('completed');
  },
});
