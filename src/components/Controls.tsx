import { Fragment } from "react";
import { PlayingState } from "../lib/speech";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

interface ControlProps {
  state: PlayingState;
  controls: {
    play: () => void;
    pause: () => void;
    cancel: () => void;
  };
}
export const Controls = ({
  controls: { play, pause, cancel },
  state,
}: ControlProps) => {
  return (
    <Fragment>
      <div>
        <h2>Controls</h2>
      </div>
      <div className="control-buttons">
        <button onClick={play}>
          <FaPlay />
        </button>
        <button onClick={pause}>
          <FaPause />
        </button>
        <button onClick={cancel}>
          <MdCancel />
        </button>
      </div>
    </Fragment>
  );
};
