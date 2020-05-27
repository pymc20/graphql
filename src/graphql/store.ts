class store {
    private users: [{[key: string]: any}]
    constructor(users: [{[key: string]: any}] = [{}]) {
        this.users = users;
    }
    setUser(input:any) {
        this.users.push({...input});
    }
    getUser(id:String) {
        for(let user of this.users) {
            if(user['id'] == id) {
                return user;
            }
        }
    }
}
export default new store();