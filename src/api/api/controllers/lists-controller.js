module.exports = {
    getAllLists: function(req, res){
        res.json([]);
    },
    addList: function(req, res){
        var entity = req.swagger.params.entity.value;

        res.json(entity);
    },
    getListById: function(req, res){
        var id = req.swagger.params.id.value;

        res.json({});
    },
    deleteListById: function(req, res){
        var id = req.swagger.params.id.value;

        res.status(200).end();
    },
    updateList: function(req, res){
        var id = req.swagger.params.id.value;
        var entity = req.swagger.params.entity.value;

        res.json(entity);
    }
};