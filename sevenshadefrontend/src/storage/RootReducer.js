var initialState = {
    product: {}      //blank JSON object
}

/*"action" is an JSON object which contains two keys 1st one is "type" which represents our
"reducer" (or action name) & 2nd is "payload" which contains data */

export default function RootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PRODUCT":
            state.product[action.payload[0]] = action.payload[1]
            return { product: state.product } //or {value:state.product}

        case "DELETE_PRODUCT":
            delete state.product[action.payload[0]]
            return { product: state.product }

        default:
            return { product: state.product }
    }
}