import './App.css';
import { UserPage } from './bodyComponent/UserPage';
import { CreateUserPage } from './userComponent/CreateUserPage';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { CreatePost } from './postComponent/CreatePost';


function App() {
  return (
		<div className='App'>
			<Routes>
				<Route path='/HomePage' element={<HomePage />} />
				<Route path='/CreateUserPage' element={<CreateUserPage />} />
				<Route path='/UserPage' element={<UserPage />} />
				<Route path='/UserPage/createAPost' element={<CreatePost />} />
			</Routes>
		</div>
	)
}

export default App;
