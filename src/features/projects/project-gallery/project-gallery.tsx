import cn from "classnames";
import { useState } from "react";
import Image from "next/image";
import { Carousel as RRCarousel } from "react-responsive-carousel";
import styles from "./project-gallery.module.scss";

type Props = {
  images: string[];
  title: string;
};

const ProjectGallery = (props: Props) => {
  const [selected, setSelected] = useState(0);
  const slides = () => {
    return props.images.map((image, i) => (
      <a
        className={styles["carousel__item"]}
        key={image}
        href={image}
        target="_blank"
        rel="noreferrer"
        // The full-size action below is the keyboard entry point; cloned and
        // offscreen carousel slides must not introduce invisible tab stops.
        tabIndex={-1}
        aria-label={`Open ${props.title} screenshot ${i + 1} full size in a new tab`}
      >
        <Image
          src={image}
          alt={`${props.title} screenshot ${i + 1}`}
          fill
          sizes="(max-width: 700px) 90vw, 760px"
          style={{ objectFit: "contain" }}
        />
      </a>
    ));
  };

  return (
    <section
      className={styles.gallery}
      aria-label={`${props.title} screenshots`}
    >
      <RRCarousel
        onChange={setSelected}
        transitionTime={250}
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
                "not-selectable",
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
                "not-selectable",
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
              className={cn(
                styles["carousel__indicator"],
                isSelected && styles["carousel__indicator--active"],
                "not-selectable",
              )}
              onClick={onClickHandler}
              aria-current={isSelected ? "true" : undefined}
              aria-label={`${label} ${index + 1}`}
              title={`${label} ${index + 1}`}
            >
              ■
            </button>
          </li>
        )}
      >
        {slides()}
      </RRCarousel>
      <div className={styles.gallery__caption}>
        <span aria-live="polite">
          {String(selected + 1).padStart(2, "0")} /{" "}
          {String(props.images.length).padStart(2, "0")}
        </span>
        <a
          href={props.images[selected]}
          target="_blank"
          rel="noreferrer"
          aria-label="View screenshot full size in a new tab"
        >
          FULL SIZE ↗
        </a>
      </div>
    </section>
  );
};

export default ProjectGallery;
