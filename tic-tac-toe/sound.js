import { SYMBOLS, AUDIO_FILES, SVG_FILES } from "./constants";

// Play audio for various states
export const playAudio = (state, audioType) => {
  if (!state.audioEnabled) return;

  let audioFile;

  switch (audioType) {
    case "gameMove":
      audioFile =
        state.currentSymbol === SYMBOLS.player1
          ? AUDIO_FILES.toggleOn
          : AUDIO_FILES.toggleOff;
      break;
    case "win":
      audioFile = AUDIO_FILES.win;
      break;
    case "draw":
      audioFile = AUDIO_FILES.draw;
      break;
    case "toggleOn":
      audioFile = AUDIO_FILES.toggleOn;
      break;
    default:
      console.warn(`Invalid audioType: ${audioType}`);
      return;
  }

  const audio = document.createElement("audio");
  audio.src = audioFile;
  audio.play();
};

// Check if user insists on audio
export const setupAudio = (state) => {
  const audioSelector = document.querySelector("#audio");
  audioSelector.src = SVG_FILES.on;

  audioSelector.addEventListener("click", () => {
    state.audioEnabled = !state.audioEnabled;
    audioSelector.src = state.audioEnabled ? SVG_FILES.on : SVG_FILES.off;
    if (state.audioEnabled) playAudio(state, "toggleOn");
  });
};
