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

export default function DisplayAllCategory() {
  var classes = useStyles()
  const [open, setOpen] = useState(false)
  const [mainCategoryList, setMainCategoryList] = useState([])
  var navigate=useNavigate()

  /************************************CATEGORY ACTIONS************************************************************************************* */
  const [id, setId] = useState('')
  const [mainCategoryName, setMainCategoryName] = useState('')
  const [icon, setIcon] = useState({file:'icon.png',bytes:''}) //bytes is used to save Image
  const [tempIcon, setTempIcon] = useState('')
  const [formError, setFormError] = useState([{icon:false}])
  const [btnStatus, setBtnStatus] = useState(true)

  const handleChange = (event) => {
    setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(false)
  }

  const handleError = (errormessage, label) => {  //prev means previous value of error
    setFormError((prev) => ({ ...prev, [label]: errormessage }))
  }
  /************************************************************************************************************************** */




  useEffect(function () {
    fetchAllMainCategory()

  }, [])
  const fetchAllMainCategory = async () => {
    var result = await getData('maincategory_list')
    setMainCategoryList(result.data)

  }

  const handleOpenDialog = (rowData) => {
    //specify database fields
    setId(rowData.id)
    setMainCategoryName(rowData.maincategoryname)
    setIcon({ file: `${serverURL}${rowData.icon}`, bytes: '' })
    setTempIcon(`${serverURL}${rowData.icon}`)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  function listAllCategory() {
    return (
      <MaterialTable
        title={<TitleComponent width={225} title={'Main Category List'} listicon='' />}
        columns={[
          { title: 'Id', field: 'id' }, //title depend on field which is also a column name in MySQL database
          { title: 'Main Category', field: 'maincategoryname' },
          { title: 'Icon', render: (row) => <><img src={` ${serverURL}${row.icon}`} style={{ width: 60, height: 60, borderRadius: 15 }} /></> }
        ]} //'row'(object) contains one row data from from mainCategoryList in the form of JSON/dict
        data={mainCategoryList} //'mainCategotyList' is a list of dicts 
  
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleOpenDialog(rowData)
            //'rowData' contains data of that row which you have clicked in JSOB/dict form
          },
          {
            icon: 'delete_outline',
            tooltip: 'Remove  Category',
            onClick: (event, rowData) => handleDeleteData(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add New Category',
            isFreeAction:true,
            onClick: (event, rowData) => navigate('/admindashboard/category')
          }
        ]}
      />
    )
  }

  const handleCancel = () => {
    setBtnStatus(true)
    setIcon({ file: tempIcon, bytes: '' })
  }
  const handleEditIcon = async () => {
    var formData = new FormData()
    formData.append('id', id)
    formData.append('icon', icon.bytes)
    var result = await postData('editmaincategory_icon', formData)
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
    fetchAllMainCategory()
    setBtnStatus(true)
  }

  const handleEditData = async () => {
    var err = false
    if (mainCategoryName.length == 0) {
      handleError("Please input main category", "maincategoryname")
      err = true
    }
    if (err == false) {
      var body = { id: id, maincategoryname: mainCategoryName }
      var result = await postData('editmaincategory_data', body)
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
    fetchAllMainCategory()
  }

  const handleDeleteData = async (rowData) => {
    Swal.fire({
      title: "Do you want to Delete This Main Category?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body = { id: rowData.id }
        var result = await postData('deletemaincategorydata', body)
        if (result.status) {
          //Swal.fire("Deleted!", "", "success");
          Swal.fire(result.message, "", "success");
        }
        fetchAllMainCategory()

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  const showCategoryDialog = () => {

    return (<Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        <TitleComponent width={265} title={'Update Main Category'} listicon='' />
      </DialogTitle>
      <DialogContent>
        <div style={{ margin: 5 }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField value={mainCategoryName} error={formError.maincategoryname} helperText={formError.maincategoryname} onFocus={() => handleError(false, 'maincategoryname')} onChange={(event) => setMainCategoryName(event.target.value)} fullWidth label="Main Category Name" />
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
      {listAllCategory()}
    </div>
    {showCategoryDialog()}
  </div>)
}