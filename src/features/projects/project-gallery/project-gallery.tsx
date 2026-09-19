import cn from "classnames";
import Image from "next/image";
import { Carousel as RRCarousel } from "react-responsive-carousel";
import styles from "./project-gallery.module.scss";

type Props = {
  images: string[];
  title: string;
};

const ProjectGallery = (props: Props) => {
  const slides = () => {
    return props.images.map((image, i) => (
      <div className={styles["carousel__item"]} key={image}>
        <Image
          src={image}
          alt={`${props.title} screenshot ${i + 1}`}
          fill
          sizes="(max-width: 700px) 90vw, 760px"
          style={{ objectFit: "contain" }}
        />
      </div>
    ));
  };

  return (
    <RRCarousel
      className={styles.carousel}
      showArrows={true}
      showStatus={false}
      infiniteLoop={true}
      showThumbs={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            aria-label={label}
            onClick={onClickHandler}
            title={label}
            className={cn(
              styles["carousel__arrow"],
              styles["carousel__arrow--left"],
              "not-selectable"
            )}
          >
            ◄
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            aria-label={label}
            onClick={onClickHandler}
            title={label}
            className={cn(
              styles["carousel__arrow"],
              styles["carousel__arrow--right"],
              "not-selectable"
            )}
          >
            ►
          </button>
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => (
        <li key={index} className={styles["carousel__indicator-item"]}>
          <button
            type="button"
            className={cn(styles["carousel__indicator"], isSelected && styles["carousel__indicator--active"], "not-selectable")}
            onClick={onClickHandler}
            aria-current={isSelected ? "true" : undefined}
            aria-label={`${label} ${index + 1}`}
            title={`${label} ${index + 1}`}
          >■</button>
        </li>
      )}
    >
      {slides()}
    </RRCarousel>
  );
};

export default ProjectGallery;
