import './App.css';
import { UserPage } from './bodyComponent/UserPage';
import { CreateUserPage } from './userComponent/CreateUserPage';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { CreatePost } from './postComponent/CreatePost';
import { LoginPage } from './HomePage/LoginPage';
import { RoutesProtection } from './HomePage/RoutesProtection';

function App() {
  return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/LoginPage' element={<LoginPage/>}/>
				<Route path='/CreateUserPage' element={<CreateUserPage />} />
			</Routes>
		</div>
	)
}

export default App;
