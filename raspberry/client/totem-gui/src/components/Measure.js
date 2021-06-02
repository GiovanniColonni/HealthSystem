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

    let intervalCallback = () => {


        Api.onStartMeasure()

    }

    let processMeasure = (m) => {

        let measure_json = JSON.parse(m)
        setMeasureValue(measure_json)
    }
    let onStartMeasure = () => {
       if(!mProgres){ 
        Api.startMeasure()
            .then((r)=>{
                if(r){
                    setMProgres(true)
                    const timer = setInterval(
                        ()=>{
                            // console.log("log")
                            Api.getMeasure().then((m)=>{
                                
                                if(m === false){
                                    setMProgres(false)
                                    setMeasure("no active measure")
                                }else{
                                    
                                setMeasureValue(JSON.parse(m.measureValue))
                                setMeasureError(false)
                                }
                            })
                            .catch(()=>{
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
        </div>
       
    )

}
export default Measure;
