Tutorial: https://www.vuemastery.com/courses/intro-to-vue-3/creating-the-vue-app-vue3
Do next: https://www.vuemastery.com/courses/real-world-vue3/rwv3-orientation

Ecommerce product page built with Vue.js

MY NOTES

********************************
Attribute Binding
********************************

v-bind is used for a one way binding of data to the template. For instances the value socks image url is pulled in from main.js into index.html using v-bind:src="image"
can also use {{ product }} to pull in the value of product. the shorthand for v-bind is :src="image" for example.

Example usage of v-bind:

<img :src="image">
<img :alt="description">
<a :href="url">
<div :class="isActive">
<div :style="isActive">
<span :disabled="isDisabled">

v-model can be used to record and store values in our data, creating 2 way data binding (see form example)

********************************
Conditional Rendering
********************************
Make one item appear (in stock or out of stock) using conditional rendering.

First you have to add this to the data:
inStock: true // new data property. Boolean value// in main.js

<p v-if="inStock">In stock</p>
<p v-else>Out of stock</p>

v-show
a more performant option if you have something that’s toggling off and on the screen often. 
We can verify this by setting inStock to false and viewing the element in the browser’s Developer Tools. 
When v-show is used, we can see that the element is still present in the DOM, 
but it’s now hidden with an inline style of display: none; added to it.


Chained conditional logic
As an example we add  inventory: 100 to main.js

<p v-if="inventory > 10">In Stock</p>
<p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
<p v-else>Out of Stock</p>

We could use this logic to show if something is on sale.

********************************
LIST RENDERING - LOOPING THROUGH DATA ARRAYS
********************************

Create an array of details in main.js:
 details: ['50% cotton', '30% wool', '20% polyester'] 

 then we create a for loop using v-for:
 
 <ul>
  <li v-for="detail in details">{{ detail }}</li> <!--prints out details in the detail array -->
</ul>

VARIANT ARRAYS

  variants: [
      { id: 2234, color: 'green' },
      { id: 2235, color: 'blue' }
    ]

We can add a unique key to each item and this improves performance
 <div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div>   

********************************
EVENT HANDLING - Add an item to the cart
********************************

We listen for a click event using the v-on:click which triggers a method

<button class="button" v-on:click="addToCart">Add to Cart</button>

We then set a counter for items added to the cart using the following in main.js:

const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      ...
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    }
  }
})
Every time we click the button, the cart is updated by 1 item. v-on is essentially like an ear to listen out for actions and implement changes.

SHORT HAND FOR V_ON

We can also add the following shortcut for v-on: <button class="button" @click="addToCart">Add to Cart</button>

A mouseover example

    variants: [
      { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' },
      { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg' },
    ]

<div v-for="variant in variants" :key="variant.id" @mouseover="updateImage(variant.image)">{{ variant.color }}</div>

The method would look like this:

 updateImage(variantImage) {
    this.image = variantImage
  }
It expects the variantImage as the parameter, and when it’s run, it sets this.image (in this Vue instance’s data) equal to the variant image that was passed in.

Now in the browser, when we hover our mouse over “green”, we should see the green image. When we hover over “blue”, we should see the blue image.

********************************
CLASS AND STYLE BINDING
********************************
The class="color-circle" styles the color circle like so:

  <div
    v-for="(variant, index) in variants"
    :key="variant.id"
    @mouseover="updateVariant(index)"
    class="color-circle"
    :style="{backgroundColor: variant.color }" //here we add the background color
></div>

We are using an object in javascript so we use either camel or kebab case but we have to use quotes to do that. 

Stopping users from accessing the cart when out of stock:

<button
  class="button"
  v-on:click="addToCart"
  :class="{ disabledButton: !inStock }" //add disabled button class when product not in stock
  :disabled="!inStock"  //here we disable the button if no stock
>
We also have:
  inStock: true,

  Multiple classes can be handled in this way:
  <div class="color-circle" :class="{active: activeClass}">

  and then we have:

  data() {
    return {
      activeClass: true
    }
  } 

  this will return:
  <div class="color-circle active"></div>

  We can also use ternary operators like so:

  <div :class="[isActive ? activeClass: '']"></div>

  data() {
    return {
      isActive: true
    }
  }