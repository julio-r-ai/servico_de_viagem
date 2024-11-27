import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { FormTravelRequest } from './routes/Form';
import { TravelOptions } from './routes/TravelOptions';
import { TravelHistory } from './routes/TravelHistory';
import { Message } from './routes/Message';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: '/',
        element: <FormTravelRequest/>
      },
      {
        path: '/travelOptions',
        element: <TravelOptions/>
      },
      {
        path: '/travelHistory',
        element: <TravelHistory/>
      },
      {
        path: '/message',
        element: <Message/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
