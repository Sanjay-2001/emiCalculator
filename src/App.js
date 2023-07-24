import React, { useState } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Table, TableCell, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableDetails from "./TableDetails";
import SliderMarks from "./SliderMarks";

const useStyles = makeStyles({
  root: { color: "MediumVioletRed", height: 10 },
  thumb: {
    height: 25,
    width: 25,
    backgroundColor: "white",
    border: "3px solid black",
    marginTop: -9,
    marginLeft: -9,
  },
  track: { height: 10, borderRadius: 4 },
  rail: { height: 10, borderRadius: 4 },
});

function App() {
  const classes = useStyles();
  const [pAmount, setpAmount] = useState(2755000);
  const [interest, setinterest] = useState(7);
  const [duration, setDuration] = useState(147);
  const maxValue = 6000000;
  const intMax = 20;
  const maxDuration = 360;

  const emiInterest = interest / 1200;
  const emi =
    duration > 0
      ? Math.round(
          (pAmount * emiInterest) /
            (1 - Math.pow(1 / (1 + emiInterest), duration))
        )
      : 0;
  const totalAmt = duration * emi;
  const TotalAmountOfInterest = Math.round(totalAmt - pAmount);

  return (
    <div className="App">
      <div className="CalApp">
        <h2 className="CalHeading">
          <u>EMI Calculator</u>
        </h2>
        <div>
          <Typography gutterBottom>
            <strong>Loan Amount</strong>
          </Typography>
          <Slider
            value={pAmount}
            marks={SliderMarks.marksAmt}
            onChange={(event, vAmt) => {
              setpAmount(vAmt);
            }}
            defaultValue={pAmount}
            max={maxValue}
            classes={{
              root: classes.root,
              thumb: classes.thumb,
              track: classes.track,
              rail: classes.rail,
            }}
          />
        </div>
        <div>
          <Typography gutterBottom>
            <strong>Interest Rate %</strong>
          </Typography>
          <Slider
            value={interest}
            marks={SliderMarks.marksInt}
            onChange={(event, vInt) => {
              setinterest(vInt);
            }}
            max={intMax}
            defaultValue={interest}
            classes={{
              root: classes.root,
              thumb: classes.thumb,
              track: classes.track,
              rail: classes.rail,
            }}
          />
        </div>
        <div>
          <Typography gutterBottom>
            <strong>Tenure (Months)</strong>
          </Typography>
          <Slider
            value={duration}
            marks={SliderMarks.marksTenure}
            onChange={(event, vDur) => {
              setDuration(vDur);
            }}
            max={maxDuration}
            defaultValue={duration}
            classes={{
              root: classes.root,
              thumb: classes.thumb,
              track: classes.track,
              rail: classes.rail,
            }}
          />
        </div>
        <div>
          <Table>
            <TableRow>
              <TableCell>
                <TableDetails
                  pAmount={pAmount}
                  totalAmt={totalAmt}
                  interest={interest}
                  duration={duration}
                  emi={emi}
                  TotalAmountOfInterest={TotalAmountOfInterest}
                />
              </TableCell>
              <TableCell>
                <Line
                  data={{
                    labels: ["Total Interest", "Total Amount"],
                    datasets: [
                      {
                        data: [TotalAmountOfInterest, pAmount],
                        backgroundColor: ["red", "blue"],
                      },
                    ],
                  }}
                  width={200}
                  height={200}
                />
              </TableCell>
            </TableRow>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
