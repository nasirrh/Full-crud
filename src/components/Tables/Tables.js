import React from 'react'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import Paginations from '../pagination/Paginations'
import { NavLink } from 'react-router-dom'
import { statuschangefunc } from '../../services/Apis'
import { ToastContainer, toast } from "react-toastify";
import "./table.css"

const Tables = ({userdata, deleteUser, userGet, handlePrevious,handleNext,page,pageCount,setPage,}) => {
  
  const handleChange = async(id,status)=>{
       const response = await statuschangefunc(id,status);
       if(response.status === 200){
        userGet();
        toast.success("status Updated")
       }else{
        toast.error("error")
       }
  }
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="aligin-align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>Category</th>
                    <th>Product Name</th>
                    <th>Date Of Sale</th>
                    <th>Region Code</th>
                    <th> Store Code</th>
                    <th>No Of Pieces</th>
                    <th>Amount</th>
                    <th>Tax</th>
                    <th>Total Amount</th>
                    <th>Active Sport Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1)*10}</td>
                            <td>{element.category}</td>
                            <td>{element.product}</td>
                            <td>{element.dateofsale}</td>
                            <td>{element.rgioncode}</td>
                            <td>{element.storecode}</td>
                            <td>{element.noofpieces}</td>
                            <td>{element.amount}</td>
                            <td>{element.tax}</td>
                            <td>{element.totalamount}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      element.status == "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {element.status}
                                    <i class="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "Active")
                                    }
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "InActive")
                                    }
                                  >
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td>
                              <Dropdown variant="light" className="text-center">
                                <Dropdown.Toggle
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        class="fa-solid fa-eye"
                                        style={{ color: "green" }}
                                      ></i>
                                      <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        class="fa-solid fa-pen-to-square"
                                        style={{ color: "blue" }}
                                      ></i>
                                      <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div
                                      onClick={() => deleteUser(element._id)}
                                    >
                                      <i
                                        class="fa-solid fa-trash"
                                        style={{ color: "red" }}
                                      ></i>
                                      <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center">No Dataa Found</div>
                  )}
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
}

export default Tables
