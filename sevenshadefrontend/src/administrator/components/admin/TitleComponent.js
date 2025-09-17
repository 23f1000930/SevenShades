import mainlogo from "../../../images/logo.png"
import { useNavigate } from "react-router-dom"

export default function TitleComponent(props) {

    var navigate=useNavigate()
    
    return (<div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', width: props.width, alignItems: 'center', justifyContent: "space-between" }}>
            <img src={mainlogo} style={{ width: 40, height: 40 }} />
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{props.title}</div>
        </div>
        {props.listicon ?
            <img onClick={()=>navigate(props.link)} src={props.listicon} style={{ marginLeft: 'auto', width: 35, height: 35 }} /> : <></>}
    </div>)
}