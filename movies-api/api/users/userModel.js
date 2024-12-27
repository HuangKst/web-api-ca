import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;



const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  username: { type: String, unique: true, required: true},
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
        validator: function (value) {
            // 验证密码是否符合至少8个字符，包含字母、数字和特殊字符的要求
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        },
        message: 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character',
    },
}, 
});

UserSchema.methods.comparePassword = async function (passw) { 
    return await bcrypt.compare(passw, this.password); 
};
UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
};
UserSchema.pre("save", async function (next) {
    if (!this.userId) {
      // 动态导入 nanoid
      const { nanoid } = await import("nanoid");
      this.userId = nanoid(12);
    }
    
    // 如果密码被修改或是新建
    if (this.isModified("password") || this.isNew) {
      try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  
  
  

export default mongoose.model('User', UserSchema);
