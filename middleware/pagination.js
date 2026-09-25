export const pagination = (req, res, next) => {
    const raw = parseInt(req.query.page, 10);
    const page = Number.isFinite(raw) && raw > 0 ? raw : 1;
    req.pagination = { page };
    next();
};
