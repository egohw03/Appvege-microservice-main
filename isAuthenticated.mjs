import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    // 1. Lấy token từ cookie của request
    const token = req.cookies.jwt;

    if (!token) {
        // Nếu không có token, từ chối truy cập
        return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // 2. Giải mã token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
            // Nếu token không hợp lệ (hết hạn, sai chữ ký), từ chối truy cập
            return res.status(403).json({ message: "Forbidden - Invalid Token" });
        }

        // 3. Nếu token hợp lệ, lưu thông tin người dùng vào request và cho đi tiếp
        req.user = decodedPayload; // decodedPayload sẽ có dạng { userId: '...' }
        next();
    });
}

export default isAuthenticated;