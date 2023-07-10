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
	about: { type: String }
});

export const UserModel = mongoose.model("User", UserSchema);

// actions
export const getUsers = () => UserModel.find() // returns all users without the profile field .select('-profile') 
export const getUserByEmail = (email) => UserModel.findOne({ email });
export const getUserByUsername = (username) => UserModel.findOne({ username });
export const createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
// new: true returns the updated data
export const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values, { new: true });

// if the collection 'User' exist then create "Users" plural
export default mongoose.model.Users || mongoose.model('User', UserSchema);


