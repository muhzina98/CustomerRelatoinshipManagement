import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getUsersService, loginUserService, registerUserService } from "../services/userServices.js";

// Standard success response
export const sendSuccess = (res, data, message = "Success", status = 200) => {
  res.status(status).json({ success: true, message, data });
};

// GET /api/users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await getUsersService();
  sendSuccess(res, users, "Users fetched successfully");
});

// POST /api/users/register
export const registerUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;
  const user = await registerUserService({ username, password, role });
  sendSuccess(res, user, "User registered successfully", 201);
});

// POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUserService({ username, password });

  if (!result.data) {
    return res.status(401).json({ success: false, message: result.message });
  }

  res.status(200).json({
    success: true,
    message: result.message,
    token: result.token, // ✅ Include token in response
    data: {
      _id: result.data._id,
      username: result.data.username,
      role: result.data.role
    }
  });
});
