import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'ka-table/style.css';
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
    <ToastContainer position='bottom-left' autoClose={2000}></ToastContainer>
  </ Provider>
)
