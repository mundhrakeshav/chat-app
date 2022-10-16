import bcrypt from "bcrypt"

const bcryptHash = async (_data: string): Promise<string> => {
    const _salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(_data, _salt);
}

const bcryptHashCompare =async (value: string, encryptedValue: string): Promise<Boolean> => {
    return await bcrypt.compare(value, encryptedValue)
}


export { bcryptHash, bcryptHashCompare }
