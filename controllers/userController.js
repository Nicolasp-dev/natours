const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// HANDLING -- GET -- REQUEST
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'You request all users',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POST a password data.
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route isn't for password updates", 400));
  }

  // 2. Filtered out unwanted fields that are not allowed to be updated.
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3. Update user document.
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success ',
    data: {
      user: updatedUser,
    },
  });
});

// HANDLING -- URL PARAMS -- REQUEST
exports.getUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// HANDLING -- POST -- REQUEST
exports.createUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// HANDLING -- PATCH -- REQUEST
exports.updateUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// HANDLING -- DELETE -- REQUEST
exports.deleteUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
