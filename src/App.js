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
				<Route path='/HomePage' element={<HomePage />} />
				<Route path='/HomePage/LoginPage' element={<LoginPage/>}/>
				<Route path='/HomePage/CreateUserPage' element={<CreateUserPage />} />
				<Route element={<RoutesProtection/>}>
					<Route path='/UserPage/Main' element={<UserPage />} />
					<Route path='/UserPage/createAPost' element={<CreatePost />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App;
