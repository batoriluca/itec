const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);



// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;

    const runPromptOtherType = async() => {
        const promptOtherType = `Is ${ name }  a type of poem? Respond only with yes or no. Return response in the following parsable JSON formatt
        
        {
            "Q": "question",
            "A": "answer"
        }
        
        `;

        const responseOtherType = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: promptOtherType,
            max_tokens: 2048,
            temperature: 1,

        });
        // console.log(responseOtherType.data.choices[0].text);
        const parsableJSONresponse = responseOtherType.data.choices[0].text;
        const parsedResponse = JSON.parse(parsableJSONresponse);
        const otherTypeData = {
            yesorno: parsedResponse.A
        }

        //console.log(otherTypeData.yesorno)
        res.json(otherTypeData)
    }
    runPromptOtherType();


});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));