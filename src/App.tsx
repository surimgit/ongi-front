import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import { NEEDHELPER_PATH } from './constants';
import NeedHelper from './views/NeedHelper';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path={NEEDHELPER_PATH}>
          <Route index element={<NeedHelper />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
