# Kiểm tra bàn giao — 10/10/2026

Đã kiểm tra bản build static được phục vụ tại localhost, bằng Chromium/Playwright.

| Hạng mục | Kết quả |
| --- | --- |
| Astro/TypeScript | 0 lỗi, 0 cảnh báo, 0 hint |
| Build | 21 trang HTML, output `dist/` |
| Unit tests | 6/6 đạt |
| Kiểm tra chức năng trên trình duyệt | 25/25 đạt |
| Responsive | 35 tổ hợp: 5 ngôn ngữ × 375, 390, 430, 768, 1024, 1440, 1920px |
| Trang thông tin | 15/15 trang pháp lý, bảo mật, nguồn ảnh tải đúng |
| Lỗi console / JavaScript | 0 / 0 |
| Ảnh không tải được | 0, kể cả ảnh trong accordion và modal |
| Horizontal overflow | 0 ở toàn bộ tổ hợp đã kiểm tra |
| Sitemap | 20 URL canonical; mỗi URL có 5 hreflang và x-default, không trùng |
| Dependency audit | 0 vulnerabilities ở lần kiểm tra hiện tại |
| JavaScript client | Khoảng 9.5 KB trước nén, không framework runtime |

Các luồng đã kiểm tra: chi tiết lưu trú, đổi ảnh và chọn loại phòng vào form; gallery filter, fullscreen, previous/next, phím mũi tên và Escape; vuốt ảnh mobile; thanh ngày lưu trú bắt lỗi ngày và chuyển dữ liệu; hai form riêng, email, consent, số khách; loading/error/success; endpoint trống không có thành công giả; Maps chỉ tải theo yêu cầu và có thể tắt; copy đúng địa chỉ; menu mobile toàn màn hình; lưu ngôn ngữ và truy cập trực tiếp; reduced motion.

Đã xem trực tiếp ảnh chụp desktop 1440px, mobile 390px, menu mobile và bản hero tiếng Việt. Các chiều rộng 375–430px được kiểm tra tự động ở đủ năm ngôn ngữ. Đây là mô phỏng kích thước/touch trên Chromium, chưa phải kiểm tra trên iPhone/Android vật lý.

Bài kiểm tra trạng thái tiếp nhận form dùng phản hồi mock thành công/lỗi, không gửi thông tin đến người khác. Website thật chưa có endpoint và không tuyên bố đã giao email. Cần xác nhận người nhận và kiểm thử gửi thật khi kích hoạt.

Các giới hạn được công bố: ảnh hiện tại chỉ minh họa; thông tin phòng, tiện nghi, giá và dịch vụ cần xác nhận; trang pháp lý/bảo mật cần nội dung kinh doanh chính thức; domain chính thức chưa được cung cấp. Xem `CLIENT-CHECKLIST.md`.

Chạy lại: `npm test`, `npm run build`; phục vụ `dist/`, đặt `QA_URL` tương ứng rồi `npm run test:browser`. Nếu chưa có trình duyệt Playwright, cài Chromium bằng `npx playwright install chromium` hoặc đặt `PLAYWRIGHT_CHROMIUM_EXECUTABLE` trỏ đến Chromium đã cài. Không build lại vào cùng `dist/` trong lúc kiểm tra trình duyệt đang đọc bản đó.
