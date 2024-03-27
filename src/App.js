import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCoupons from './pages/admin/AdminCoupons'
import AdminOrderList from './pages/admin/AdminOrderList'
import FrontLayout from './pages/front/FrontLayout'
import Products from './pages/front/Products'
import ProductDetail from './pages/front/ProductDetail'
import Cart from './pages/front/Cart'
import CheckOut from './pages/front/CheckOut'
import Success from './pages/front/success'
import Form from './pages/front/Form'
import { useEffect } from 'react'
import Home from './pages/front/Home'





function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
  }, [])
  return (
    <div className="App"  >
      <Routes>
        <Route path='/' element={<FrontLayout />}>
          <Route path='' element={<Home />}></Route>
          <Route path='product' element={<Products />}></Route>
          <Route path='form' element={<Form />}></Route>
          <Route path='product/:id' element={<ProductDetail />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='checkout' element={<CheckOut />}></Route>
          <Route path='success/:orderId' element={<Success />}></Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Dashboard />}>
          <Route path='products' element={<AdminProducts />} />
          <Route path='coupons' element={<AdminCoupons />} />
          <Route path='orders' element={<AdminOrderList />} /></Route>
      </Routes>
    </div >
  );
}

export default App;
