import { body } from 'express-validator';

const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('O nome é obrigatório.')
      .isLength({ min: 3 })
      .withMessage('o nome precisa ter no minimo 3 caracteres.'),
    body('email')
      .isString()
      .withMessage('O email é obrigatório.')
      .isEmail()
      .withMessage('insira um email válido'),
    body('password')
      .isString()
      .withMessage('A senha é obrigatória.')
      .isLength({ min: 8 })
      .withMessage('A senha precisa ter no minimo 8 caracteres.')
      .isStrongPassword({
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
      .withMessage(
        'A senha precisa ter no mínimo 1 letra maiscula, 1 letra minuscula, um simbolo e 1 número',
      ),
    body('confirmpassword')
      .isString()
      .withMessage('A confirmação de senha é obrigatória.')
      .custom((value: string, { req }): boolean => {
        if (value != req.body.password) {
          throw new Error('As senhas não são iguais.');
        }
        return true;
      }),
  ];
};

export default userCreateValidation;
