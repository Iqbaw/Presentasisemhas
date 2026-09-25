import { useEffect, useState } from 'react';

/* Phones: when the current slide is taller than the screen (mobile.css lets
   it scroll instead of clipping), show a small "scroll ↓" cue above the dock
   until the reader reaches the bottom. */
export default function ScrollCue({ lang }: { lang: 'id' | 'de' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('presenter')) return;
    const phone = window.matchMedia('(max-width: 640px)');
    let timer = 0;
    const check = () => {
      const deck = document.querySelector('.deck');
      const stage = deck
        ? Array.from(deck.children).find((c) => c.classList.contains('slide-stage'))
        : null;
      const slide = stage?.firstElementChild as HTMLElement | null | undefined;
      setShow(
        !!slide &&
          phone.matches &&
          slide.scrollHeight - slide.clientHeight - slide.scrollTop > 12
      );
    };
    const soon = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(check, 250); // after the slide/tab has rendered
    };
    const onScroll = (e: Event) => {
      if ((e.target as Element | null)?.classList?.contains('slide')) check();
    };
    soon();
    window.addEventListener('hashchange', soon);
    window.addEventListener('resize', soon);
    document.addEventListener('click', soon, true);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', soon);
      window.removeEventListener('resize', soon);
      document.removeEventListener('click', soon, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="scroll-cue" aria-hidden>
      {lang === 'de' ? 'Scrollen' : 'Gulir'} ↓
    </div>
  );
}
