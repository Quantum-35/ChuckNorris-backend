const Query = {
    users(parent, args, {  }, info) {
        console.log('@@ Here')
       return [{name: "hellow"}]
    
    }
}

export default Query;