import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from './Components/Footer.js';
import DepartmentsPage from './Views/DepartmentsPage.js';
import Dashboard from './Views/Dashboard.js';
import EmployeesPage from './Views/EmployeesPage.js';
import PalletsPage from './Views/PalletsPage.js';
import EmployeePage from './Views/EmployeePage.js';
import CreateEmployee from './Components/CreateEmployee.js';
import CreateProduct from './Components/CreateProduct.js';
import CreateDepartment from './Components/CreateDepartment.js';
import EmployeesByDepartmentPage from './Views/EmployeesByDepartmentPage.js';
import LoginPage from './Views/LoginPage.js';
import NewPalletPage from './Views/NewPalletPage.js';
import ProductPage from './Views/ProductPage.js';
import SettingsPage from './Views/SettingsPage.js';
import ProductsPage from './Views/ProductsPage.js';
import ProductsByDepartment from './Views/ProductsByDepartmentPage.js';
import ProductLogsPage from './Views/ProductLogsPage.js';
import PalletsByDepartmentPage from './Views/PalletsByDepartment.js';
import PalletPage from './Views/PalletPage.js';
import ResultPage from './Views/ResultPage.js';

function App() {
  return (
    <div>
      <Router>
        
          <Route exact path="/"><LoginPage/></Route>
        
        <>
          <Switch>
            <Route path="/dashboard"> <Dashboard/></Route>
            <Route exact path="/departments"><DepartmentsPage /></Route>
            <Route exact path="/employees"><EmployeesPage /></Route>
            <Route path='/employees/:id'><EmployeePage /></Route>
            <Route path='/departments/:name/employees'><EmployeesByDepartmentPage /></Route>
            <Route path="/newEmployee"><CreateEmployee /></Route>
            <Route path="/newDepartment"><CreateDepartment/></Route>
            <Route exact path="/pallets"><PalletsPage/></Route>
            <Route path="/pallets/:id"><PalletPage/></Route>
            <Route exact path="/products"><ProductsPage/></Route>
            <Route path="/newProduct"><CreateProduct/></Route>
            <Route path="/newPallet"><NewPalletPage/></Route>
            <Route exact path="/products/:barcode"><ProductPage/></Route>
            <Route path="/products/:barcode/logs"><ProductLogsPage/></Route>
            <Route path="/departments/:name/products"><ProductsByDepartment/></Route>
            <Route path="/departments/:name/pallets"><PalletsByDepartmentPage/></Route>
            <Route path="/settings"><SettingsPage/></Route>
            <Route path="/results/:term"><ResultPage/></Route>

          </Switch>
        </>
        <Footer />
      </Router>




    </div>
  );
}

export default App;
