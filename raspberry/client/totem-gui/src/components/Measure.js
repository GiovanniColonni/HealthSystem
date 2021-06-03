import {useState,useEffect} from "react"
import Button from "@material-ui/core/Button"
import {Line} from "react-chartjs-2"
import Api from "../api/Api"


function Measure ({setMeasure,measure}) {
    
    let [mProgres,setMProgres] = useState(false)
    let [period,setPeriod] = useState(5000) // T = 5 secondi intervallo tra due misure
    let [measureError,setMeasureError] = useState(false)
    let [interval,setInt] = useState(0) // intervalId, viene 
    let [measureValue,setMeasureValue] = useState([])
    let [yGraph,setYGraph] = useState()
    let [xGraph,setXGraph] = useState()

    let /**tmp */ [message,setMessage] = useState("first")

    let intervalCallback = () => {


        Api.onStartMeasure()

    }

    const options = {scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },}

    const data = {labels: xGraph, // la x
    datasets: [
      {
        label: 'Mettere nome misura',
        data: yGraph, // la y
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
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
                                    console.log(m)
                                    setMessage("process measure")
                                    let measure_json = JSON.parse(m.measureValue)
                                    console.log(measure_json)
                                    setMeasureValue(measure_json)
                                    if(measure_json.hasOwnProperty("Operc")){
                                        setYGraph([...yGraph,measure_json["Operc"]])
                                    }
                                    if(measure_json.hasOwnProperty("Hrate") && !measure_json.hasOwnProperty("Max") ){
                                        setYGraph([...yGraph,measure_json["HRate"]])
                                    }else{
                                        // ci sarebbe anche la pressione massima e minima
                                        console.log("QUI MEASURE")
                                        setYGraph([...yGraph,measure_json["HRate"]])
                                    }
                                    // setto anche la y per avanzare
                                    setXGraph([...xGraph,xGraph.lenght])
                                    console.log(measure_json);
                                    setMeasureError(false)
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
            //console.log("end measure")
        }
        if(mProgres){
           if(measure.thReached === 1){
               Api.postMeasure(JSON.stringify(measure.measureValue),measure.dateMeasure)
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
        <div>
            <Button onClick={()=>onStartMeasure()} variant="contained"> Start Measure</Button>            
            {<h1>Measure in progress : </h1> && <h2>{measure.measureValue}</h2>}
            {measureError && <h1>Problema con misurazione</h1>}
            {<h1>{message}</h1>}
            <Line width={100} height={50} data={data} options={options}/>
        </div>
       
    )

}
export default Measure;
