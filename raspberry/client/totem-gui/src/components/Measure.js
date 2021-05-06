import {useState,useEffect} from "react"
import Button from "@material-ui/core/Button"

import Api from "../api/Api"
// TODO : fare due bottoni per misura continua o singola 
// l'oggetto measure che viene ritornato ha 6 campi:
// 1) mtype, se continua o no (se continua attivare timer altrimenti no)
// 2) thReached se = 1 allora è stata superata una soglia e bisogna inviare una notifica
// 3) inProgress se = 1 la misura non è finita, se 0 allora finita
// 4) dateMeasure = data avvio misura
// 5) measureValue = dipende dalla misura ma è una stringa che va parsata come Json e ci sono i dati della misura stessa

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
                    console.log("log")
                    Api.getMeasure().then((m)=>{
                        setMeasure(m)
                        // qui fare parsing di m.measureValue prima di settare
                        // controllare qui se va sopra la soglia oppure no e casomai fare
                        // la post al main server
                        // guardare anche se la misura è terminata oppure no
                        // e casomia settare measureState == "stop"
                    })
                    .catch(()=>{
                        setMeasureError(true)
                    })
                },period
            )
            if(measureState == "stop"){
                clearInterval(timer)
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
            {mProgres && <h1>Measure in progress : </h1> && measure.measureValue}
            {measureError && <h1>Problema con misurazione</h1>}
        </div>
       
    )

}
export default Measure;