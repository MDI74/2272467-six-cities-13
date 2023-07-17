import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import { Settings } from './constants/settings.ts';
import { offers } from './mocks/offers.ts';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      rentOfferCount={Settings.RentOfferCount}
      offers={offers}
    />
  </React.StrictMode>
);
