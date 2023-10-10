import { User } from './user.model';

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {}
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateUserId = async (): Promise<string> => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  return (parseInt(currentId) + 1).toString().padStart(5, '0');
};
