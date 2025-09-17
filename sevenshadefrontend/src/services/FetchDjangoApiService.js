import axios from "axios";
var serverURL='http://127.0.0.1:8000'

const postData=async(url,body)=>
{
    try
    {
        var response=await axios.post(`${serverURL}/api/${url}`,body) //this calls the django's post api
        var result=response.data  //response we get from django
        return result
    }
    catch(e)
    {
        return null
    }
}

const getData=async(url)=>
{
    try
    {
        var response=await axios.get(`${serverURL}/api/${url}`) //fetch all data of database
        var result=response.data
        return result
    }
    catch(e)
    {
        return null
    }
}

export {serverURL,postData,getData}