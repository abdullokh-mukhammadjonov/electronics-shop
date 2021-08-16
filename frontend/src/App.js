import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import CartScreen from './screens/CartScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentSreen from './screens/PaymentScreen'
import PlaceOrder from './screens/PlaceOrderScren'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/signin' component={LoginScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentSreen} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/signup' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userslist' component={UsersListScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/products/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/users/:id/edit' component={UserEditScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
