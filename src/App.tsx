import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import './App.css';
import { PRODUCT_PATH, PRODUCT_VIEW_PATH, WRITE_PATH } from './constants';
import ProductWrite from './views/Product/write';
import ProductMain from './views/Product';
import DetailProduct from './views/Product/detail';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path={PRODUCT_PATH}>
          <Route index element={<ProductMain/>}/>
          <Route path={WRITE_PATH} element={<ProductWrite/>}/>
          <Route path={PRODUCT_VIEW_PATH} element={<DetailProduct/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
