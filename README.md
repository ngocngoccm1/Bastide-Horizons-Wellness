# Bastide Horizons Wellness

Website Astro + TypeScript statique, cinq langues complètes sous `/Bastide-Horizons-Wellness/` sur GitHub Pages : `fr/`, `en/`, `nl/`, `de/`, `vi/`. Direction artistique éditoriale française, photographies locales WebP, polices locales, aucune dépendance React ni outil analytique.

## Chạy trên máy

Node.js **22.19+** (Node 22 LTS được khuyến nghị). Dùng terminal Windows hoặc Linux tương ứng với môi trường đã cài dependencies.

```sh
npm ci
npm run dev
```

Mở `http://localhost:4321/Bastide-Horizons-Wellness/fr/`. Trang gốc `/Bastide-Horizons-Wellness/` đưa người dùng về tiếng Pháp hoặc ngôn ngữ đã lưu. Mỗi URL ngôn ngữ được dựng HTML riêng và truy cập trực tiếp được.

```sh
npm run check
npm test
npm run build
npm run preview
```

Kết quả static trong `dist/`, gồm `dist/index.html` làm entry point GitHub Pages; không cần server Node khi deploy. Repository cũng có `index.html` ở gốc theo yêu cầu. Nguồn Pages phải là **GitHub Actions** để xuất bản đầy đủ `dist/` cùng các route và asset; không chọn “Deploy from a branch” trỏ vào source code. Đã có khóa phiên bản trong `package-lock.json`. Nếu đổi từ WSL/Linux sang Windows, xóa `node_modules` rồi chạy lại `npm ci` để nhận đúng native binaries.

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
PUBLIC_SITE_URL=https://ngocngoccm1.github.io
PUBLIC_BASE_PATH=/Bastide-Horizons-Wellness/
```

Hai giá trị `ID_...` trên chỉ là ký hiệu minh họa, **không phải endpoint hoạt động**. Có thể dùng dịch vụ tương đương hỗ trợ POST `FormData`, CORS và phản hồi JSON. Cần build lại sau khi thay các biến `PUBLIC_*` vì đây là website static. Đây là URL công khai; không đặt token hay khóa bí mật trong biến `PUBLIC_*`.

Khi endpoint còn trống, người xem có thể nhập/kiểm tra yêu cầu nhưng website báo chưa có kênh gửi; không có trạng thái thành công giả. Khi có endpoint: nút có loading, timeout 20 giây, kiểm tra mã HTTP và phản hồi lỗi; chỉ khi nhận phản hồi chấp nhận mới hiện đã gửi. Lỗi gửi giữ nguyên nội dung để thử lại. Không thanh toán, không xác nhận phòng trống, không tự xác nhận đặt chỗ.

Trước khi bật form, hoàn thiện chính sách dữ liệu và kiểm thử gửi đến người nhận đã xác nhận. Honeypot đã có; cấu hình chống spam/rate limit ở dịch vụ tiếp nhận theo nhu cầu thực tế.

## Thay ảnh

Đưa ảnh cơ sở đã duyệt vào thư mục media riêng. Tạo WebP 640/1200/1920px (giữ tỷ lệ) và cập nhật `Picture.astro`, gallery, manifest, alt ở cả năm ngôn ngữ. Chỉ bỏ ghi chú “minh họa” khi ảnh đúng là cơ sở. Bản demo không lấy ảnh từ hai khách sạn tham chiếu.

Ảnh hero hiện là ảnh stock thật của một ngôi nhà ở Provence, không phải Bastide. Desktop sử dụng crop trung tâm phần dưới; mobile dùng crop dọc. Kiểm tra lại crop ở 375/390/430/768/1440px sau khi thay ảnh. Không hotlink ảnh.

## SEO

Mỗi trang/ngôn ngữ có title, description, canonical, hreflang, Open Graph, alt và HTML độc lập. `LodgingBusiness` chỉ chứa tên, địa chỉ và tọa độ đã cung cấp; không dùng ảnh stock như ảnh doanh nghiệp trong structured data. Astro tạo `sitemap-index.xml` và sitemap chứa đủ năm ngôn ngữ; endpoint `robots.txt` trỏ đúng sitemap. Mặc định `PUBLIC_SITE_URL` là `https://ngocngoccm1.github.io` và `PUBLIC_BASE_PATH` là `/Bastide-Horizons-Wellness/`. Đây là host triển khai, chưa phải domain chính thức của doanh nghiệp.

Bản đồ dùng tọa độ từ Google Maps do khách cung cấp: 44.2974709, 5.1158487. Không tải iframe cho đến khi người xem nhấn hiển thị. Không cài analytics hay cookie quảng cáo. Chỉ ngôn ngữ được lưu qua localStorage; tùy chọn footer cho phép tắt iframe bản đồ.

## Deploy

### Netlify

Đã có `netlify.toml`: build `npm run build`, publish `dist`, Node 22.19+. Nếu dùng Netlify, đặt `PUBLIC_SITE_URL` bằng origin Netlify hoặc domain riêng và `PUBLIC_BASE_PATH=/`, rồi deploy repository. Không cần SPA fallback.

### Cloudflare Pages

Framework preset Astro; build `npm run build`, output `dist`, Node 22.19+. Nhập `PUBLIC_SITE_URL`, `PUBLIC_BASE_PATH=/` và hai endpoint form trong build environment. Deploy static không cần adapter hoặc Worker.

### GitHub Pages

Workflow `.github/workflows/deploy.yml` chạy khi push vào `main`: test, build Astro, upload toàn bộ `dist/` (bao gồm `index.html`) rồi deploy. Nguồn tại **Settings → Pages → Build and deployment** đã được chuyển sang **GitHub Actions**. URL dự kiến: `https://ngocngoccm1.github.io/Bastide-Horizons-Wellness/`; trang gốc tự chuyển đến `/Bastide-Horizons-Wellness/fr/` hoặc ngôn ngữ đã lưu. Không cần commit thư mục `dist/`.

`site` và `base` mặc định khớp với repository này; link, ảnh, font, sitemap và SEO đều tính cả đường dẫn `/Bastide-Horizons-Wellness/`. Có thể đặt repository variables `PUBLIC_SITE_URL` và `PUBLIC_BASE_PATH` để đổi host. Khi dùng custom domain ở root, đặt `PUBLIC_SITE_URL=https://TEN_MIEN_CHINH_THUC` và `PUBLIC_BASE_PATH=/`, đồng thời cấu hình DNS và custom domain trong GitHub Pages. Endpoint form `PUBLIC_STAY_FORM_ENDPOINT` và `PUBLIC_WELLNESS_FORM_ENDPOINT` cũng nhập ở repository variables sau khi đã xác minh nơi nhận. Form để trống sẽ báo chưa khả dụng, không hiện thành công giả.

### Sites

`.openai/hosting.json` giữ ID bản xem riêng. Các lần cập nhật phải tái sử dụng ID này, không tạo site mới. Bản demo private không thay thế việc xác nhận dữ liệu doanh nghiệp trước khi công khai.

## Kiểm tra bàn giao

Sáu unit tests kiểm tra ngày hợp lệ, email, consent và số khách. Script `qa/browser.mjs` kiểm tra năm ngôn ngữ, metadata, ảnh, overflow ở nhiều độ rộng, mobile menu, lightbox, booking, validation và trạng thái form. Thành công/lỗi dịch vụ được kiểm tra bằng phản hồi mock trong trình duyệt; đây không phải bằng chứng email thực tế đã được giao. Chi tiết kết quả trong `QA.md`.
"# Bastide-Horizons-Wellness" 
