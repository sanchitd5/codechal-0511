import { Routes, Route } from 'react-router-dom';
import { Home, Post } from 'views';

const Router = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:userId' element={<Post />} />
    </Routes>;
};

export default Router;