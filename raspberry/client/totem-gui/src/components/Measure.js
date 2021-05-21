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
    let [period,setPeriod] = useState(5000) // T = 5 secondi intervallo tra due misure
    let [measureError,setMeasureError] = useState(false)
    let [interval,setInt] = useState(0) // intervalId, viene 
    let [thReached,setThReached] = useState(0)

    let intervalCallback = () => {


        Api.onStartMeasure()

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
                                setMeasure(m)
                                setMeasureError(false)
                                // se thReached == 1 fare post a link notifiche
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
            console.log("end measure")
        }
        if(mProgres){
           if(measure.thReached === 1){
               // inviare notifica
           } 
        }
        
    })
    
    
    return(
        <div>
            <Button onClick={()=>onStartMeasure()} variant="contained"> Start Measure</Button>            
            {mProgres && <h1>Measure in progress : </h1> && <h2>{JSON.stringify(measure.measureValue)}</h2>}
            {measureError && <h1>Problema con misurazione</h1>}
        </div>
       
    )

}
export default Measure;