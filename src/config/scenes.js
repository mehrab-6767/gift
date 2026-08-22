import Landing from "../sections/Landing/Landing";
import Candles from "../sections/Candles/Candles";
import RotateLandscape from "../sections/RotateLandscape/RotateLandscape";
import MemoryBook from "../sections/MemoryBook/MemoryBook";
import RotatePortrait from "../sections/RotatePortrait/RotatePortrait";

import GiftRoom from "../sections/GiftRoom/GiftRoom";
import Distance from "../sections/Distance/Distance";

import Letter from "../sections/Letter/Letter";
import Future from "../sections/Future/Future";
import ThankYou from "../sections/ThankYou/ThankYou";
import Ending from "../sections/Ending/Ending";

import { FLOW } from "./flow";

export const SCENES = {
  [FLOW.WELCOME]: Landing,

  [FLOW.CANDLES]: Candles,

  [FLOW.ROTATE_LANDSCAPE]: RotateLandscape,

  [FLOW.MEMORY_BOOK]: MemoryBook,

  [FLOW.ROTATE_PORTRAIT]: RotatePortrait,

  [FLOW.GIFT_ROOM]: GiftRoom,

  [FLOW.DISTANCE]: Distance,


  [FLOW.LETTER]: Letter,

  [FLOW.FUTURE]: Future,

  [FLOW.THANK_YOU]: ThankYou,

  [FLOW.ENDING]: Ending,
};