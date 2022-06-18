import UserModel from "../models/userModel.js"

const userid = "62ac4b20f3a500fcd81d0b0d" ;

class TodoController {

    static getList = async (req, res) => {
       const user = req.user ;
       try {
           const {todoList} = await UserModel.findOne({_id: user._id}, {todoList: 1}) ;
           console.log(todoList)
           res.send({status: 'success', data: todoList, message: 'todo list fetched successfully'});
       }
       catch(error) {
          console.log(error);
          res.send({status: 'failed', message: 'unable to get todo list'});
       }
    }


    static addItem = async (req, res) => {
        const user = req.user ;
        const {text} = req.body ;
        if(text) {
            const item = {text} ;
            try {
                await UserModel.updateOne(
                    {_id: user._id }, 
                    { $push: {todoList: item}}
                );
                const {todoList} = await UserModel.findOne({_id: user._id }, {todoList: 1}) ;
                res.send({status: 'success', data: todoList, message: 'addedd successfully'});
            }
            catch(error) {
                console.log(error);
                res.send({status: 'failed', message: 'unable to add into todo list'});
            }
        }
        else {
            res.send({status: 'failed', message: 'text can not be empty!!'});
        }
    }


    static updateItem = async (req, res) => {
        const user = req.user ;
        const note = req.body ;
        if(note.text) {
            try {
                await UserModel.updateOne(
                    {_id: user._id, 'todoList._id': note._id}, 
                    { $set: {'todoList.$': note}}
                ) ;
                const {todoList} = await UserModel.findOne({_id: user._id }, {todoList: 1}) ;
                res.send({status: 'success', data: todoList, message: 'todo item updated successfully'});
            }
            catch(error) {
                console.log(error);
                res.send({status: 'failed', message: 'unable to update into todo item'});
            }
        }
        else {
            res.send({status: 'failed', message: 'unable to update into todo item'});
        }
    }


    static deleteItem = async (req, res) => {
        const user = req.user ;
        const {noteId} = req.query ;
        if(noteId) {
            try {
                await UserModel.updateOne(
                    {_id: user._id}, 
                    { $pull: {todoList: {_id: noteId}}}
                );
                const {todoList} = await UserModel.findOne({_id: user._id }, {todoList: 1}) ;
                res.send({status: 'success', data: todoList, message: 'todo item deleted successfully'});
            }
            catch(error) {
                console.log(error);
                res.send({status: 'failed', message: 'unable to add into todo list'});
            }
        }
        else {
            res.send({status: 'failed', message: 'Provide noteId !!'})
        }
    }

}


export default TodoController ;