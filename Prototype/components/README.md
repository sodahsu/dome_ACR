# 日期區間選擇器元件使用說明

## 簡介
這是一個基於 Vue.js 和 Flatpickr 的日期區間選擇器元件，提供統一的日期選擇功能供各頁面使用。

## 安裝與引用

### 1. 引入必要的 CSS 和 JS 文件
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/zh-tw.js"></script>
<script src="components/date-range-picker.js"></script>
```

### 2. 在 Vue 應用中使用
```html
<div id="app">
    <date-range-picker 
        label="通報案件完成日期 (起/迄)"
        v-model="dateRange"
        @change="onDateChange">
    </date-range-picker>
</div>

<script>
new Vue({
    el: '#app',
    data: {
        dateRange: []
    },
    methods: {
        onDateChange(dates) {
            console.log('選擇的日期:', dates);
        }
    }
});
</script>
```

## API 說明

### Props（屬性）

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | String | `'日期區間 (起/迄)'` | 標籤文字 |
| `placeholder` | String | `'選擇一個日期區段'` | 預設提示文字 |
| `dateFormat` | String | `'Y-m-d'` | 日期格式 |
| `enableTime` | Boolean | `false` | 是否啟用時間選擇 |
| `locale` | String | `'zh_tw'` | 語言設定 |
| `value` | Array | `[]` | 綁定的日期數組（v-model） |

### Events（事件）

| 事件 | 參數 | 說明 |
|------|------|------|
| `input` | `dates: Array` | v-model 雙向綁定事件 |
| `change` | `dates: Array` | 日期變更事件 |

### Methods（方法）

可以通過 `ref` 調用元件的方法：

| 方法 | 參數 | 說明 |
|------|------|------|
| `clear()` | - | 清空選擇 |
| `setDates(dates)` | `dates: Array` | 設定日期 |

## 使用範例

### 基本用法
```html
<date-range-picker 
    label="日期範圍"
    v-model="dateRange">
</date-range-picker>
```

### 包含時間選擇
```html
<date-range-picker 
    label="時間範圍"
    :enable-time="true"
    v-model="dateTimeRange">
</date-range-picker>
```

### 自訂標籤和提示
```html
<date-range-picker 
    label="案件處理期間"
    placeholder="請選擇處理期間"
    v-model="processingRange">
</date-range-picker>
```

### 程式控制
```html
<date-range-picker 
    ref="datePicker"
    v-model="controlledRange">
</date-range-picker>

<button @click="setThisMonth">本月</button>
<button @click="clearDates">清空</button>

<script>
methods: {
    setThisMonth() {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        this.$refs.datePicker.setDates([start, end]);
    },
    clearDates() {
        this.$refs.datePicker.clear();
    }
}
</script>
```

## 在現有頁面中應用

### 替換 index.html
將原本的日期選擇器替換為元件：

```html
<!-- 原本的代碼 -->
<div class="form-group">
    <label>通報案件完成日期 (起/迄)</label>
    <div class="form-input date-range">
        <input ref="dateRangePicker" v-model="dateRangeDisplay" type="text"
            placeholder="選擇一個日期區段" readonly>
    </div>
</div>

<!-- 替換為元件 -->
<date-range-picker 
    label="通報案件完成日期 (起/迄)"
    v-model="dateRange"
    @change="onDateChange">
</date-range-picker>
```

### 替換 index2.html 和 review.html
同樣的方式替換這兩個文件中的日期選擇器。

## 優勢

1. **統一性**：所有頁面使用相同的日期選擇器外觀和行為
2. **可重用**：一次開發，多處使用
3. **可配置**：通過 props 自訂功能和外觀
4. **易維護**：修改元件即可影響所有使用處
5. **類型安全**：統一的 API 介面減少錯誤

## 注意事項

1. 確保已正確引入 Flatpickr 的 CSS 和 JS 文件
2. 確保已引入繁體中文語言包
3. 元件需要在 Vue 實例中使用
4. 日期格式遵循 Flatpickr 的格式規範
