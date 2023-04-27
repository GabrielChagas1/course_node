const yup = require('yup')

const schema = yup.object().shape({
    name: yup.string('Necessário preencher o campo nome!').required('Necessário preencher o campo nome!'),
    age: yup.number('Necessário preencher campo idadde').required('Necessário preencher o campo idade'),
    weight: yup.number('Necessário preencher o campo peso!').required('Necessário preencher o campo peso!'),
    color: yup.string('Necessário preencher o de cor!').required('Necessário preencher o de cor!'),
    //images: yup.array('Necessário fazer o upload das imagens').required('Necessário fazer o upload das imagens')
})

module.exports = schema