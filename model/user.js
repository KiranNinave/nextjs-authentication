import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// user schema
const userSchema = new mongoose.Schema({
  email: { type: mongoose.Schema.Types.String, require: true },
  password: { type: mongoose.Schema.Types.String, require: true },
});

// save signal that hash password before saveing it to database
userSchema.pre('save', async function onSave(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// check whether password matches with hashed password hash password
userSchema.methods.isValidPassword = async function isValidPassword(
  newPassword,
) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// return jwt token for user
userSchema.methods.getJwt = function getJwt(host) {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET)
    throw new Error(
      'JWT_SECRET not found in environmental variables',
    );
  const token = jwt.sign(
    {
      iss: host,
      sub: this.id,
      iat: new Date().getTime(),
    },
    JWT_SECRET,
    { expiresIn: '1h' },
  );
  return token;
};

// validated jwt token
userSchema.methods.getJwtContent = async function getJwtContent() {
  return false;
};

export default mongoose.models.user ||
  mongoose.model('user', userSchema);
