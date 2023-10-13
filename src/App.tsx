import {lazy} from 'react';
import zeviLogo from './assets/images/zevi-logo.png';
import { Routes, Route, Link } from 'react-router-dom';

const Home = lazy(()=> import('./components/Home/Home.tsx'));
const Search = lazy(()=> import('./components/Search/Search.tsx'));

function App() {
  return (
    <div className="relative align-middle justify-center flex">
      <Link to="/">
        <img src={zeviLogo} className='absolute right-5 top-2 mix-blend-darken' alt="zevi logo" />
      </Link>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
