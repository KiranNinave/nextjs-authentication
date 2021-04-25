import cookie from 'cookie';
import mongodb from '../../middleware/mongodb';
import User from '../../model/user';

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !user.isValidPassword(password))
        return res
          .status(401)
          .json({ errorMessage: 'Invalid credentials!' });
      const token = user.getJwt(req.host);
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('authorization', token, {
          httpOnly: true, // client browsers javascript will not able to read cookie
          secure: process.env.NODE_ENV !== 'development', // cookie work only on https connection
          sameSite: true, // this cookie will only work on the domain that it created
          maxAge: 3600, // expiry of cookie
          path: '/', // root level cookie will work on all routes on server
        }),
      );
      return res.status(200).json({ message: 'login success!' });
    }
    return res.status(404).json({ errorMessage: 'route not found!' });
  } catch (err) {
    console.log('login api error', err);
    return res
      .status(500)
      .json({ errorMessage: 'Internal server error!' });
  }
};

export default mongodb(handler);
