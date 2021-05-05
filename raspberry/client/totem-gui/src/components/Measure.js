import {useState,useEffect} from "react"
import Button from "@material-ui/core/Button"

import Api from "../api/Api"



function Measure ({setMeasure,measure}) {
    
    let [mProgres,setMProgres] = useState(false)
    let [startTime,setStartTime] = useState(0)
    let [period,setPeriod] = useState(5000) // T = 5 secondi
    let [started] = useState()
    let [measureError,setMeasureError] = useState(false)
    let [measureState,setMeasureState] = useState("None")

    let onStartMeasure = () => {
        
        Api.startMeasure("c")
            .then((r)=>{
                if(r){
                    setStartTime(Date.now())
                    setMProgres(true)
                    setMeasureState("start")
                }else{
                    setMeasureError(true)
                }
            })
            .catch()
    }

    useEffect(()=>{
        

        if(mProgres){
            const timer = setInterval(
                ()=>{
                    Api.getMeasure().then((m)=>{
                        setMeasure(m)
                        // controllare qui se va sopra la soglia oppure no e casomai fare
                        // la post al main server
                    })
                    .catch(()=>{
                        setMeasureError(true)
                    })
                },period
            )
            if(measureState == "stop"){
                clearInterval(timer)
            }else{
                return () => clearInterval(timer)
            }
            
        }
        
    
    })
    let onStopMeasure = () => {
        setMeasureState("stop")
    }
    return(
        <div>
            <Button onClick={()=>onStartMeasure()} variant="contained"> Start Measure</Button>            
            <Button onClick={()=>onStopMeasure()} variant="contained"> Stop Measure</Button>
            {mProgres && <h1>Measure in progress : {measure.mtype}</h1>}
            {measureError && <h1>Problema con misurazione</h1>}
        </div>
       
    )

}
export default Measure;