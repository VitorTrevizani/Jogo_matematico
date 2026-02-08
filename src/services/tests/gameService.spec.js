
const Usuario = require("../../models/Usuario")
const bcrypt = require("bcryptjs")
const gameService = require("../gameService")

jest.mock("../../models/Usuario", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn().mockReturnThis()
}))

jest.mock('bcryptjs')
jest.mock("../../models/Usuario")


describe("gameService.criarUsuario", () => {
    
    let body = { 
        email: "Jesus@mail.com",
        password: "peixe123"
    }
    
    test("deve pesquisar se o mesmo email enviado já existe, e retornar uma mensagem", async () => {
       
       
       Usuario.findOne.mockResolvedValue({
            _id: '694c04668c721bb8217360dc',
            email: 'Jesus@mail.com',
            nome: 'jesus',
            senha: '$2b$10$k6oFFFet.ozu0rGM4Cn0EeEZBEFb22sOG5.i/gOhN1c037DLfJdgC',
            recordeFacil: 0,
            recordeMedio: 6,
            recordeDificil: 0,
            recordeHard: 0,
            __v: 0,
            avatarPath: '/img/avatares/Avatar6.json'
        })

       const resultado = await gameService.criarUsuario(body)

       //verifica se há um usuário com o MEMSO EMAIL
       expect(Usuario.findOne).toHaveBeenCalledWith({email: "Jesus@mail.com"})
       expect(resultado).toBe("Já existe um usuário com esse email")
    })
})

describe("gameService.rankings", () => {

    const dif = undefined
   
    test("A variavel 'dificuldade' deve receber 'recordeFacil'",  async () => {
        
        const sortMock = jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue([{
                _id: '694c04668c721bb8217360dc',
                email: 'Jesus@mail.com',
                nome: 'jesus',
                senha: '$2b$10$k6oFFFet.ozu0rGM4Cn0EeEZBEFb22sOG5.i/gOhN1c037DLfJdgC',
                recordeFacil: 0,
                recordeMedio: 6,
                recordeDificil: 0,
                recordeHard: 0,
                __v: 0,
                avatarPath: '/img/avatares/Avatar6.json'
            }])
        })

        Usuario.find.mockReturnValue({ sort: sortMock })

   

        await gameService.rankings(dif)

        expect(sortMock).toHaveBeenCalledWith({"recordeFacil" : -1})
    })
})



