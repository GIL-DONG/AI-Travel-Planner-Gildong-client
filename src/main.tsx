import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import App from './App.tsx';
import './styles/reset.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RecoilRoot>
          <App />
          <ReactQueryDevtools />
        </RecoilRoot>
      </HelmetProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
