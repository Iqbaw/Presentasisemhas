import React, { type ReactElement, type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppDe from './AppDe';
import LangSwitch from './components/LangSwitch';
import PageTurn from './components/PageTurn';
import ScrollCue from './components/ScrollCue';
import './styles/tokens.css';
import './styles/base.css';
import './styles/mobile.css';

/* Two versions of the same deck:
   /      → Bahasa Indonesia (App.tsx)
   /de    → Deutsch, A1–A2 (AppDe.tsx)
   Path-based so presenter mode (which keeps the pathname) opens the same version. */
const isDe = /^\/de\/?$/.test(window.location.pathname);
if (isDe) {
  document.documentElement.lang = 'de';
  document.title = 'Seminar Hasil — Nominalkomposita in Götzen-Dämmerung';
}

// App/AppDe are hook-free and just return <Deck>{slides}</Deck>; calling them
// here gives PageTurn the same slide elements to render the page underneath.
const deck = isDe ? AppDe() : App();
const slides = React.Children.toArray(
  (deck.props as { children: ReactNode }).children
) as ReactElement[];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {deck}
    <LangSwitch lang={isDe ? 'de' : 'id'} />
    <PageTurn slides={slides} />
    <ScrollCue lang={isDe ? 'de' : 'id'} />
  </React.StrictMode>
);
