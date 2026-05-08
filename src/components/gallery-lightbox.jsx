"use client";

import { useEffect, useMemo, useState } from "react";

export function GalleryLightbox({ items, alt, classNamePrefix }) {
  const [index, setIndex] = useState(-1);
  const active = index >= 0;

  const classes = useMemo(
    () => ({
      overlay: `${classNamePrefix}-lightbox`,
      overlayActive: `${classNamePrefix}-lightbox active`,
      frame: `${classNamePrefix}-lightbox-frame`,
      image: `${classNamePrefix}-lightbox-image`,
      close: `${classNamePrefix}-lightbox-close`,
      trigger: `${classNamePrefix}-gallery-item`,
    }),
    [classNamePrefix]
  );

  function close() {
    setIndex(-1);
  }

  function next() {
    setIndex((current) => (current + 1) % items.length);
  }

  function previous() {
    setIndex((current) => (current - 1 + items.length) % items.length);
  }

  function onKeyDown(event) {
    if (!active) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") previous();
  }

  useEffect(() => {
    if (!active) return undefined;

    document.body.style.overflow = "hidden";
    const listener = (event) => onKeyDown(event);
    document.addEventListener("keydown", listener);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", listener);
    };
  }, [active]);

  return (
    <>
      <div className={`${classNamePrefix}-gallery`}>
        {items.map((item, itemIndex) => (
          <button
            key={item.src}
            className={classes.trigger}
            type="button"
            onClick={() => setIndex(itemIndex)}
          >
            <img src={item.src} alt={alt} />
          </button>
        ))}
      </div>

      <div
        className={active ? classes.overlayActive : classes.overlay}
        aria-hidden={active ? "false" : "true"}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={classes.frame}>
          <button className={classes.close} type="button" onClick={close} aria-label="Close image">
            &times;
          </button>
          {active ? <img className={classes.image} src={items[index].src} alt={alt} /> : null}
        </div>
      </div>
    </>
  );
}
