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
