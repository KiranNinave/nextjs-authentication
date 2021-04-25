import User from '../model/user';

const authorization = (handler) => async (req, res) => {
  try {
    const token = req.cookies.authorization;
    console.log('token', token);
    // verify token
    // get user object from database
    // add user object on request
  } catch (err) {
    console.log('authorization middleware error', err);
    return res
      .status(500)
      .json({ errorMessage: 'Internal server error!' });
  }
};

export default authorization;
