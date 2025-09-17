import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { useEffect, useState } from "react";
import { getData, postData, serverURL } from "../../services/FetchDjangoApiService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, TextField, Avatar } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/joy/Checkbox';


export default function DisplayBrand() {
  var classes = useStyles()
  const [open, setOpen] = useState(false)
  const [brandList, setBrandList] = useState([])
  var navigate = useNavigate()

  
  const fetchAllBrand = async () => {
    var result = await getData('brand_list')
    setBrandList(result.data)

  }
  
  const fetchAllMainCategory = async () => {
    var result = await getData('maincategory_list');
    setMainCategoryList(result.data);
};

useEffect(function () {
  fetchAllBrand()
  fetchAllMainCategory()

}, [])

  const dispalyAllMaincategories = (linkedmaincategories) => {
    return linkedmaincategories.map((item) => {
      return <div value={item.id} ><b>/{item.maincategoryname}/</b></div>
    })
  }

  //LIST CATEGORY****************************************************************************************************************************
  function listAllBrand() {
    return (
      <MaterialTable
        title={<TitleComponent width={145} title={'Brand List'} listicon='' />}
        columns={[
          { title: 'Id', field: 'id' }, //title depend on field which is also a column name in MySQL database
          { title: 'Brands', field: 'brandname' },
          { title: 'Main Category Name', render: (rowData) => <div>{dispalyAllMaincategories(rowData.maincategories)}</div> },
          { title: 'Icon', render: (row) => <><img src={` ${serverURL}${row.icon}`} style={{ width: 60, height: 60, borderRadius: 15 }} /></> }
        ]}
        data={brandList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Brand',
            onClick: (event, rowData) => handleOpenDialog(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Remove  Brand',
            onClick: (event, rowData) => handleDeleteData(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add New Brand',
            isFreeAction: true,
            onClick: (event, rowData) => navigate('/admindashboard/brand')
          }
        ]}
      />
    )
  }
  //******************************************************************************************************************************************      
  //LIST CATEGORY ACTIONS*********************************************************************************************************************
  const handleOpenDialog = (rowData) => {
    //specify database fields
    showCheckedIds(rowData.maincategories)
    setId(rowData.id)
    setBrandName(rowData.brandname)
    setIcon({ file: `${serverURL}${rowData.icon}`, bytes: '' })
    setTempIcon(`${serverURL}${rowData.icon}`)
    setOpen(true)
  }

  const handleDeleteData = async (rowData) => {
    Swal.fire({
      title: "Do you want to Delete this brand?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body = { id: rowData.id }
        var result = await postData('deletebranddata', body)
        if (result.status) {
          Swal.fire("Deleted!", "", "success");
        }
        fetchAllBrand()

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  //******************************************************************************************************************************************
  //SHOW CATEGORY DIALOG ACTIONS**************************************************************************************************************

  const [id, setId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [icon, setIcon] = useState({ file: 'icon.png', bytes: '' }) //bytes is used to save Image
  const [tempIcon, setTempIcon] = useState('')
  const [formError, setFormError] = useState([{ icon: false }])
  const [btnStatus, setBtnStatus] = useState(true)
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [mainCategoryCheckedIds, setMainCategoryCheckedIds] = useState([]);

  const handleCheckboxChange = (event) => {
    const index = mainCategoryCheckedIds.indexOf(event.target.value);
    if (index === -1) {
        setMainCategoryCheckedIds([...mainCategoryCheckedIds, event.target.value]);
    } else {
        setMainCategoryCheckedIds(mainCategoryCheckedIds.filter((id) => id !== event.target.value));
    }
};

  const showCheckedIds=(checkedMaincategories)=>{
    /*var a=[]
    checkedMaincategories.forEach(item => a.push(item.id.toString()));
    console.log("dfdfd",a)
    setMainCategoryCheckedIds((prevIds) => [...prevIds, ...a])*/
    setMainCategoryCheckedIds((prevIds) => [
      ...prevIds,
      ...checkedMaincategories.map(item => item.id.toString())
    ]);
    
  }

  const handleCheckbox = () => {
    console.log("vghfghfhg",mainCategoryCheckedIds)
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
    setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(false)
  }

  const handleError = (errormessage, label) => {  //prev means previous value of error
    setFormError((prev) => ({ ...prev, [label]: errormessage }))
  }

  const handleCancel = () => {
    setBtnStatus(true)
    setIcon({ file: tempIcon, bytes: '' })
  }
  const handleEditIcon = async () => {
    var formData = new FormData()
    formData.append('id', id)
    formData.append('icon', icon.bytes)
    var result = await postData('editbrand_icon', formData)
    if (result.status) {
      Swal.fire({
        title: "The Seven Shades",
        text: result.message,
        icon: "success",
        toast: true
      });
    }
    else {
      Swal.fire({
        title: "The Seven Shades",
        text: result.message,
        icon: "error",
        toast: true
      });
    }
    fetchAllBrand()
    setBtnStatus(true)
  }

  const handleEditData = async () => {

    var err = false

    if (brandName.length == 0) {
      handleError("Please input brand name", "brandname")
      err = true
    }

    if (err == false) {
      console.log("bhnhgvhjvj",mainCategoryCheckedIds)
      var body = { id: id, brandname: brandName, maincategories: mainCategoryCheckedIds }
      var result = await postData('editbrand_data', body)
      if (result.status) {
        Swal.fire({
          title: "The Seven Shades",
          text: result.message,
          icon: "success",
          toast: true
        });
      }
      else {
        Swal.fire({
          title: "The Seven Shades",
          text: result.message,
          icon: "error",
          toast: true
        });
      }
    }
    fetchAllBrand()
  }

  const handleClose = () => {
    setMainCategoryCheckedIds([])
    setOpen(false)
  }
  const showCategoryDialog = () => {

    return (<Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        <TitleComponent width={185} title={'Update  Brand'} listicon='' />
      </DialogTitle>
      <DialogContent>
        <div style={{ margin: 5 }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <div style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Choose Main Category</div>
            </Grid>

            {handleCheckbox()}

            <Grid item xs={12}>
              <TextField value={brandName} error={formError.brandname} helperText={formError.brandname} onFocus={() => handleError(false, 'brandname')} onChange={(event) => setBrandName(event.target.value)} fullWidth label="Brand Name" />
            </Grid>

            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              {btnStatus ?
                <div>
                  <Button variant="contained" component='label'>
                    Upload Icon
                    <input type="file" hidden accept="images/*" onChange={handleChange} />
                  </Button>
                </div> : <div><Button onClick={handleEditIcon}>Save</Button><Button onClick={handleCancel}>Cancel</Button></div>}
            </Grid>

            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar               //Avatar is used for showing selected image
                alt="Icon"
                variant="rounded"
                src={icon.file}
                sx={{ width: 80, height: 80 }}  //sx=>means 'style'
              />
            </Grid>


          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>)
  }
  return (<div className={classes.display_root}>
    <div className={classes.display_box}>
      {listAllBrand()}
    </div>
    {showCategoryDialog()}
  </div>)
}