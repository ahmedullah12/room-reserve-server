import { User } from "./User.model"

const getAllUser = async() => {
    const result = await User.find();

    return result;

}


const getUserData = async(payload: string) => {
    const user = await User.findOne({email: payload});
    
    return user;
};

const makeAdmin = async(id: string) => {
    const result = await User.findByIdAndUpdate(id, {role: "admin"}, {new: true})
    
    return result;
};


export const UserServices = {
    getAllUser,
    getUserData,
    makeAdmin
}