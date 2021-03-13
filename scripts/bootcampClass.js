'use strict';

class BootcampClass {
    constructor() {
        this.personList = [];
        this.numOfP = 0;

        this.classAPI = "https://appleseed-wa.herokuapp.com/api/users/";
        console.log('0000000000', this);
    }

    async fetchAndJson(url) {
        let data = await fetch(url);
        return data.json();
    }

    // async mergeLists(apiDataList) {
    //     if (this.personList === []) {
    //         this.personList = apiDataList;
    //     } else {
    //         apiDataList.forEach(apiPerson => {
    //             if (condition) {
                    
    //             }
    //         });
    //     }
    // }

    async saveExtraData(p, i) {
        const extraData = await this.fetchAndJson(`${this.classAPI}${i}`);
        p.age = extraData.age;
        p.city = extraData.city;
        p.gender = extraData.gender;
        p.hobby = extraData.hobby;
    }

    // merge the api info to the info already exist, if double id: the existing api stays
    async pullClassInfoAndMerge() { //TODO create button and listener
        console.log(this.personList,'1111111')
        const apiDataList = await this.fetchAndJson(this.classAPI);
        if (this.numOfP === 0) {//  === []
            for (let i = 0; i < apiDataList.length; i++) {
                this.personList[i] = new Person(apiDataList[i].id, apiDataList[i].firstName, apiDataList[i].lastName, apiDataList[i].capsule);
                this.numOfP++;
                
                // save the extra data of the person from the api
                await this.saveExtraData(this.personList[i], i);
            }
        } else {
            for (let i = 0; i < apiDataList.length; i++) { //apiDataList.forEach((apiPerson, i) => {
                let apiPerson = apiDataList[i];
                // if the person allready exist in the array
                console.log('...', apiPerson.id === this.personList[0].id)
                if (this.personList.find(p => apiPerson.id === p.id)) {
                    console.log('?????????')
                    // check if the extra data not exists
                    if (p.age !== 0 && p.city !== "" && p.gender != "" && p.hobby !== "") {
                        // save the extra data of the person from the api
                        await this.saveExtraData(p, i);
                    }
                    
                } else { // the person from api does not exist in this list
                    this.numOfP++;
                    // add the person to the list and the add the extra data
                    this.personList.push(new Person(apiDataList[i].id, apiDataList[i].firstName, apiDataList[i].lastName));
                    await this.saveExtraData(apiPerson, i);
                }
            };
        }
    }

    remove(id) {
        // // find the index of the element
        // // console.log(this.personList[0]);
        // const toRemove = this.personList.findIndex((p) => p.id === 0);
        // // console.log(toRemove)
        // if (toRemove !== -1) {
        //     this.personList.splice(toRemove, 1);
        //     return `removed`;
        // } else {
        //     return 'id was not found';
        // }
        

        
        this.personList.map((u,index)=>{
        
            if(u.id===id){
                this.personList.splice(index,1);
                this.numOfP--;
                return `removed`;
            }
            else {
                return 'id was not found';
            }
        })
    
    }

    edit(_idToEdit, _newPerson) {
        const toEdit = this.personList.findIndex((p) => p.id === _idToEdit);
        if (toEdit !== -1) {
            this.personList[toEdit] = _newPerson;
        } else {
            console.log('not find');
        }
    }
}

