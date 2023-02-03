import User from '../models/User.js';
export const checkAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(403)
        .send('You are not admin. You cannot get access. Try again');
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// change
