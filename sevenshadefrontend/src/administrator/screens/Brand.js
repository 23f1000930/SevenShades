import * as React from 'react';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData, getData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import listimage from "../../images/list.png";
import iconimage from "../../images/icon.png";
import Checkbox from '@mui/joy/Checkbox';

export default function Brand(props) {
    var classes = useStyles();
    const [brandName, setBrandName] = useState('');
    const [icon, setIcon] = useState({ file: iconimage, bytes: '' });
    const [formError, setFormError] = useState({ icon: false, brandname: false });
    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [mainCategoryCheckedIds, setMainCategoryCheckedIds] = useState([]);

    const fetchAllMainCategory = async () => {
        var result = await getData('maincategory_list');
        console.log("Main Categories:", result.data);
        setMainCategoryList(result.data);
    };

    useEffect(() => {
        fetchAllMainCategory();
    }, []);

    const handleCheckboxChange = (event) => {
        const index = mainCategoryCheckedIds.indexOf(event.target.value);
        if (index === -1) {
            setMainCategoryCheckedIds([...mainCategoryCheckedIds, event.target.value]);
        } else {
            setMainCategoryCheckedIds(mainCategoryCheckedIds.filter((id) => id !== event.target.value));
        }
    };

    const handleCheckbox = () => {
        return mainCategoryList.map((item) => (
            <Grid item xs={3} key={item.id}>
                <Checkbox
                    checked={mainCategoryCheckedIds.includes(item.id.toString())}
                    onChange={handleCheckboxChange}
                    value={item.id.toString()}
                    label={item.maincategoryname}
                />
            </Grid>
        ));
    };

    const handleChange = (event) => {
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
        handleError(false, "icon");
    };

    const handleError = (errormessage, label) => {
        setFormError((prev) => ({ ...prev, [label]: errormessage }));
    };

    const handleClick = async () => {
        var err = false;
        if (mainCategoryCheckedIds.length === 0) {
            err = true;
        }
        if (brandName.length === 0) {
            handleError("Please input brand name", "brandname");
            err = true;
        }
        if (!icon.bytes) {
            handleError("Please select an icon", "icon");
            err = true;
        }

        if (!err) {
            var formData = new FormData();
            mainCategoryCheckedIds.forEach(id => formData.append('maincategories', id));
            formData.append('brandname', brandName);
            formData.append('icon', icon.bytes);

            console.log("FormData entries:");
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            var result = await postData('brand_submit', formData);
            console.log(result);

            if (result.status) {
                Swal.fire({
                    title: "The Seven Shades",
                    text: result.message,
                    icon: "success",
                    toast: true
                });
            } else {
                Swal.fire({
                    title: "The Seven Shades",
                    text: result.message,
                    icon: "error",
                    toast: true
                });
            }
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.main_brand_banner_box}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TitleComponent width={100} title={'Brand'} listicon={listimage} link={'/admindashboard/displaybrand'} />
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Choose Main Category</div>
                    </Grid>
                    {handleCheckbox()}

                    <Grid item xs={12}>
                        <TextField
                            error={!!formError.brandname}
                            helperText={formError.brandname}
                            onFocus={() => handleError(false, 'brandname')}
                            onChange={(event) => setBrandName(event.target.value)}
                            fullWidth
                            label="Brand Name"
                        />
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Button variant="contained" component='label'>
                            Upload Icon
                            <input type="file" hidden accept="image/*" onChange={handleChange} />
                        </Button>
                        {formError.icon && <div style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', marginTop: 3, color: '#d32f2f', fontSize: '0.75rem', fontWeight: 400 }}>{formError.icon}</div>}
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            alt="Icon"
                            variant="rounded"
                            src={icon.file}
                            sx={{ width: 80, height: 80 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
