'use strict';

class BootcampClass {
    constructor() {
        this.personList = [];

        this.classAPI = "https://appleseed-wa.herokuapp.com/api/users/";
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
    async pullClassInfoAndMerge() {
        const apiDataList = await this.fetchAndJson(this.classAPI);
        if (this.personList === []) {
            this.personList = apiDataList;
        } else {
            for (let i = 0; i < apiDataList.length; i++) { //apiDataList.forEach((apiPerson, i) => {
                let apiPerson = apiDataList[i];
                if (this.personList.find(p => apiPerson.id === p.id)) {
                    // check if the extra data not exists
                    if (!p.age && !p.city && !p.gender && !hobby) {
                        // save the extra data of the person from the api
                        await this.saveExtraData(p, i);
                    }
                    
                } else { // the person from api does not exist in this list
                    // add the person to the list and the add the extra data
                    this.personList.push(apiPerson);
                    await this.saveExtraData(apiPerson, i);
                }
            };
        }
    }
}

let b = new BootcampClass();
b.pullClassInfoAndMerge();
console.log(b);
