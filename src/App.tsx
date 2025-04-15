import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import MyPage from './views/MyPage';
import Auth from './views/Auth';

function App() {
  return (
    <Routes>      
      <Route path='/auth' element={<Auth />} />
      <Route element={<Layout />}>
        <Route path='/main' element={<HomePage/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
