

  
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import data from '../../data.json';
import './Carusel.css';

const Carusel = () => {
  // סינון המערך כך שיכיל רק דפי קרוסלה
  const slides = data.pages.filter(page => page.pageType === "carusel");
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: 'rtl' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="carousel-container">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-flex">
          {slides.map((slide) => (
            <div className="carousel-slide" key={slide.id}>
              <img src={slide.image} alt={slide.subTitle} className="carousel-img" />
              <div className="carousel-overlay">
                <span className="carousel-subtitle">{slide.subTitle}</span>
                <p className="carousel-content">{slide.content}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn prev-btn" onClick={() => emblaApi?.scrollPrev()}>▶</button>
        <button className="nav-btn next-btn" onClick={() => emblaApi?.scrollNext()}>◀</button>
      </div>

      <div className="dots-container">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === selectedIndex ? 'dot--active' : ''}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carusel;
