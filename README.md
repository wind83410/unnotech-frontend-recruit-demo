# unnotech-frontend-recruit-demo

## 本地端執行專案

務必注意本地端開發環境需有 Node.js 版本至少在 12 以上，瀏覽器需支援帶有 tag="module" 的 script 標籤以及 dynamic import()。[詳見 Vite 的開發環境和瀏覽器支援需求](https://vitejs.dev/guide/#browser-support)

1. 開啟終端機並在指定資料夾初始化 git

    `git init`

1. 在指定資料夾內，從 Github 上複製專案

    `git pull https://github.com/wind83410/unnotech-frontend-recruit-demo.git master`

2. 以 npm 安裝

    `npm intsall`

3. 啟動本地伺服器

    `npm run dev`

4. 點選終端機上顯示的 Vite 本地伺服器連結

## 專案結構和邏輯

專案資料夾結構：

* `components`包含頁面內會用到的元件 (component)。包括書籍展示卡片`BookCard.vue`。
* `pages`包含專案內會用到的頁面。包括書籍陳列`BookList.vue`和書籍細節`BookDetail.vue`。
* `composition`包含收集與特定功能相關變數與函數的集合 JS 檔。包括讀取和上傳書籍資料的`store.js`。
* `style`包含整個專案會用到的樣式。
    * `all.scss`：引入各分類樣式
    * `vendors`：第三方樣式檔統一放置處

邏輯：

* 為使元件盡可能統一處理畫面或內部處理狀態，將用非同步取得的資料、資料處理和操作函數統一寫進`store.js`並向外輸出給其他元件使用。
* 書籍展示卡片 (book card) 僅做顯示用；書籍陳列 (book list) 則根據書籍標題和圖片動態產生卡片，並設定在點擊卡片時發送請求載入書籍細節，並顯示在書籍細節 (book detail) 頁面。
* 修改後的書籍細節在傳送前，會在各欄位檢驗，檢驗通過之後才會上傳；上傳成功後會讀取更新後的書籍細節。

## 使用的套件

根據專案的要求和開發需求，本次使用以下套件：

* Vue 官方模擬路由 Vue Router：Vue Router 以兩個元件`<router-view />`和`<router-link>`，與路徑地圖 (routes) 模擬 Vue 應用程式的路由，配合專案需要切換頁面。

```javascript
const routes = [
  {
    path: '/', // 根目錄 (root) 路徑，會配合底下的 createWebHistory() 對應根目錄名稱
    component: () => import('/@/pages/BookList.vue'), // 路由到指定路徑時 <router-view /> 才載入元件
    children: [ // 巢狀路徑 (nested route)。在 BookList.vue 內需配合另一個 <router-view />
      {
        // 路徑可傳入變數，常用在共用版型上。
        // 這裡用相對路徑傳值並存入 bookId，讓任何一本書的細節都用同一個元件的版型
        path: ':bookId',
        component: () => import('/@/pages/BookDetail.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory('/books/'), // 改變預設根目錄，使其顯示類似此格式：your.server.site/books/
  routes
})
```

* 表單檢驗 VeeValidate：VeeValidate 有內建元件處理表單檢驗所需的事件監聽、錯誤訊息，亦可偵測 v-model 綁定的變數改變。內建元件`<Form>`、`<Field>`和`<ErrorMessage>`分別控制表單、內部欄位和錯誤訊息，能整合第三方表單檢驗程式庫（如 yup）。時間緊迫故用套件加速開發，僅寫內部的檢驗函數 `isWhole`。

```html
<!-- <Form> 元件，為避免混淆故登錄元件時變更標籤名稱 -->
<VeeForm @submit="submit">
  <!-- 因為 VeeValidate 能偵測 v-model 綁定對象改變並觸發檢驗，可直接變更綁定對象 -->
  <button type="button" class="btn btn-outline-primary" @click="regBook.price++">
    +
  </button>
  <!-- <Field> 元件，為避免混淆故登錄元件時變更標籤名稱 -->
  <!-- rules: 檢驗函數 -->
  <VeeField name="price" v-model="regBook.price" :rules="isWhole" v-slot="{ meta, field }">
    <!-- meta: 記錄欄位資訊的物件，如使用者是否更動 (dirty)、是否通過檢驗 (valid) -->
    <!-- field: 填入欄位的值 -->
    <!-- 客製化欄位 -->
    <input type="number" v-bind="field" id="price" class="form-control"
      :class="{ 'is-invalid': !(meta.valid && meta.dirty) }"
    />
  </VeeField>
  ...
  <!-- <ErrorMessage> 元件，為避免混淆故登錄元件時變更標籤名稱 -->
  <VeeError name="price" v-slot="{ message }">
    <!-- message: 從檢驗函數傳來的錯誤訊息 -->
    <!-- 客製化欄位 -->
    <div class="invalid-feedback" :class="{ 'd-block': message }">
      {{ message }}
    </div>
  </VeeError>
</VeeForm>
```

* CSS 框架 Bootstrap：慣用，知道常用元件的類別 (class) 名稱，且帶有固定板型。

## 遇到的困難

* 不熟悉套件新版本的 API，無法立刻找到需要的函數或物件。
    * 根據當下的需求下合適的關鍵字在官方文件或 Google 搜尋，並根據搜尋結果的資訊更新關鍵字，迭代直到找到目標物。
