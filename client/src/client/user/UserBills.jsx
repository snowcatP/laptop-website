import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from '../components/Letter';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getBillsOfCustomer } from '../service/Bill';
import moment from "moment";

const UserBills = () => {
    const { user } = useAuth();
    const [bills, setBills] = useState([]);


    const token = localStorage.getItem("token");
    const header = {
        Authorization: "Bearer " + token,
    };

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await getBillsOfCustomer(user.customerId, header);
                if (response.status === 200) {
                    setBills(response.data);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getOrder();
    }, [bills]);



    return (
        <>
            <Header />
            <Navigation />

            <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
                <div className="section">
                    <div className="container">
                        <div className="row">
                            <Sidebar />
                            <div className="col-md-9" style={{ minHeight: "65vh", backgroundColor: "white" }}>
                                <div className="" style={{ margin: "2em" }}>
                                    <h3>Bill</h3>
                                    <hr />
                                </div>
                                <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
                                    <div id="cart" className="" style={{ minHeight: "75vh", backgroundColor: "white" }}>
                                        <div className="" style={{ marginTop: "2em", marginBottom: "2em" }}>
                                            <div className="col-md-10">
                                                <div className="card">
                                                    <div className="card-header">
                                                        {bills === null && <h3 style={{ color: "green" }}>You have no Order!</h3>}
                                                    </div>
                                                    {bills && (
                                                        <div className="scrollable-table" style={{ color: "black" }}>
                                                            <div className="scrollable-table" style={{ maxWidth: "1300px", overflowY: "auto" }}>
                                                                <table className={"table table-bordered m-0 text-center"} style={{ margin: "0 auto", minWidth: "1000px" }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="text-center py-3 px-4" style={{ width: "50px" }}>
                                                                                Order ID
                                                                            </th>
                                                                            <th className="text-center py-3 px-4" style={{ width: "300px" }}>
                                                                                Product
                                                                            </th>
                                                                            <th className="text-center py-3 px-4" style={{ width: "120px" }}>
                                                                                Total Price
                                                                            </th>
                                                                            <th className="text-center py-3 px-4" style={{ width: "20px" }}>
                                                                                Date Create
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {bills?.sort((a, b) => b.billId - a.billId).map((bill, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td className="text-center font-weight-semibold align-middle p-4" >
                                                                                        {bill.billId}
                                                                                    </td>

                                                                                    {bill.billDetailsList.map((billDetail, detailIndex) => {
                                                                                        const product = billDetail.product;
                                                                                        return (
                                                                                            <>
                                                                                                <tr key={detailIndex}>
                                                                                                    <td className="p-4">
                                                                                                        <input type="hidden" name="productId" value={product.productId} />
                                                                                                        <div className="media align-items-center">
                                                                                                            <div className="row">
                                                                                                                <div className="col-md-4">
                                                                                                                    <img src={`${product.image1}`} className="d-block ui-w-40 ui-bordered mr-4" alt="" style={{ height: "100px" }} />
                                                                                                                </div>
                                                                                                                <div className="media-body">
                                                                                                                    <a href={`view_detail?pid=${product.productId}`} className="d-block text-dark">
                                                                                                                        {product.productName}
                                                                                                                    </a>
                                                                                                                    <br />
                                                                                                                    <small>
                                                                                                                        <span className="">Category: {product.category}</span>
                                                                                                                        <br />
                                                                                                                        <span className="">Brand: {product.brand}</span>
                                                                                                                        <br />
                                                                                                                    </small>
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>

                                                                                                    </td>

                                                                                                    <td>
                                                                                                        <div style={{ margin: "20px" }}>{billDetail.quantity}x</div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </>
                                                                                        );
                                                                                    })}
                                                                                    <td className="text-center font-weight-semibold align-middle p-4">
                                                                                        {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(bill.totalPrice)}
                                                                                    </td>
                                                                                    <td className="text-center font-weight-semibold align-middle p-4">
                                                                                        {moment(bill.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                                                                                    </td>



                                                                                </tr>
                                                                            );
                                                                        })}



                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Letter />
            <Footer />
        </>
    )
}

export default UserBills