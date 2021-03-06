<template>
  <div>
    <RouterLink :to="`/${bookId}`" custom v-slot="{ navigate, isActive }">
      <div class="book-card" :class="{'book-card-active': isActive}" @click="navigate">
        <img
          :src="imageUrl"
          class="img-book"
          :alt="`Image of book ${bookId}`"
        />
        <h5 class="book-card__body--title p-3 mb-0">{{ name }}</h5>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    bookId: Number,
    imageUrl: String,
    name: String
  }
}
</script>
