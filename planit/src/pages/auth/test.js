const { Client, Account } = require('appwrite');


// Create the Appwrite client with the custom fetch method
const client = new Client()
    .setEndpoint('https://localhost/v1') // Your API Endpoint
    .setProject('641f366aecda205350ba'); // Your project ID

const account = new Account(client);

account.create('tesgdt21', 'asd41dd@ad.com', 'testasdasdasdasdasd').then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});

export default function Test() {
return (
    <div>
        <h1>Test</h1>   
    </div>
)
}