import React, { useState } from "react";
import Sidebar from "../Components/SearchSidebar";
import { Redirect, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import SearchProducts from "../Components/SearchProduct";
import SearchEmployees from "../Components/SearchEmployee";

const ResultPage = () => {
    let params = useParams();
    const [searchTerm, setTerm] = useState(params.term);
    const department = localStorage.getItem("department");
    const [emptyProductList, handleProductEmptyList] = useState(true);
    const [emptyEmployeeList, handleEmployeeEmptyList] = useState(true);
    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
    }
    return (
        <>
            <Sidebar term={searchTerm} onChangeTerm={setTerm}
            />
            <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                <div>
                    {emptyProductList && emptyEmployeeList?
                        <>
                            <h1 className='text-center py-5 text-2xl text-danger'  ><strong>No Result!!!</strong></h1>
                            <SearchProducts emptyProductList={handleProductEmptyList} term={searchTerm} department={department} />
                            <SearchEmployees emptyEmployeeList={handleEmployeeEmptyList} term={searchTerm} />
                            {console.log(searchTerm)}
                        </> : <>
                        {emptyProductList?
                        <SearchProducts emptyProductList={handleProductEmptyList} term={searchTerm} department={department} />:
                        <>
                        {emptyEmployeeList ? 
                        <SearchEmployees emptyEmployeeList={handleEmployeeEmptyList} term={searchTerm} /> : 
                        null}
                        </>
                        }
                         </>}
                    {!emptyProductList ? <>
                        <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>Products</strong></h1>

                        <Table striped bordered hover className="w-75 container mt-1">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                    <th>Title</th>
                                    <th>Weight</th>
                                    <th>Vendor</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SearchProducts emptyProductList={handleProductEmptyList} term={searchTerm} department={department}
                                />
                                {console.log(searchTerm)}
                            </tbody>
                        </Table>
                    </> : <>
                    {/* {handleProductEmptyList(true)}  */}
                    </>}
                    {console.log(emptyProductList)}
                    {console.log(emptyEmployeeList)}
                    {department === "Administration" && !emptyEmployeeList ?
                        <>
                        {console.log("here")}
                            <h1 className='text-center pb-5 pt-3' style={{ "fontSize": "40px" }}><strong>Employee List</strong></h1>

                            <Table striped bordered hover className="w-75 container ">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <SearchEmployees emptyEmployeeList={handleEmployeeEmptyList} term={searchTerm} />
                                </tbody>
                            </Table>
                        </> : <>
                        {/* {handleEmployeeEmptyList(true)}  */}
                        </>}







                </div>
            </div>

        </>
    )
}
export default ResultPage;