import contatoService from "../services/contato.service";

const getEntities = async(id, res) => {
    if(!id) return res.status(500).json({message: "Id não informado!"})
        contatoService.getContactsByUserId(id, res);
}

const getEntitiesById = async(id, res) =>{
    if(!id) return res.status(500).json({message: "Id não informado!"})
        contatoService.getContactById(id, res);
}

const putEntity = async (updatedData, id, res) => {
    
}


export default {getEntities, getEntitiesById}