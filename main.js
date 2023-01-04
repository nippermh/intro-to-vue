//this is the app we are importing into our dom
const app = Vue.createApp({
    data() {
      return {
       
        cart: [], //make it an array
        premium: true //taken in by productDisplay.js
      }
    },
    methods: {
      updateCart(id) { //we accept the id
        this.cart.push(id) //and add it on click to the cart
      },
      removeById(id) {
        const index = this.cart.indexOf(id)
            if (index > -1) {
                this.cart.splice(index, 1)
            }
    }}  
  })
