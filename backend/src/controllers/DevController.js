const axios = require('axios'); //usado para fazer solicitacoes http
const Dev = require("../models/Dev");
const parseStringAsArray = require('./utils/parseStringAsArray');

//tipos de parametros
//Query params: req.query (filtros, ordernacao, paginacao)
//Route Params: req.params (identificar um recurso na alteracao ou remocao)
//Body: req.body (dados para criacao ou alteracao de um registro)

//geralmente esses controllers assim tem 5 metodos: index, show, store,update,destroy

module.exports = {

    async index(request,response){
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store(request,response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username}); //vai no banco para procurar alguem que tenha esse campo

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            //se nao tiver o name, ele vai buscar o login
            const { name = login ,avatar_url,bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            };
        
            //como o nome da propriedade é o mesmo da entidade, nao precisa por o nome
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

        }
   
        return response.json(dev);
    },

    async update(){

    },

    async destroy(){
        
    }

}