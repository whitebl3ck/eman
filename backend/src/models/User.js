const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userTypes: [{
    type: {
      type: String,
      enum: ['customer', 'planner', 'venue_owner'],
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  profiles: {//this is what gives users the ability to have more than one role
    customer: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    planner: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    venue_owner: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for userTypes
userSchema.index({ 'userTypes.type': 1, 'userTypes.isPrimary': 1 });
userSchema.index({ 'userTypes.username': 1 }, { unique: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to add a new user type
userSchema.methods.addUserType = async function(type, username) {
  try {
    // Validate username
    if (!username) {
      throw new Error('Username is required');
    }

    // Validate username format
    if (username.length < 3 || username.length > 30) {
      throw new Error('Username must be between 3 and 30 characters');
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, underscores, and hyphens');
    }

    // Check if username is already taken
    const existingUser = await this.constructor.findOne({
      'userTypes.username': username,
      _id: { $ne: this._id }
    });

    if (existingUser) {
      throw new Error('Username is already taken');
    }

    // Check if user already has this type
    const existingType = this.userTypes.find(ut => ut.type === type);
    if (existingType) {
      // Update username if provided
      existingType.username = username;
      await this.save();
      return existingType;
    }

    // If this is the first user type, make it primary
    const isPrimary = this.userTypes.length === 0;

    // Add new user type
    const newType = {
      type,
      isPrimary,
      username,
      createdAt: new Date()
    };

    // If this is being set as primary, update other types
    if (isPrimary) {
      this.userTypes.forEach(ut => {
        ut.isPrimary = false;
      });
    }

    this.userTypes.push(newType);
    await this.save();
    return newType;
  } catch (error) {
    console.error('Error in addUserType:', error);
    throw error;
  }
};

// Method to set primary user type
userSchema.methods.setPrimaryUserType = async function(type) {
  if (!this.userTypes.some(ut => ut.type === type)) {
    throw new Error('User type not found');
  }
  
  this.userTypes.forEach(ut => {
    ut.isPrimary = ut.type === type;
  });
  await this.save();
};

// Method to remove a user type
userSchema.methods.removeUserType = async function(type) {
  const typeIndex = this.userTypes.findIndex(ut => ut.type === type);
  if (typeIndex === -1) {
    throw new Error('User type not found');
  }

  // If removing primary type, make another type primary if available
  if (this.userTypes[typeIndex].isPrimary && this.userTypes.length > 1) {
    const nextType = this.userTypes.find(ut => ut.type !== type);
    if (nextType) {
      nextType.isPrimary = true;
    }
  }

  this.userTypes.splice(typeIndex, 1);
  await this.save();
};

// Method to update username for a role
userSchema.methods.updateRoleUsername = async function(type, username) {
  const userType = this.userTypes.find(ut => ut.type === type);
  if (!userType) {
    throw new Error('User type not found');
  }
  
  userType.username = username;
  await this.save();
};

// Create indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ 'userTypes.type': 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model('User', userSchema);

module.exports = User; 