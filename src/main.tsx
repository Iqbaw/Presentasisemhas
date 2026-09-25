import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppDe from './AppDe';
import LangSwitch from './components/LangSwitch';
import PageTurn from './components/PageTurn';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isDe ? <AppDe /> : <App />}
    <LangSwitch lang={isDe ? 'de' : 'id'} />
    <PageTurn />
  </React.StrictMode>
);
