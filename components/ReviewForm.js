app.component("review-form", {
  template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit"><!--prevent default behaviour of form-->
      <h3>Leave a review</h3>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
  
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
  
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating"><!--modifier that typcasts the value as a number-->
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <label for="recommend">Would you recommend this product?</label>
      <select id="recommend" v-model="recommend">
        <option>Yes</option>
        <option>No</option>
      </select>
  
      <input class="button" type="submit" value="Submit">
    </form>`,
    /*
    bind these input fields to their respective data 
    properties so that when the user fills out the form, 
    we store their data locally
   */
  data() {
    return {
      name: '',
      review: '',
      rating: null,
      // solution
      recommend: null
      // solution
    }
  },
     methods: {
       onSubmit() {
        //very basic validation only
        if (this.name === '' || this.review === '' || this.rating === null || this.recommend === null) {
          alert('Review is incomplete. Please fill out every field.')
          return
        }  

         let productReview = { 
           name: this.name,
           review: this.review,
           rating: this.rating,
           recommend: this.recommend
         }
         this.$emit('review-submitted', productReview) //emit the review submitted
         //clear data fields
         this.name = ''
         this.review = ''
         this.rating = null
         this.recommend = null 
       }
    }
});
