import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import MyPage from './views/MyPage';
import Inquiry from './views/MyPage/Inquiry';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/main' element={<HomePage/>}/>
        <Route path='/mypage'>
          <Route index element={<MyPage/>}/>
          <Route path='inquiry' element={<Inquiry/>}/>
        </Route> 
      </Route>
    </Routes>
  );
}

export default App;
