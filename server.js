import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import seedAdmin from './utils/seedAdmin.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();
    await seedAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
