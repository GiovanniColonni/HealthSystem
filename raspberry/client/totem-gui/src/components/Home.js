import {useHistory} from "react-router"
import {Button} from "@material-ui/core/"

function Home(){
    
    const history = useHistory();

    return(
        <div>
            <h1>Home</h1>
            <Button variant="primary" onClick={()=>history.push("/measure")}>Start a measure</Button>
            <Button variant="contained" onClick={()=>history.push("/videocall")}>Start the appointment</Button>
	    </div>
    )
}
export default Home