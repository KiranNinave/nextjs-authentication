import mongodb from '../../middleware/mongodb';
import User from '../../model/user';

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const isUserExists = await User.find({ email });
      if (isUserExists)
        return res
          .status(403)
          .json({ errorMessage: 'email has already taken!' });
      const newUser = new User({ email, password });
      await newUser.save();
      return res.status(201).json({ user: newUser });
    }
    return res.status(404).json({ errorMessage: 'route not found!' });
  } catch (err) {
    console.log('register api err', err);
    return res
      .status(500)
      .json({ errorMessage: 'internal server error!' });
  }
};

export default mongodb(handler);
