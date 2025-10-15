import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  // Quét tất cả các file .jsx, .html trong thư mục src
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  // Thêm plugin DaisyUI
  plugins: [daisyui],
  daisyui: {
    // Bạn có thể chọn các theme màu sắc ở đây
    themes: ["light", "dark", "cupcake"],
  },
};