const LIMIT = 10;

export default async function paginate(Model, { page = 1, filter = {}, sort = {}, select = null, populate = null } = {}) {
    const skip = (page - 1) * LIMIT;
    let query = Model.find(filter).sort(sort).skip(skip).limit(LIMIT);
    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    const [items, total] = await Promise.all([
        query.exec(),
        Model.countDocuments(filter),
    ]);
    return {
        items,
        page,
        limit: LIMIT,
        total,
        pages: Math.ceil(total / LIMIT) || 1,
    };
}
