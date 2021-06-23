import Image from 'react-bootstrap/Image'
import CrossIcon from '../icons/greenCross.png';
var logostyle = {
    logo: {
        padding: "2px"
    }, image: {
        height: "50px",
        width: "50px",
        margin: "auto",
        display: "flex"
    }, name: {
        fontFamily: "Bree Serif",
        color: "#8BC24A",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "14px",
        marginBottom: "0"
    }
}

export default function Logo() {
    return (
        <>
            <div style={logostyle.logo}>
                <Image src={CrossIcon} style={logostyle.image}/>
                <p style={logostyle.name}>My Health Way</p>
            </div>
        </>
    );
}