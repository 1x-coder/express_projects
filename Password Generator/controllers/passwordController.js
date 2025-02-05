import passwordModel from "../models/passwordModel";
module.exports = passwordController = {
    async generatePassword(type, length) {
        let pass = ""
        for(var len = 0; len<=length; len++){
            pass.concat(passwordModel.str);
        }
        return pass
    }
}