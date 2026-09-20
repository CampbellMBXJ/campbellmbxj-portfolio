import { ChangeEventHandler, FC } from "react";
import styles from "./crt-range-slider.module.scss";

type RangeSliderProps = {
  label: string;
  valueText?: string;
  step: number;
  min: number;
  max: number;
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const RangeSlider: FC<RangeSliderProps> = (props) => {
  const stops: number[] = [];
  for (let value = props.min; value < props.max; value += props.step) {
    stops.push(value);
  }
  stops.push(props.max);

  return (
    <div className={styles["range-slider"]}>
      <input
        type="range"
        aria-label={props.label}
        aria-valuetext={props.valueText}
        step={props.step}
        min={props.min}
        max={props.max}
        className={styles["range-slider__input"]}
        value={props.value}
        onChange={props.onChange}
      />
      <div className={styles["range-slider__scale"]} aria-hidden="true">
        <div className={styles["range-slider__stops"]}>
          {stops.map((stop) => (
            <span
              key={stop}
              className={styles["range-slider__stop"]}
              data-selected={Number(props.value) === stop}
              style={{
                left: `${props.max === props.min ? 0 : ((stop - props.min) / (props.max - props.min)) * 100}%`,
              }}
            >
              {stop}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
