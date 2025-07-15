/**
 * 日期區間選擇器元件
 * 使用 Vue.js + Flatpickr 實現
 */

// Vue 全域元件註冊
Vue.component("date-range-picker", {
  template: `
        <div class="form-group">
            <label>{{ label }}</label>
            <div class="form-input date-range">
                <input 
                    ref="dateRangePicker" 
                    v-model="displayValue" 
                    type="text"
                    :placeholder="placeholder" 
                    readonly 
                    class="border rounded-md p-2 w-full cursor-pointer">
            </div>
        </div>
    `,
  props: {
    // 標籤文字
    label: {
      type: String,
      default: "日期區間 (起/迄)",
    },
    // 預設提示文字
    placeholder: {
      type: String,
      default: "選擇一個日期區段",
    },
    // 日期格式
    dateFormat: {
      type: String,
      default: "Y-m-d",
    },
    // 是否啟用時間選擇
    enableTime: {
      type: Boolean,
      default: false,
    },
    // 語言設定
    locale: {
      type: String,
      default: "zh_tw",
    },
    // 雙向綁定的值
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      flatpickrInstance: null,
      displayValue: "",
      selectedDates: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initFlatpickr();
    });
  },
  beforeDestroy() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal && newVal.length === 2) {
          this.selectedDates = newVal;
          this.updateDisplayValue();
        } else {
          this.selectedDates = [];
          this.displayValue = "";
        }
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * 初始化 Flatpickr
     */
    initFlatpickr() {
      this.flatpickrInstance = flatpickr(this.$refs.dateRangePicker, {
        mode: "range",
        enableTime: this.enableTime,
        time_24hr: true,
        dateFormat: this.dateFormat,
        locale: this.locale,
        placeholder: this.placeholder,
        defaultDate: this.value,
        onClose: (selectedDates) => {
          this.selectedDates = selectedDates;
          this.updateDisplayValue();
          this.$emit("input", selectedDates);
          this.$emit("change", selectedDates);
        },
      });
    },

    /**
     * 更新顯示值
     */
    updateDisplayValue() {
      if (this.selectedDates.length === 2) {
        const startDate = this.formatDate(this.selectedDates[0]);
        const endDate = this.formatDate(this.selectedDates[1]);
        this.displayValue = `${startDate} ~ ${endDate}`;
      } else {
        this.displayValue = "";
      }
    },

    /**
     * 格式化日期
     * @param {Date} date
     * @returns {String}
     */
    formatDate(date) {
      if (!date) return "";

      if (this.enableTime) {
        return flatpickr.formatDate(date, this.dateFormat + " H:i");
      } else {
        return flatpickr.formatDate(date, this.dateFormat);
      }
    },

    /**
     * 清空選擇
     */
    clear() {
      if (this.flatpickrInstance) {
        this.flatpickrInstance.clear();
      }
      this.selectedDates = [];
      this.displayValue = "";
      this.$emit("input", []);
      this.$emit("change", []);
    },

    /**
     * 設定日期
     * @param {Array} dates
     */
    setDates(dates) {
      if (this.flatpickrInstance && Array.isArray(dates)) {
        this.flatpickrInstance.setDate(dates);
      }
    },
  },
});
