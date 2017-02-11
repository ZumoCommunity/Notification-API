module.exports = {
    getAllContacts: function(req, res){
        res.json([]);
    },
    addContact: function(req, res){
        var entity = req.swagger.params.entity.value;

        res.json(entity);
    },
    getContactById: function(req, res){
        var id = req.swagger.params.id.value;

        res.json({});
    },
    deleteContactById: function(req, res){
        var id = req.swagger.params.id.value;

        res.status(200).end();
    },
    updateContact: function(req, res){
        var id = req.swagger.params.id.value;
        var entity = req.swagger.params.entity.value;

        res.json(entity);
    }
};