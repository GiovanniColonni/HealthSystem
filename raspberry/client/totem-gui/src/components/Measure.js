import {useState,useEffect} from "react"
import Button from "@material-ui/core/Button"
import {Line} from "react-chartjs-2"
import Api from "../api/Api"
import moment from "moment"

function Measure ({setMeasure,measure}) {
    
    let [mProgres,setMProgres] = useState(false)
    let [period,setPeriod] = useState(6000) // T = 5 secondi intervallo tra due misure
    let [measureError,setMeasureError] = useState(false)
    let [interval,setInt] = useState(0) // intervalId, viene 
    let [measureValue,setMeasureValue] = useState([])
    let [yGraph,setYGraph] = useState([])
    let [xGraph,setXGraph] = useState([])

    let [name,setName] = useState("")

    let [message,setMessage] = useState("first")

    let a = [1,2,3,4,7,5,6,7,8,9,10,11]
    
    const options = {scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },}

    const data = {labels: a, // la x
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
                                    }                             
                                    if(measure_json.hasOwnProperty("Operc")){
                                        setYGraph(oldL => [...oldL,measure_json["Operc"]])
                                    }
                                    if(measure_json.hasOwnProperty("HRate") && !measure_json.hasOwnProperty("Max")){
                                        setYGraph(oldL => [...oldL,measure_json["HRate"]])
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
            //console.log("end measure")
        }
        if(mProgres){
           if(measure.thReached === 1){
               /*
               Api.postMeasure(JSON.stringify(measure),measure.dateMeasure)
               .then((resp)=>{
                   if(resp != false){
                    console.log("Measure seded to main server")
                   }
                   console.log("Error posting the measure into main server")
               }).catch((resp) => {
                   console.log("Error posting the measure into main server")
               })
               */
           } 
        }
        
    })
    
    
    return(
        <div>
            <Button onClick={()=>onStartMeasure()} variant="contained"> Start Measure</Button>            
            {<h1>Measure in progress : </h1> && <h2>{JSON.stringify(measureValue)}</h2>}
            {measureError && <h1>Problema con misurazione</h1>}
            {<h1>{message}</h1>}
            {<h1>Measure Name : {name}</h1>}
            <Line type={"line"} width={100} height={50} data={data} options={options}/>
        </div>
       
    )

}
export default Measure;
