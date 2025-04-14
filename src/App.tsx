import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import './App.css';
import { PRODUCT_PATH, WRITE_PATH } from './constants';
import ProductWrite from './views/Product/write';
import ProductMain from './views/Product';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path={PRODUCT_PATH}>
          <Route index element={<ProductMain/>}/>
          <Route path={WRITE_PATH} element={<ProductWrite/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
