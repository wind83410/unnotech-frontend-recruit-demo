import { ref, reactive, toRaw, computed } from 'vue'

export const books = reactive([]) // 所有書的圖片和標題
export const regBook = reactive({ // 儲存焦點書籍細節
  id: '',
  price: 0,
  count: 0
})
// 焦點書籍圖片
export const bookInFocus = computed(() => {
  const theBook = books.find(book => book.id === regBook.id)
  return theBook ? theBook : {}
})

// 狀態四種值：init, error, working, done
// 提供 UI 檔板，防止使用者在非同步請求回覆前更動表格
export const workState = ref('init')

// 取得書籍標題和圖片
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
  workState.value = 'working'
  fetch(`https://fe-interview-api.unnotech.com/profile/${id}`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'GET'
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      workState.value = 'error'
      return {}
    }
  }).then(data => {
    for (let prop in regBook) {
      regBook[prop] = data[prop]
    }
    workState.value = 'done'
  })
}

// 更改書的基本資料
export const setBookProperties = () => {
  workState.value = 'working'
  const { price, count } = toRaw(regBook)
  fetch(`https://fe-interview-api.unnotech.com/profile/${regBook.id}`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ price, count })
  }).then(response => {
    if (response.ok) {
      workState.value = 'done'
      alert('修改成功')
    } else {
      workState.value = 'error'
      alert('修改失敗')
    }
  }).catch(Error('Failed to modify'))
}
