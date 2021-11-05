class User {
    /** 
     * @param {Object} data
     */
    constructor(data) {
        this['id'] = data.id;
        this['Name'] = data?.name || '';
        this['Email'] = data?.email || '';
        this['City'] = data?.address?.city || '';
        this['Company'] = data?.company.name || '';
    }
}

export default User;