<template>
  <div class="container mt-2 py-3">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="row">
          <div class="col-sm-6">
            <h5 class="edit-book__name">{{ bookInFocus.name }}</h5>
            <img
              class="img-book d-none d-sm-block"
              :src="bookInFocus.image"
              alt="image of book in edit interface"
            />
          </div>
          <div class="col-sm-6">
            <VeeForm
              class="edit-book__ui h-100 d-flex flex-column"
              @submit="submit"
            >
              <div class="row">
                <div class="col-auto col-sm-12">
                  <label for="price" class="col-form-label">價格</label>
                </div>
                <div class="input-group col">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="regBook.price++"
                  >
                    +
                  </button>
                  <VeeField
                    name="price"
                    v-model="regBook.price"
                    :rules="isWhole"
                    v-slot="{ meta, field }"
                  >
                    <input
                      type="number"
                      v-bind="field"
                      id="price"
                      class="form-control"
                      :class="{ 'is-invalid': !(meta.valid && meta.dirty) }"
                    />
                  </VeeField>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="regBook.price--"
                  >
                    -
                  </button>
                </div>
                <VeeError name="price" v-slot="{ message }">
                  <div class="invalid-feedback" :class="{ 'd-block': message }">
                    {{ message }}
                  </div>
                </VeeError>
              </div>
              <div class="row mt-2">
                <div class="col-auto col-sm-12">
                  <label for="quantity" class="col-form-label">數量</label>
                </div>
                <div class="input-group col">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="regBook.count++"
                  >
                    +
                  </button>
                  <VeeField
                    type="number"
                    name="count"
                    v-model="regBook.count"
                    :rules="isWhole"
                    v-slot="{ meta, field }"
                    id="count"
                    class="form-control"
                  >
                    <input
                      v-bind="field"
                      type="number"
                      id="count"
                      class="form-control"
                      :class="{ 'is-invalid': !(meta.valid && meta.dirty) }"
                    />
                  </VeeField>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="regBook.count--"
                  >
                    -
                  </button>
                </div>
                <VeeError name="count" v-slot="{ message }">
                  <div class="invalid-feedback" :class="{ 'd-block': message }">
                    {{ message }}
                  </div>
                </VeeError>
              </div>
              <button type="submit" class="btn btn-danger mt-3 mt-sm-auto">
                確認修改
              </button>
            </VeeForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  regBook,
  bookInFocus,
  getBookProfile,
  setBookProperties
} from '/@/composition/store'
import { useRoute } from 'vue-router'
import {
  Field as VeeField,
  ErrorMessage as VeeError,
  Form as VeeForm
} from 'vee-validate'
import { onMounted } from 'vue'

export default {
  setup() {
    const submit = () => {
      setBookProperties()
      getBookProfile(regBook.id)
    }

    const isWhole = (val) => {
      if (val === '') return '此欄位不可空白'
      else if (Number.isNaN(val)) return '此欄位必須是數字'
      else {
        const num = Number(val)
        return Number.isInteger(num) && num >= 0
          ? true
          : '此欄位必須是大於或等於零的整數'
      }
    }

    onMounted(() => {
      // Driven by parameter "bookId" in the route
      regBook.id = useRoute().params.bookId
      getBookProfile(useRoute().params.bookId)
    })

    return {
      regBook,
      isWhole,
      submit,
      bookInFocus
    }
  },
  components: {
    VeeField,
    VeeError,
    VeeForm
  }
}
</script>