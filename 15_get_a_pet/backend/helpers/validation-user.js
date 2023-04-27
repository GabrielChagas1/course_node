const yup = require('yup')

const schema = yup.object().shape({
    name: yup.string('Necessário preencher o campo nome!').required('Necessário preencher o campo nome!'),
    email: yup.string('Necessário preencher campo e-mail').required('Necessário preencher o campo e-mail').email('Necessário preencher o campo com e-mail válido!'),
    phone: yup.string('Necessário preencher o campo telefone!').required('Necessário preencher o campo telefone!'),
    password: yup.string('Necessário preencher o campo senha!').required('Necessário preencher o campo senha!'),
    confirmpassword: yup.string('Necessário preencher o campo confirmação de senha!').required('Necessário preencher o campo confirmação de senha!').oneOf([yup.ref('password'), null], 'A senha e a confirmação precisam ser iguais!'),
})

module.exports = schema