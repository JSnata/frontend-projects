import { renderElement } from '../render.js';

export const renderAudioElements = () => {
  const mainContainer = document.getElementById("mainContainer");
  const soundsContainerElement = renderElement("div", "", mainContainer);

  const winSoundElement = renderElement("audio", "", soundsContainerElement, {
    id: "winSound"
  });
  const winSoundSource = renderElement("source", "", winSoundElement, {
    src: "./assets/audio/win.wav",
    type: "audio/wav"
  });

  const markBlackSoundElement = renderElement("audio", "", soundsContainerElement, {
    id: "markBlackSoundElement"
  });
  const markBlackSoundSource = renderElement("source", "", markBlackSoundElement, {
    src: "./assets/audio/mark-black.mp3",
    type: "audio/mp3"
  });

  const markCrossSoundElement = renderElement("audio", "", soundsContainerElement, {
    id: "markCrossSoundElement"
  });
  const markCrossSoundSource = renderElement("source", "", markCrossSoundElement, {
    src: "./assets/audio/mark-cross.mp3",
    type: "audio/mp3"
  });

  const markWhiteSoundElement = renderElement("audio", "", soundsContainerElement, {
    id: "markWhiteSoundElement"
  });
  const markWhiteSoundSource = renderElement("source", "", markWhiteSoundElement, {
    src: "./assets/audio/mark-white.mp3",
    type: "audio/mp3"
  });
}