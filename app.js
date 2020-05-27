class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    //track
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }
  // click will add a class of active
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    //when we arrive at 8, step will be 0 again, creating a loop
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // check if pad is active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    // arrow function to keep outer this
    // run repeat
    const interval = (60 / this.bpm) * 1000;
    // check if it's playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //remove the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    // if it's playng, add a stop, if it's not playing, add a play
    if (!this.isPlaying) {
      this.playBtn.innerText = "stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "play";
      this.playBtn.classList.remove("active");
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  // when animation ends, repeat
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});
