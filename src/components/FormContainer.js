import React, { useState } from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import LineChart from './LineChart';


const Containner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    flex-direction: column;
    padding: 3rem 0;
    max-width: 900px;
    margin: auto;  

    h1 {
        font-size: 35px;
        font-weight: 500;
        color: #2a6279;
        margin-bottom: 10px;
        text-transform: uppercase; 
    }

    h3 {
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        margin-top: 3rem;
        background: #fff;
        padding: 3rem;
        color: #2a6279;
        box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
        0 6px 6px -1px rgba(8, 11, 14, 0.1);
        border-radius: 1rem; 
    }

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 1 rem; 
    }
`;

const InputSection = styled.div`
  width: 45%;
  min-width: 350px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  label {
    text-transform: uppercase;
    /* font-weight: 400; */
    font-weight: 700;
    font-size: 1.5rem; 
    /* color: grey; */
    color: #000;
    margin-bottom: 0.5rem;
  }

  input {
    /* background: rgba(255, 255, 255, 0.3); */
    background: #fff; 
    height: 35px;
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    color: #2a6279;
    font-weight: 500;

    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
      0 6px 6px -1px rgba(8, 11, 14, 0.1);
    transition: all 0.3s ease-in-out; 
    &:hover,
    &:focus {
      box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
        0 16px 16px -1px rgba(8, 11, 14, 0.1);
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #d8a051;
  color: #fff;
  border: none;
  width: 150px;
  height: 36px;
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  letter-spacing: 0.03em;
  line-height: 36px;
  border-radius: 2px;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
    0 6px 6px -1px rgba(8, 11, 14, 0.1);
  cursor: pointer; 
  margin-top: 1rem; 
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
      0 16px 16px -1px rgba(8, 11, 14, 0.1);
  }
`;

const Error = styled.h4`
    color: red;
    font-size: 13px;
    margin-bottom: 1rem; 
    `;

const chartOptions = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: "rgba(75,192,192,0.4)",
  borderColor: "rgba(75,192,192,1)",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "rgba(75,192,192,1)",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

const FormContainer = () => {
    const [purchasePrice, setPurchasePrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [loanApr, setLoanApr] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(0.0);

    const [monthsList, setMonthsList] = useState([]);
    const [chartData, setChartData] = useState(null);


    const submitCalculation = async (e) => {
        e.preventDefault();
        const validatedPrice = await validateField(purchasePrice, setPurchasePrice);
        const validatedPayment = await validateField(downPayment, setDownPayment);
        const validatedLoanTerm = await validateField(loanTerm, setLoanTerm);
        const validatedLoanApr = await validateField(loanApr, setLoanApr);
        if (
            validatedPrice &&
            validatedPayment &&
            validatedLoanTerm &&
            validatedLoanApr
        ) {
            calculateValues();
        }
    }

    const calculateValues = () => {
      let principal = purchasePrice - downPayment;
      let monthlyInterest = loanApr / 100 / 12;
      let numberOfPayments = loanTerm * 12;
      let monthlyPrice =
        (principal *
          [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments]) /
        [(1 + monthlyInterest) ** numberOfPayments - 1];
      setMonthlyPayment(monthlyPrice);
   
      let totalPayments = loanTerm * 12;
       let interestRecords = [];
       let principalRecords = [];
       let principalAmortization = [];
       let equityRecords = [];

       let monthsCounter = [];

       for (let i = 1; i <= totalPayments; i++) {
         monthsCounter.push(i);
         let monthlyInterestPayment = monthlyInterest * principal;
         interestRecords.push(Number(monthlyInterestPayment.toFixed(2)));

         let monthlyPrincipalPayment = monthlyPrice - monthlyInterestPayment;
         principalRecords.push(Number(monthlyPrincipalPayment.toFixed(2)));

         principal -= monthlyPrincipalPayment.toFixed(2);

         principalAmortization.push(Number(principal.toFixed(2)));
     
        let equity = purchasePrice - principal;
        equityRecords.push(Number(equity.toFixed(2)));
       }

         
         let data = [
           {
             ...chartOptions,
             data: interestRecords,
             label: "Interest Records",
             borderColor: "#ffcc00",
           },
           {
             ...chartOptions,
             data: principalRecords,
             label: "Principal Records",
             borderColor: "#ff0000",
           },
           {
             ...chartOptions,
             data: principalAmortization,
             label: "Principal Amortization",
             borderColor: "#000",
           },
           {
             ...chartOptions,
             data: equityRecords,
             label: "Equity Records",
           },
         ];
        setChartData(data)
        setMonthsList(monthsCounter);
    }

    const validateField = (field, setValue) => {
        let int = parseFloat(field);
        if (field === '' || field === 0) {
            setValue({ ...field.values, error: "Please enter a value"});
            return false;
        } else if (isNaN(int)) {
            setValue({ ...field.values, error: "Please enter a value"});
            return false;
        } else {
            setValue(int);
            return true; 
        }
    }
    return (
      <div>
        <Containner>
          <h1>Mortgage Calculator</h1>
          <form>
            <InputSection>
              <label>Purchase Price</label>
              <Error>{purchasePrice.error}</Error>
              <input
                onChange={(e) => setPurchasePrice(e.target.value)}
                type="text"
              />
            </InputSection>
            <InputSection>
              <label>Down Payment</label>
              <Error>{downPayment.error}</Error>
              <input
                onChange={(e) => setDownPayment(e.target.value)}
                type="text"
              />
            </InputSection>
            <InputSection>
              <label>Loan Term (Years)</label>
              <Error>{loanTerm.error}</Error>
              <input
                onChange={(e) => setLoanTerm(e.target.value)}
                type="text"
              />
            </InputSection>
            <InputSection>
              <label>APR (%)</label>
              <Error>{loanApr.error}</Error>
              <input onChange={(e) => setLoanApr(e.target.value)} type="text" />
            </InputSection>
            <SubmitButton onClick={(e) => submitCalculation(e)}>
              Calculate
            </SubmitButton>
          </form>
          <h3>
            Estimated Monthly Payments:{" "}
            {numeral(monthlyPayment).format("$0,0.00")}{" "}
          </h3>
        </Containner>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ backgroundColor: "#fff", width: "100%", height: 900 }}>
          {chartData && <LineChart data={chartData} labels={monthsList} />}
        </div>
      </div>
    );
}

export default FormContainer; 