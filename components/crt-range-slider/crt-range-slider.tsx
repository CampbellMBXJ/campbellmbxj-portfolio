import { ChangeEventHandler, FC } from "react";
import styles from "./crt-range-slider.module.scss";
import cn from "classnames";

type RangeSliderProps = {
  step: number;
  min: number;
  max: number;
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const RangeSlider: FC<RangeSliderProps> = (props) => {
  const numerals = () => {
    const segments = [];

    // Iterate through step to create a label
    for (let num = props.min; num < props.max; num += props.step) {
      segments.push(
        <div
          key={num}
          className={cn(styles["range-slider__segment"], "engraved-text")}
        >
          {num}
        </div>
      );
    }

    segments.push(
      <div
        key={"last"}
        className={cn(
          styles["range-slider__segment"],
          styles["range-slider__segment--last"],
          "engraved-text"
        )}
      >
        {props.max}
      </div>
    );
    return segments;
  };

  return (
    <div className={cn(styles["range-slider"])}>
      <input
        type="range"
        step={props.step}
        min={props.min}
        max={props.max}
        className={styles["range-slider__input"]}
        value={props.value}
        onChange={props.onChange}
      />
      <div className={styles["range-slider__numeral-list"]}>{numerals()}</div>
    </div>
  );
};

export default RangeSlider;
