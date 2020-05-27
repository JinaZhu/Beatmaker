class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    //track
    this.index = 0;
  }
  repeat() {
    //when we arrive at 8, step will be 0 again, creating a loop
    let step = this.index % 8;
  }
}
