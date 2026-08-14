import Landing from "../sections/Landing/Landing";
import RotateLandscape from "../sections/RotateLandscape/RotateLandscape";
import MemoryBook from "../sections/MemoryBook/MemoryBook";
import RotatePortrait from "../sections/RotatePortrait/RotatePortrait";

import GiftRoom from "../sections/GiftRoom/GiftRoom";
import Distance from "../sections/Distance/Distance";
import Forgiveness from "../sections/Forgiveness/Forgiveness";
import Letter from "../sections/Letter/Letter";
import Future from "../sections/Future/Future";
import VoiceMessageScene from "../sections/VoiceMessage/VoiceMessageScene";
import ThankYou from "../sections/ThankYou/ThankYou";
import Ending from "../sections/Ending/Ending";

import { FLOW } from "./flow";

export const SCENES = {
  [FLOW.WELCOME]: Landing,

  [FLOW.ROTATE_LANDSCAPE]: RotateLandscape,

  [FLOW.MEMORY_BOOK]: MemoryBook,

  [FLOW.ROTATE_PORTRAIT]: RotatePortrait,

  [FLOW.GIFT_ROOM]: GiftRoom,

  [FLOW.DISTANCE]: Distance,

  [FLOW.FORGIVENESS]: Forgiveness,

  [FLOW.LETTER]: Letter,

  [FLOW.FUTURE]: Future,

  [FLOW.VOICE_MESSAGE]: VoiceMessageScene,

  [FLOW.THANK_YOU]: ThankYou,

  [FLOW.ENDING]: Ending,
};