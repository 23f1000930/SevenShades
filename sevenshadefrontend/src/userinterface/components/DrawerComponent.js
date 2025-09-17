import { Drawer } from "@mui/material";
import { useState, useEffect } from "react";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { serverURL, getData } from "../../services/FetchDjangoApiService"
export default function DrawerComponent(props) {
    const [categoryList, setCategoryList] = useState([])
    const fetchAllCategory = async () => {
        var result = await getData('user_maincategory_list')
        setCategoryList(result.data)
    }
    const toggleDrawer = (newOpen) => () => {
        props.setOpen(newOpen);
    };
    useEffect(function () {
        fetchAllCategory()
    }, [])
    const showContent = () => {
        return categoryList?.map((item) => {
            return (
                <ListItemButton>
                    <ListItemText primary={<div style={{ fontSize: 20, letterSpacing: 1, textAlign: 'start' }}>{item.maincategoryname}</div>} />
                    <ListItemIcon>
                        <div><img src={`${serverURL}${item.icon}`} style={{ width: 50, height: 60, borderRadius: 10 }} /></div>
                    </ListItemIcon>
                </ListItemButton>)
        })
    }
    return (<div>
        <Drawer open={props.open} onClose={toggleDrawer(false)}>
            <List style={{ width: 250, bgcolor: 'background.paper' }} component="nav">
                {showContent()}

                <ListItemButton>
                    <ListItemText primary={<div style={{ fontSize: 20, letterSpacing: 1, textAlign: 'start' }}>Orders</div>}></ListItemText>
                    <ListItemIcon>
                        <div><img src={`${serverURL}/static/orders.png`} style={{ width: 60, height: 60, borderRadius: 10 }} /></div>
                    </ListItemIcon>
                </ListItemButton>

                <ListItemButton>
                    <ListItemText primary={<div style={{ fontSize: 20, letterSpacing: 1, textAlign: 'start' }}>Profile</div>}></ListItemText>
                    <ListItemIcon>
                        <div><img src={`${serverURL}/static/profile.png`} style={{ width: 60, height: 60, borderRadius: 10 }} /></div>
                    </ListItemIcon>
                </ListItemButton>

            </List>
        </Drawer>
    </div>)
}