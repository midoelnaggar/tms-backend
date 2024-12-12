import bcrypt from "bcryptjs"

export const comparePassword = async (typedPassword: string, userPassword: string): Promise<boolean> => {
    return await bcrypt.compare(typedPassword, userPassword);
}

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}