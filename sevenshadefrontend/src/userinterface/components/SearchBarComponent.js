import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export default function SearchBarComponent(props) {
    return (<div style={{
        background: "#fff",
        borderRadius:10,
        width:'40%',
        marginLeft:'7%',
        height:35,
        display:'flex',
        alignItems:'center',//for y-axis
        justifyContent:'center', //for x-axis
    }}>
        
       
        <input type='text' placeholder='Search Brands & Products Here....' style={{
            
            background: "#fff",
            borderRadius:10,
            width:'90%',
            border:'none',
            outline:'none',
            color: "#000",
            fontSize: "1rem",
            height:31,
        }} />
        <SearchOutlinedIcon style={{color:'black'}}/>
    </div>)
}