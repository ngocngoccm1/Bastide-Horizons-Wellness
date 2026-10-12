# Bastide Horizons Wellness

Website Astro + TypeScript statique, cinq langues complètes : `/fr/`, `/en/`, `/nl/`, `/de/`, `/vi/`. Direction artistique éditoriale française, photographies locales WebP, polices locales, aucune dépendance React ni outil analytique.

## Chạy trên máy

Node.js **22.19+** (Node 22 LTS được khuyến nghị). Dùng terminal Windows hoặc Linux tương ứng với môi trường đã cài dependencies.

```sh
npm ci
npm run dev
```

Mở `http://localhost:4321/fr/`. Trang gốc đưa người dùng về tiếng Pháp hoặc ngôn ngữ đã lưu. Mỗi URL ngôn ngữ được dựng HTML riêng và truy cập trực tiếp được.

```sh
npm run check
npm test
npm run build
npm run preview
```

Kết quả static trong `dist/`; không cần server Node khi deploy. Đã có khóa phiên bản trong `package-lock.json`. Nếu đổi từ WSL/Linux sang Windows, xóa `node_modules` rồi chạy lại `npm ci` để nhận đúng native binaries.

## Cấu trúc nội dung

- `src/data/brand.ts`: tên, logo thay thế, địa chỉ, tọa độ, email/điện thoại, cấu hình form, thông tin pháp lý.
- `src/data/content.ts`: lưu trú, nhóm wellness, giá, thư viện, nguồn điểm đến. Dữ liệu chưa xác nhận giữ `null`; không nhập số liệu giả.
- `src/data/translations.ts`: toàn bộ nội dung FR/EN/NL/DE/VI với cấu trúc TypeScript đồng nhất. Nội dung mới phải cập nhật đủ năm ngôn ngữ, kể cả alt ảnh và trạng thái lỗi.
- `src/components/`: header/menu, wordmark, ảnh responsive, footer, form, trường nhập liệu.
- `src/styles/global.css`: toàn bộ design system và các breakpoint mobile/tablet/desktop.
- `src/scripts/main.ts`: menu, gallery, lightbox, swipe, tabs, gửi form, bản đồ theo yêu cầu.
- `src/scripts/validation.ts`: kiểm tra đầu vào dùng chung; ngày đi phải sau ngày đến, số khách là số nguyên dương.
- `public/images/demo/`: **chỉ ảnh minh họa**, không phải ảnh thực tế Bastide. `manifest.json` và `ATTRIBUTION.md` ghi nguồn/giấy phép.
- `public/fonts/`: Cormorant Garamond regular/italic và Manrope, đủ bộ ký tự Việt, với giấy phép OFL.
- `CLIENT-CHECKLIST.md`: thông tin cần chủ cơ sở xác nhận.
- `qa/`: script kiểm tra trình duyệt; ảnh kết quả sinh ra được gitignore.

Wordmark hiện là chữ. Thay bằng logo chính thức qua `brand.logo`; không dùng biểu trưng BHW chưa được duyệt.

## Kết nối form thật

Sao chép `.env.example` thành `.env`. Tạo hai form ở Formspree và xác nhận email người nhận trong tài khoản dịch vụ; sau đó nhập endpoint **thật**:

```dotenv
PUBLIC_STAY_FORM_ENDPOINT=https://formspree.io/f/ID_LUU_TRU
PUBLIC_WELLNESS_FORM_ENDPOINT=https://formspree.io/f/ID_WELLNESS
PUBLIC_SITE_URL=https://TEN_MIEN_CHINH_THUC
```

Hai giá trị `ID_...` trên chỉ là ký hiệu minh họa, **không phải endpoint hoạt động**. Có thể dùng dịch vụ tương đương hỗ trợ POST `FormData`, CORS và phản hồi JSON. Cần build lại sau khi thay các biến `PUBLIC_*` vì đây là website static. Đây là URL công khai; không đặt token hay khóa bí mật trong biến `PUBLIC_*`.

Khi endpoint còn trống, người xem có thể nhập/kiểm tra yêu cầu nhưng website báo chưa có kênh gửi; không có trạng thái thành công giả. Khi có endpoint: nút có loading, timeout 20 giây, kiểm tra mã HTTP và phản hồi lỗi; chỉ khi nhận phản hồi chấp nhận mới hiện đã gửi. Lỗi gửi giữ nguyên nội dung để thử lại. Không thanh toán, không xác nhận phòng trống, không tự xác nhận đặt chỗ.

Trước khi bật form, hoàn thiện chính sách dữ liệu và kiểm thử gửi đến người nhận đã xác nhận. Honeypot đã có; cấu hình chống spam/rate limit ở dịch vụ tiếp nhận theo nhu cầu thực tế.

## Thay ảnh

Đưa ảnh cơ sở đã duyệt vào thư mục media riêng. Tạo WebP 640/1200/1920px (giữ tỷ lệ) và cập nhật `Picture.astro`, gallery, manifest, alt ở cả năm ngôn ngữ. Chỉ bỏ ghi chú “minh họa” khi ảnh đúng là cơ sở. Bản demo không lấy ảnh từ hai khách sạn tham chiếu.

Ảnh hero hiện là ảnh stock thật của một ngôi nhà ở Provence, không phải Bastide. Desktop sử dụng crop trung tâm phần dưới; mobile dùng crop dọc. Kiểm tra lại crop ở 375/390/430/768/1440px sau khi thay ảnh. Không hotlink ảnh.

## SEO

Mỗi trang/ngôn ngữ có title, description, canonical, hreflang, Open Graph, alt và HTML độc lập. `LodgingBusiness` chỉ chứa tên, địa chỉ và tọa độ đã cung cấp; không dùng ảnh stock như ảnh doanh nghiệp trong structured data. Astro tạo `sitemap-index.xml` và sitemap chứa đủ năm ngôn ngữ; endpoint `robots.txt` trỏ đúng sitemap. Cấu hình `PUBLIC_SITE_URL` bằng domain cuối cùng và build lại trước khi xuất bản công khai. Domain mặc định hiện là địa chỉ bản xem riêng Sites, không phải domain chính thức của doanh nghiệp.

Bản đồ dùng tọa độ từ Google Maps do khách cung cấp: 44.2974709, 5.1158487. Không tải iframe cho đến khi người xem nhấn hiển thị. Không cài analytics hay cookie quảng cáo. Chỉ ngôn ngữ được lưu qua localStorage; tùy chọn footer cho phép tắt iframe bản đồ.

## Deploy

### Netlify

Đã có `netlify.toml`: build `npm run build`, publish `dist`, Node 22. Thiết lập các biến môi trường trong dashboard rồi deploy repository. Không cần SPA fallback.

### Cloudflare Pages

Framework preset Astro; build `npm run build`, output `dist`, Node 22.19+. Nhập `PUBLIC_SITE_URL` và hai endpoint form trong build environment. Deploy static không cần adapter hoặc Worker.

### GitHub Pages

Đã có `.github/workflows/deploy.yml`. Bật Settings → Pages → GitHub Actions. Khai báo repository variable `PUBLIC_SITE_URL` và các form endpoint. Workflow mặc định phù hợp domain riêng hoặc site tại root `OWNER.github.io`. Với repository Pages dạng `/repository/`, cấu hình `base` trong Astro, đổi đường dẫn asset/link hiện đang từ root, rồi kiểm tra mọi ngôn ngữ; không deploy bản root trực tiếp vào subpath. Khuyến nghị custom domain để giữ URL `/fr/…` như yêu cầu.

### Sites

`.openai/hosting.json` giữ ID bản xem riêng. Các lần cập nhật phải tái sử dụng ID này, không tạo site mới. Bản demo private không thay thế việc xác nhận dữ liệu doanh nghiệp trước khi công khai.

## Kiểm tra bàn giao

Sáu unit tests kiểm tra ngày hợp lệ, email, consent và số khách. Script `qa/browser.mjs` kiểm tra năm ngôn ngữ, metadata, ảnh, overflow ở nhiều độ rộng, mobile menu, lightbox, booking, validation và trạng thái form. Thành công/lỗi dịch vụ được kiểm tra bằng phản hồi mock trong trình duyệt; đây không phải bằng chứng email thực tế đã được giao. Chi tiết kết quả trong `QA.md`.
"# Bastide-Horizons-Wellness" 
