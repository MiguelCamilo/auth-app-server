import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide a unique Username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
	},
	authentication: {
		// select: false does not return password and salt when the user data is requested
		password: { type: String, required: true, unique: false, select: false },
		salt: { type: String, select: false}
	},
	firstName: { type: String },
	lastName: { type: String },
	phoneNumber: { type: Number },
	profile: { type: String },
});

export const UserModal = mongoose.model("User", UserSchema);

// actions
export const getUserByEmail = (email) => UserModal.findOne({ email });
export const getUserByUsername = (username) => UserModal.findOne({ username });
export const createUser = (values) =>
	new UserModal(values).save().then((user) => user.toObject());
	// new: true returns the updated data
export const updateUserById = (id, values) => UserModal.findByIdAndUpdate(id, values, { new: true });


