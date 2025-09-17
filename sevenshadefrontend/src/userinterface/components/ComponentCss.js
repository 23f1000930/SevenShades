import { makeStyles } from "@mui/styles";

export const useComponentStyles = makeStyles(() => ({
    customButton: {
        fontWeight: 'bold',
        borderTop: '1px solid #ccc',
        borderBottomColor: '1px solid #ccc',
        borderLeftColor: 'white',
        borderRight: 'white',
        backgroundColor: 'white',
        marginLeft: '-40px',
        width: '200px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '3px',
        padding: '5px 15px',
        textAlign: 'left',
        width: '300px',
        maxWidth: '350px',
    },
    
    '@media (hover: hover)': {
        '.customButton:hover': {
            backgroundColor: '#f0f0f0',
        },
    },
    
    '@media (hover: none)': {
        '.customButton:focus': {
            outline: 'none',
        },
    },
    /* UserCartComponent.css */
cart_container :{
    display: 'grid',
    grid_template_columns: 'repeat(2, 1fr)', /* Two columns */
    gap: 20 /* Gap between items */
  },
  
  cart_item: {
    /* Style individual cart items */
    /* Example styles: */
    border: '1px solid #ddd',
    padding: 10,
  },

  save_button: {
    backgroundColor:'white',
    borderBlockColor:' #ececec'
  }
  
}));
