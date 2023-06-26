const whoiser = require('whoiser');

( async() => {

let domaininfo = whoiser.allTlds;

let domaininfo2 = await whoiser.domain('blog.google.com',{host: 'whois.nic.google',follow: 1});

console.log(whoiser.allTlds().then( async data=>{

data.forEach(async domain =>{

let domainMetaData = await whoiser(domain);

// if(new Date(domainMetaData.created) > new Date('2023-06-20'))

// console.log(domainMetaData);
console.log(domainMetaData.created);

// console.log(domainMetaData.contacts.administrative.name);
// console.log(domainMetaData.contacts.administrative.organisation);
// console.log(domainMetaData.contacts.administrative['e-mail']);
// console.log(domainMetaData.contacts.administrative.phone);
// console.log("===========================")

})

}));

console.log('======================');

console.log('======================');

console.log(domaininfo2);

})();