import { ref, reactive, toRaw, computed } from 'vue'

export const books = reactive([]) // 書的圖片和標題
export const regBook = reactive({ // 編輯表格用
  id: '',
  price: 0,
  count: 0
})

export const bookInFocus = computed(() => {
  const theBook = books.find(book => book.id === regBook.id)
  return theBook ? theBook : {}
})

// 書名和圖片
export const getBooks = () => {
  fetch('https://fe-interview-api.unnotech.com/books')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return []
      }
    })
    .catch(Error('failed to get books'))
    .then((data) => {
      data.forEach((el) => books.push(el))
    })
}

// 取得書的基本資料
export const getBookProfile = id => {
  fetch(`https://fe-interview-api.unnotech.com/profile/${id}`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'GET'
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return {}
    }
  }).then(data => {
    for (let prop in regBook) {
      regBook[prop] = data[prop]
    }
  })
}

// 更改書的基本資料
export const setBookProperties = () => {
  const { price, count } = toRaw(regBook)
  fetch(`https://fe-interview-api.unnotech.com/profile/${regBook.id}`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ price, count })
  }).then(response => {
    if (response.ok) {
      console.log('succeeded to modify')
    }
  }).catch(Error('Failed to modify'))
}