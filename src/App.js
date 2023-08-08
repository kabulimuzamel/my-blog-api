import './App.css';
import { UserPage } from './bodyComponent/UserPage';
import { CreateUserPage } from './userComponent/CreateUserPage';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { LoginPage } from './HomePage/LoginPage';
import { AllPost } from './postComponent/AllPost';

function App() {
  return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/LoginPage' element={<LoginPage/>}/>
				<Route path='/CreateUserPage' element={<CreateUserPage />} />
				<Route path='/UserPage' element={<UserPage/>} />
				<Route path='/AllPosts' element={<AllPost/>}/>
			</Routes>
		</div>
	)
}

export default App;
