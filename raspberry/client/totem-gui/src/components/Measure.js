import {useState,useEffect,useContext} from "react"
import Button from "@material-ui/core/Button"
import {Line} from "react-chartjs-2"
import Api from "../api/Api"
import moment from "moment"
import { Row, Column } from '@mui-treasury/components/flex';
import { WiHumidity } from "react-icons/wi";
import { FaHeartbeat, FaHeart } from "react-icons/fa";
import { Typography } from '@material-ui/core';

const style = {
    information: {
      justifyContent: "right",
      alignItems: "right",
      marginLeft: 'auto'
    }, graph: {
        width: '80%',
        margin: 'auto',
        height: '80vh'
    }
}

function Measure ({setMeasure,measure,user}) {
    
    let [mProgres,setMProgres] = useState(false)
    let [period,setPeriod] = useState(6000) // T = 5 secondi intervallo tra due misure
    let [measureError,setMeasureError] = useState(false)
    let [interval,setInt] = useState(0) // intervalId, viene 
    let [measureValue,setMeasureValue] = useState([])
    let [yGraph,setYGraph] = useState([])
    let [xGraph,setXGraph] = useState([])
    let average = 0

    let [name,setName] = useState("")

    let [message,setMessage] = useState("first")

    let x = [1,2,3,4,7,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    
    const options = {scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },}

    const data = {labels: x, // la x
    datasets: [
      {
        label: name,
        data: yGraph, // la y
        fill: false,
        backgroundColor: 'rgb(120, 99, 132)',
        borderColor: 'rgb(110, 99, 132)',
        tension: 0.1,
      },
    ],
    }

    let updateAverage = (value) => {
        console.log(value)
        console.log(typeof(value))
        const nvalue = parseInt(value) + parseInt(average)
        console.log(nvalue)
        console.log(typeof(nvalue))
        console.log(average)
        console.log(typeof(average))
        average = nvalue
        console.log("Adding value: ", average)
    }

    let convertMeasureValue = (jsonValue) => {
        console.log("Convert measure value")
        console.log(jsonValue)
        return (
            <>
            {name === "BloodPressure" && 
            <>
                <Typography>Max: {jsonValue.Max}</Typography>
                <Typography>Min: {jsonValue.Min}</Typography>
                <Typography>HRate: {jsonValue.HRate}</Typography>
            </>}
            {name === "OxygenSaturation" && 
                <Typography>Operc: {jsonValue.Operc}</Typography>}
            {name === "HeartRate" && 
                <Typography>HRate: {jsonValue.HRate}</Typography>}
            </>
        )
    }

    let onStartMeasure = () => {
       if(!mProgres){ 
        Api.startMeasure()
            .then((r)=>{
                if(r){
                    setMProgres(true)
                    const timer = setInterval(
                        ()=>{
                            
                            Api.getMeasure().then((m)=>{
                                
                                
                                if(m === false){
                                    setMProgres(false)
                                    setMeasure("no active measure")
                                }else{
                                    setMessage("process measure")
                                    let measure_json = JSON.parse(m.measureValue)

                                    setMeasure(m)
                                    setMeasureValue(measure_json)
                                    setMeasureError(false)
                                    setName(m.mtype)
                                    /**Aggiorno dati dei grafici */ 
                                    setXGraph(oldX => [...oldX,1])
                                    if(measure_json.hasOwnProperty("Max")){    
                                        setYGraph(oldL => [...oldL,measure_json["Max"]])
                                        setName("BloodPressure")
                                        updateAverage(measure_json["Max"])
                                    }                             
                                    if(measure_json.hasOwnProperty("Operc")){
                                        setYGraph(oldL => [...oldL,measure_json["Operc"]])
                                        setName("OxygenSaturation")
                                        updateAverage(measure_json["Operc"])
                                    }
                                    if(measure_json.hasOwnProperty("HRate") && !measure_json.hasOwnProperty("Max")){
                                        setYGraph(oldL => [...oldL,measure_json["HRate"]])
                                        setName("HeartRate")
                                        updateAverage(measure_json["HRate"])
                                    }
                                }
                            })
                            .catch(()=>{
                                console.log("err qui")
                                setMeasureError(true)
                            })
                        },period
                    )
                    setInt(timer)
                    
                }else{
                    setMeasureError(true)
                }
            })
            .catch()
        }
    }

    useEffect(()=>{
        
        if(mProgres === false){
            clearInterval(interval)
            setMessage("Measure is finished")
            average = average / yGraph.length
            //console.log("end measure")
        }
        if(mProgres){
           if(measure.thReached === 1){
               
               Api.postMeasure(user.googleId,
                "type",JSON.stringify(measureValue),
                measure.dateMeasure,measure.thReached)
               
                .then((resp)=>{
                   if(resp != false){
                    console.log("Measure seded to main server")
                   }
                   console.log("Error posting the measure into main server")
               }).catch((resp) => {
                   console.log("Error posting the measure into main server")
               })
               
           } 
        }
        
    })
    
    
    return(
        <>
        <Row p={3}>
            {mProgres == false &&
                <>
                <Button onClick={()=>onStartMeasure()} variant="contained"> Start Measure</Button>
                {/*<Typography>Average: {average}</Typography>*/}
                </>
            }
            {<Typography>{message}</Typography>}
            {measureError && <Typography>Problema con misurazione</Typography>}

            <Row style={style.information}>
                {mProgres == true && name == "BloodPressure" && <FaHeart />}
                {mProgres == true && name == "OxygenSaturation" && <WiHumidity />}
                {mProgres == true && name == "HeartBeat" && <FaHeartbeat />}
                {<Typography>Measure in progress : </Typography> && <Typography>{convertMeasureValue(measureValue)}</Typography>}
            </Row>
        </Row>
        <Row p={3} style={style.graph}>
            {mProgres == true &&
            <Line type={"line"} width={100} height={50} data={data} options={options}/>}
        </Row>
        </>
       
    )

}
export default Measure;
