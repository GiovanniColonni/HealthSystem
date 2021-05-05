import {useState} from "react"
import Button from "@material-ui/core/Button"

import Api from "../api/Api"

// serve un timer

function Measure ({setMeasure}) {
    
    let [mProgres,setMProgres] = useState(false)

    let onStartMeasure = () => {
        setMProgres(true)
    }

    let onStopMeasure = () => {
        setMProgres(false)
    }
    
    return(
        <div>
            <Button onClick={()=>onStartMeasure()} variant="contained">Start Measure</Button>            
            <Button onClick={()=>onStopMeasure()} variant="contained">Stop Measure</Button>
            {mProgres && <h1>Measure in progress</h1>}
        </div>
       
    )

}
export default Measure;