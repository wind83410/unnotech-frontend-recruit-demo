<template>
  <div class="container">
    <div class="row g-3 book-list">
      <div
        class="col-sm-6 col-md-4 col-lg-3"
        v-for="book in books"
        :key="`book-id-${book.id}`"
      >
        <BookCard
          :book-id="book.id"
          :image-url="book.image"
          :name="book.name"
          @click="focus(book)"
        />
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script>
import { books, getBookProfile } from '/@/composition/store'
import BookCard from './BookCard.vue'

export default {
  setup() {

    const focus = book => {
      getBookProfile(book.id)
    }

    return {
      books,
      BookCard,
      focus
    }
  }
}
</script>

