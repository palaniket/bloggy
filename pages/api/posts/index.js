import { openDb } from "@/lib/database";
export default async function handler(req,res) {
    const db=await openDb();
    if(req.method==='GET'){
        const posts=await db.all('SELECT * FROM posts');
        res.status(200).json(posts)
    }
    else if(req.method==='POST'){
        const {title,content}=req.body;
        const post=await db.run('INSERT INTO posts(title,content) VALUES(?,?) ', [title,content]);
        const postId=post.lastID;
        res.status(201).json({success:true})

    }
    else{
        res.status(405).json({success:false});
    }
    
}