/*
The first argument is the component name, 
'product-display' in this case, and the 
second argument is an object to configure 
our component (similar to the options object 
used to configure our root Vue app).
*/
app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
    template:
    /*html*/
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Vue Mastery</title>
        <!-- Import Styles -->
        <link rel="stylesheet" href="./assets/styles.css" />
        <!-- Import Vue.js -->
        <script src="https://unpkg.com/vue@3.0.0-beta.12/dist/vue.global.js"></script>
      </head>
      <body>
        <div id="app">
          <div class="nav-bar"></div>
                 <div class="product-display">
            <div class="product-container">
              <div class="product-image">
                <a :href="href"> <img v-bind:src="image"></a>
              </div>
    
              <div class="product-info">
                <h1>{{ title }}</h1>
    
                <!--<p v-if="inventory > 10">In stock as there are more than 10</p>-->
    
                <p v-if="inStock">In Stock</p>
    
                <!--p v-else-if="inventory <= 10 && inventory > 0">Almost Sold out!</!--p-->
    
                <p v-else>Out of Stock</p>
                
                <p>Shipping: {{ shipping }}</p>
    
                <p v-if="onSale">{{ onSaleMessage }} on sale now!</p>
    
                <ul>
                  <li v-for="detail in details">{{ detail }}</li>
                </ul>
    
                <div
                  v-for="(variant, index) in variants"
                  :key="variant.id"
                  @mouseover="updateVariant(index)"
                  class="color-circle"
                  :style="{backgroundColor: variant.color }"
                ></div>
    
                <div v-for="(size, index) in sizes" :key="index">{{ size }}</div>
    
                <button
                  class="button"
                  v-on:click="addToCart"
                  :class="{ disabledButton: !inStock }"
                  :disabled="!inStock"
                >
                  Add to Cart
                </button>
                <button class="button" @click="removeFromCart">Remove item</button>
              </div>
            </div>
          </div>
        </div>
    
        <!-- Import Js -->
        <script src="./main.js"></script>
        <!-- Mount App -->
        <script>
          const mountedApp = app.mount("#app");
        </script>
      </body>
    </html>
    `,
    data() { 
      return {
       //what is the value of product? socks
      //cart: 0,
      product: 'socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      inventory: 8,
      onSale: true,
      price: '$15.00',
      href: 'https://www.google.com',
      //inStock: true,
      alt: 'A beautiful pair of socks',
      details: ['50% cotton', '30% Wool', '20% polyester'],
      variants: [
          { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
          { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 30 }
      ],
       sizes: ['S', 'M', 'L', 'XL'],
      }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
  },
  // solution
  removeFromCart() {
    this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
  },

  updateVariant(index) {
    this.selectedVariant = index
  }
},
  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image() {
          return this.variants[this.selectedVariant].image
      },
      inStock() {
          return this.variants[this.selectedVariant].quantity
      },
      onSaleMessage() {
          return this.brand + ' ' + this.product
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
          return 2.99
        
    }
  }


})