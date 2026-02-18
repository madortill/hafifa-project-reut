import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import data from '../../data.json';
import './Carusel.css';

// ייבוא ישיר של התמונות והאייקונים
// import headerLogo from '../../assets/images/header-logo.svg';
import arrowRight from '../../assets/images/arrow-rigth.svg';
import arrowLeft from '../../assets/images/arrow-left.svg';
import babyImg from '../../assets/images/babyAs.svg';
import teenImg from '../../assets/images/middleAs.svg';
import adultImg from '../../assets/images/grownUpAs.svg';
import dotIcon from '../../assets/images/dot.svg'; // האיקון הקטן שמופיע בנקודות
import doubleArrowDown from '../../assets/images/next.svg';

const Carusel = () => {
  const slides = data.pages.filter(p => p.pageType === "carusel");
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, direction: 'rtl' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // מפה שמקשרת בין ה-ID של הדף לתמונה הספציפית
  const imageMap = {
    2: babyImg,
    3: teenImg,
    4: adultImg
  };

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
    <div className="carousel-screen">
      {/* כותרת עליונה עם הלוגו והטקסט המעוגל
      <header className="header-area">
        <img src={headerLogo} alt="סוגי אסטרואידים" className="logo-img" />
      </header> */}

      <div className="main-carousel-area">
        {/* חץ ימני */}
        <button className="nav-btn next" onClick={() => emblaApi?.scrollPrev()}>
          <img src={arrowRight} alt="הבא" />
        </button>

        {/* האזור הנראה של הקרוסלה */}
        <div className="embla-viewport" ref={emblaRef}>
          <div className="embla-container">
            {slides.map((slide) => (
              <div className="embla-slide" key={slide.id}>
                <h2 className="asteroid-title">{slide.subTitle}</h2>
                
                <div className="asteroid-circle-frame">
                  <img src={imageMap[slide.id]} className="asteroid-img" alt={slide.subTitle} />
                  <div className="asteroid-label-inner">{slide.subTitle}</div>
                </div>

                <p className="asteroid-description">{slide.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* חץ שמאלי */}
        <button className="nav-btn prev" onClick={() => emblaApi?.scrollNext()}>
          <img src={arrowLeft} alt="הקודם" />
        </button>
      </div>

      {/* אזור הנקודות והחץ למטה */}
      <footer className="footer-area">
        <div className="dots-navigation">
          {slides.map((_, i) => (
            <div key={i} className={`dot-item ${i === selectedIndex ? 'active' : ''}`}>
               {/* אם האינדקס פעיל, אפשר להציג את האיקון הקטן מהתמונה */}
               {i === selectedIndex ? <img src={dotIcon} alt="active" /> : <div className="dot-placeholder" />}
            </div>
          ))}
        </div>

        {/* חץ סיום - מופיע רק בסלייד האחרון (בוגר) */}
        {selectedIndex === slides.length - 1 && (
          <div className="finish-arrow">
            <img src={doubleArrowDown} alt="המשך" />
          </div>
        )}
      </footer>
    </div>
  );
};

export default Carusel;