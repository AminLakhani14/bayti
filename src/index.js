import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ConsentAdultEnglishUAE from './ConsentAdultEnglishUAE';
import ConsentMinorEnglishUAE from './ConsentMinorEnglishUAE';
import ConsentMinorArabicUAE from './ConsentMinorArabicUAE';
import ConsentAdultArabicUAE from './ConsentAdultArabicUAE';
import Homepage from './homepage'; // Note: Component names should be capitalized
import { ThankYou } from './thankyou';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} /> {/* This makes homepage the default */}
          <Route path="adult-en" element={<ConsentAdultEnglishUAE />} />
          <Route path="adult-ar" element={<ConsentAdultArabicUAE />} />
          <Route path="child-en" element={<ConsentMinorEnglishUAE />} />
          <Route path="child-ar" element={<ConsentMinorArabicUAE />} />
          <Route path="thankyou" element={<ThankYou />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);