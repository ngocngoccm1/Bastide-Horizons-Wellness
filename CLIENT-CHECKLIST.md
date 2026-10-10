# Thông tin cần xác nhận trước khi công khai

Website hiện là bản thiết kế hoàn chỉnh với nội dung và dữ liệu chờ duyệt ở các mục dưới đây.

- Logo SVG/PNG chính thức; bản chữ hiện tại chỉ là wordmark tạm.
- Ảnh thực tế: toàn cảnh nhà, phòng, từng gîte, không gian wellness, vườn, chi tiết đời sống; quyền sử dụng và chú thích ảnh.
- Danh sách từng phòng/gîte: tên chính thức, mô tả, sức chứa, diện tích, giường, tiện nghi, khả năng tiếp cận, ảnh tương ứng.
- Giá EUR đã duyệt, đơn vị tính, mùa áp dụng, thuế/phụ phí, thời gian lưu trú tối thiểu và điều kiện. Chưa có giá = “Tarifs sur demande”.
- Dịch vụ wellness thực tế, người cung cấp, mô tả, thời lượng, giá, giới hạn/điều kiện và lịch nhận yêu cầu. Không tự thêm hồ bơi, sauna, jacuzzi, hammam, yoga hay trị liệu.
- Gói lưu trú/trải nghiệm thật nếu có; hiện không quảng cáo ưu đãi, giảm giá hoặc tour cơ sở tổ chức.
- Email/điện thoại người nhận đã xác minh và hai endpoint tiếp nhận form. Kiểm thử email thật cho cả hai luồng trước khi bật.
- Hệ thống quản lý phòng/channel manager nếu muốn chuyển từ hỏi thông tin sang đặt phòng và tồn phòng thực tế.
- Giờ nhận/trả phòng, mùa hoạt động, chính sách trẻ em, thú cưng, hủy/đổi, thanh toán và bảo hiểm nếu áp dụng.
- Địa chỉ lối vào, hướng dẫn đến nơi và vị trí pin Maps duyệt lần cuối. Tọa độ hiện khớp liên kết khách cung cấp.
- Tên pháp nhân, SIRET, người chịu trách nhiệm xuất bản, thông tin chuyên môn và hosting thực tế.
- Người chịu trách nhiệm dữ liệu, bên nhận/xử lý dữ liệu, thời hạn lưu trữ, liên hệ thực hiện quyền; nội dung pháp lý và bảo mật cần duyệt trước khi bật form.
- Domain chính thức, các kênh mạng xã hội thật và bản dịch chủ cơ sở duyệt trong năm ngôn ngữ.
- Thay toàn bộ ảnh demo trước khi mô tả chúng như ảnh cơ sở. Không dùng ảnh hoặc logo của website tham chiếu.

Các dữ liệu chưa xác minh trong `src/data/brand.ts` và `src/data/content.ts` giữ `null` hoặc trạng thái `pending`. Đây là cơ chế giữ tính trung thực của bản xem, không phải lỗi nội dung.
