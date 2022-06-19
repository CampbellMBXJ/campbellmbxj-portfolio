import cn from "classnames";
import Image from "next/image";
import { Carousel as RRCarousel } from "react-responsive-carousel";
import styles from "./crt-carousel.module.scss";

type Props = {
  images: string[];
};

const CrtCarousel = (props: Props) => {
  const slides = () => {
    return props.images.map((image, i) => (
      <div className={styles["carousel__item"]} key={i}>
        <Image
          src={image}
          alt="Relevent image"
          layout="fill"
          objectFit="contain"
        />
      </div>
    ));
  };

  return (
    <RRCarousel
      showArrows={true}
      showStatus={false}
      infiniteLoop={true}
      showThumbs={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <div
            onClick={onClickHandler}
            title={label}
            className={cn(
              styles["carousel__arrow"],
              styles["carousel__arrow--left"],
              "not-selectable"
            )}
          >
            ◄
          </div>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <div
            onClick={onClickHandler}
            title={label}
            className={cn(
              styles["carousel__arrow"],
              styles["carousel__arrow--right"],
              "not-selectable"
            )}
          >
            ►
          </div>
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <div
              className={cn(
                styles["carousel__indicator"],
                styles["carousel__indicator--active"],
                "not-selectable"
              )}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            >
              ■
            </div>
          );
        }
        return (
          <div
            className={cn(styles["carousel__indicator"], "not-selectable")}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          >
            ■
          </div>
        );
      }}
    >
      {slides()}
    </RRCarousel>
  );
};

export default CrtCarousel;
