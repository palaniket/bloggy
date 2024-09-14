import { openDb } from "@/lib/database";
export default async function handler(req,res) {
    const db=await openDb();
    const {id}=req.query;
    if(req.method==='GET'){
        const post =await db.get('SELECT * FROM posts WHERE id=?',[id]);
        if(post){
            res.status(200).json(post);

        }
        else{
            res.status(404).json({message:"post not found"});
        }
    }
    else if(req.method==='DELETE'){
        const result=await db.run('DELETE FROM posts WHERE id =?',[id]);
        if(result.changes>0){
            res.status(200).json({message:'deleted'});

        }
        else{
            res.status(404).json({message:"post not found"})
        }
    }
    else if(req.method==='PUT'){
        const post =await db.get('SELECT * FROM posts WHERE id=?',[id]);
        if(post){
           const {title,content}=req.body;
           await db.run('UPDATE posts SET title=?, content=? WHERE id=? ',[title,content,id]);
           res.status(200).json({message:"updated"})

        }
        else{
            res.status(404).json({message:"post not found"});
        }
    }
    else{
        res.status(405).json({message:"method not allowed"});
    }
    
}