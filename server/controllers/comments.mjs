import { pool } from "../models/dbPool.mjs";


//////////////////////// ALL COMMENTS FOR ONE BUILDING ////////////////////////////

export const getComments = async (req, res) => {
    const building_id = req.params.id
    if(!building_id){
        return res.status(400).send({error : "no building comments founded"})
    }
    try{
    const result = await pool.query(
        "SELECT * FROM comments WHERE building_id=$1", 
        [building_id])
        return res.json({info: result.rows});
    }catch(error){
        console.error(error)
        return res.status(500).json({error : "server error!"})
    }
}



//////////////////////// POST COMMENT ////////////////////////////
export const postComment = async (req, res) => {
    const {content} = req.body
    const dateofpost = new Date()
    const building_id = req.params.id
    const user_id = "14"
    if(!user_id){
        res.status(401).json({error: " not authorized"})
    }
    try {
    await pool.query (
        "INSERT INTO comments (building_id, content, user_id, date) VALUES ($1, $2, $3, $4)", 
        [building_id, content, user_id, dateofpost] 
    )
    return res.send({info: "comment added"})
    }
    catch(error) {
        console.error(error)      
    }
}


//////////////////////// DELETE UN COMMENT ////////////////////////////
export const deleteComment = async () => { 
    try{    
    const id = req.params
    await pool.query(
        "DELETE * FROM comments WHERE users_id=$1",
        [id]
    )
    return res.send({info: "comment deleted"})
    }
    catch{
        res.status(500).json({ error: err.message })
    }
}

//////////////////////// UPDATE UN COMMENT ////////////////////////////
export const updateComment = async() => {
    try {
        const id = req.params
        const {content} = req.body
        await pool.query (
            "UPDATE comments SET content = $1 WHERE id = $2",
            [content, id]
        )
        return res.send({info: "content update"})
    }
    catch {
        res.status(500).json({error: err.message})
    }
}