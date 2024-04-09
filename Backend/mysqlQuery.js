const query = async(sqlQuery, queryParams)=>{
    const pool = require('./mysqlConnect')
    let connection;
    try{
        connection = await new Promise((resolve, reject)=>{
            pool.getConnection((err, conn)=>{
                if(err)
                reject(err)
            else
            resolve(conn)
            })
        })
        const result = await new Promise((resolve, reject)=>{
            connection.query(sqlQuery, queryParams, (err, result)=>{
                if(err)
                reject(err)
            else
            resolve(result)
            })
        })
        return result
    }
    catch(err){
        console.error('Cannot perform query')
        throw(err)
    }
    finally{
        if(connection){
            console.log('Connection released')
            connection.release()
        }
    }
}
module.exports = query