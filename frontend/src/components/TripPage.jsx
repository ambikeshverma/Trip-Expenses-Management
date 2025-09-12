import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../api";
import NotifyPermission from "./NotifyPermission";
// import TransactionsTable from "./TransactionsTable";
import SearchUser from "./SearchUser";
import { toast } from "react-toastify";
import "./Styles/TripPage.css";
import AddExpenseForm from "./AddExpenseForm";
import AddMoneyForm from "./AddMoneyForm";
import Nav from "./Nav";
import Footer from "./Footer";

export default function TripPage({ token }) {
  const navigate =useNavigate();
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("add");
  const [remarks, setRemarks] = useState("");
  const [isOpenAddMoneyForm, setIsOpenAddMoneyForm] = useState(false)
  const [isOpenAddExpenForm, setIsOpenAddExpenForm] = useState(false)

  const headers = { headers: { Authorization: "Bearer " + token } };

  const load = async () => {
    try {
      const res = await api.get(
        "http://localhost:3000/api/trips/" + id,
        headers
      );
      setTrip(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Cannot load trip");
    }
  };

  useEffect(() => {
    if (token) load();
  }, [id, token]);

  return (
    <>
    <Nav title={"Trips Data"}></Nav>
    <div className="tripSpecificPage">
      <div className="containerPart1">
        <div className="tripPageCard">
          <div className="tripCoverPhoto">
            <img src="/src/assets/bg3.jpg" width="700px" alt="" />
          </div>
          <div className="dataCont3">
            <div className="location">
              <img src="/src/assets/Location.png" width="20px" alt="" />
              <h4>{trip?.title}</h4>
            </div>
            <div className="tripDate">
              <img src="/src/assets/Date.png" width="20px" alt="" />
              <h4>Date Here</h4>
            </div>
          </div>
        </div>
        <div className="notiBox">
          <h5>Manage notification permission</h5>
          <NotifyPermission tripId={id} token={token} />
        </div>
        <div className="searchBarCont">
          <SearchUser tripId={id} token={token} onMemberAdded={load} />
        </div>
        <div className="expenseCard">
          <button onClick={()=>setIsOpenAddExpenForm(true)}>
            <span>+</span>
            <span>Add Expense</span>
          </button>
          <AddExpenseForm refreshTrip={load} tripId={id} token={token} isOpenAddExpenForm={isOpenAddExpenForm} closeExpenseForm={()=>setIsOpenAddExpenForm(false)}></AddExpenseForm>
          <div className="detailCard">
            <div className="d1 total">
              <div className="c1">
                  <img src="/src/assets/Total.png" width="28px" alt="" />
                  <span>Total</span>
              </div>
              <img src="/src/assets/Forward Arrow.png" width="18px" alt="" />
            </div>
            <div className="d1 ExpenseSum">
              <div className="c1">
                 <img src="/src/assets/Summary.png" width="28px" alt="" />
                 <span>Summary</span>
              </div>
              <img src="/src/assets/Forward Arrow.png" width="18px" alt="" />
            </div>
            <div className="d1 Stats" onClick={()=>navigate('/stats')}>
              <div className="c1">
                 <img src="/src/assets/Stats.png" width="28px" alt="" />
                 <span>Stats</span>
              </div>
              <img src="/src/assets/Forward Arrow.png" width="18px" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="containerPart2">
        <div className="BalanceSum">
          <h3>Balance Summary</h3>
          <div className="sumData">
            <div className="contriData">
              <span className="head">Total Contribute</span>
              <span className="headData1">$ 12,000</span>
            </div>
            <div className="totalExpenseData">
              <span className="head">Total Expense</span>
              <span className="headData2">$ 11,000</span>
            </div>
          </div>
          <div className="balanceData">
            <span>Balance</span>
            <span className="headData3">₹{trip?.totalBalance ?? 0}</span>
          </div>
          <button onClick={()=>setIsOpenAddMoneyForm(true)}>
            <span>+</span>
            <span>Add Money</span>
          </button>
          <AddMoneyForm refreshTrip={load} tripId={id} token={token} isOpenAddMoneyForm={isOpenAddMoneyForm} closeMoneyForm={()=>setIsOpenAddMoneyForm(false)}></AddMoneyForm>
        </div>

        <div className="membersCard">
          <h3>Trip Members</h3>
          <div className="member">
            <img src="/src/assets/Person.png" width="28px" alt="" />
            <div>Ambikesh Verma</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}
