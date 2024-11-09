import QueryBuilder from '../../builder/QueryBuilder';
import { User } from './User.model';

const getAllUser = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query).paginate();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return { result, meta };
};

const getUserData = async (payload: string) => {
  const user = await User.findOne({ email: payload });

  return user;
};

const makeAdmin = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true },
  );

  return result;
};

export const UserServices = {
  getAllUser,
  getUserData,
  makeAdmin,
};
