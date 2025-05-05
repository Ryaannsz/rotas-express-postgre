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
    if(!id) return res.status(500).json({message: "Id não informado!"})
    if(!updatedData) return res.status(500).json({message: "Valores não passados!"})
    contatoService.putContact(updatedData, id, res)
}

const deleteEntity = async(email, res) => {
    if(!email) return res.status(500).json({message: "E-mail não informado!"})
        contatoService.deleteContact(email, res)
}


export default {getEntities, getEntitiesById, putEntity, deleteEntity}