import {useState,useEffect,useContext} from "react"
import Button from "@material-ui/core/Button"
import {Line} from "react-chartjs-2"
import Api from "../api/Api"
import moment from "moment"
import { Row, Column } from '@mui-treasury/components/flex';
import { WiHumidity } from "react-icons/wi";
import { FaHeartbeat, FaHeart } from "react-icons/fa";
import { Typography } from '@material-ui/core';
import NavigationBar from "./NavigationBar"

const style = {
    information: {
      justifyContent: "center",
      alignItems: "center",
      margin: 'auto'
    }, graph: {
        width: '80%',
        margin: 'auto',
        height: '80vh'
    }, message: {
        justifyContent: "center",
        alignItems: "center",
        margin: 'auto'
    }, btn: {
        marginLeft: '20px'
    }, container: {
        
    }
}

function Measure ({setMeasure, measure, user, handleLogout}) {
    
    let [mProgres,setMProgres] = useState(false)
    let [period,setPeriod] = useState(6000) // T = 6 secondi intervallo tra due misure
    let [measureError,setMeasureError] = useState(false)
    let [interval,setInt] = useState(0) // intervalId, viene 
    let [measureValue,setMeasureValue] = useState([])
    let [yGraph,setYGraph] = useState([])
    let [xGraph,setXGraph] = useState([])
    let [isCritic, setIsCritic] = useState(false)
    let average = 0
    let [first,setFirst] = useState(true)
    let [name,setName] = useState("")
    let [sended,setSended] = useState(false)

    let [message,setMessage] = useState("Inizia Misura")

    let x = [1,2,3,4,7,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    
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
                                    setMeasure("No active measure")
                                }else{
                                    setMessage("Process measure")
                                    let measure_json = JSON.parse(m.measureValue)
                                    setSended(false)
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
        
        if(mProgres === false && !first){
            console.log("qui")
            clearInterval(interval)
            setMessage("Measure is finished")
            average = average / yGraph.length
            setYGraph([]) // azzero dati misura precedente
            setName("")
            setFirst(true)
            setSended(false)
            //console.log("end measure")
        }
        if(mProgres){
            //console.log(measure.thReached )
            setFirst(false)
            if(measure.thReached === 1 && !sended){
                //console.log(JSON.stringify(measureValue))
               setIsCritic(true)

               setSended(true)

               Api.postMeasure(user.googleId,
                name,JSON.stringify(measureValue),
                measure.dateMeasure,measure.thReached)
               
                .then((resp)=>{
                   if(resp != false){
                    console.log("Measure seded to main server")
                   }else{
                    console.log("Error posting the measure into main server")
                   }
                   
               }).catch((resp) => {
                   console.log("Error posting the measure into main server"+resp)
               })
               
           } else {
               setIsCritic(false)
           }
        }
        
    })
    
    
    return(
        <>
        <Row p={2}>
            {mProgres == false &&
                <>
                <Button variant="contained" color="primary" style={style.btn}
                    onClick={()=>onStartMeasure()}
                > 
                    Start Measure
                </Button>
                {/*<Typography>Average: {average}</Typography>*/}
                <Row style={style.message}>
                    {<Typography variant="h4">{message}</Typography>}
                    {measureError && <Typography>Problema con misurazione</Typography>}
                </Row>
                </>
            }
            

            {mProgres == true &&
            <>
            <Typography variant="h6">Status: {message}</Typography>
            <Row style={style.information}>
                {name == "BloodPressure" && <FaHeart size="4em" color={isCritic? 'red' : 'green'} />}
                {name == "OxygenSaturation" && <WiHumidity size="4em" color={isCritic? 'red' : 'green'}/>}
                {name == "HeartBeat" && <FaHeartbeat size="4em" color={isCritic? 'red' : 'green'}/>}
                <Row>
                    <Typography>{convertMeasureValue(measureValue)}</Typography>
                </Row>
            </Row></>}
        </Row>
        <Row p={2} style={style.graph}>
            {mProgres == true &&
            <Line type={"line"} width={100} height={50} data={data} options={options}/>}
        </Row>
        </>
       
    )

}
export default Measure;
