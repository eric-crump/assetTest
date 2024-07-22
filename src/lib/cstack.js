import contentstack from '@contentstack/management'
const client = contentstack.client({});

const theStack = client.stack({
    api_key: process.env.CONTENTSTACK_API_KEY,
    management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
})


export default {
    async getImage(id) {
        return new Promise((resolve, reject) => {
            theStack.asset(id)
                .fetch()
                .then(
                    function success(asset) {
                        console.log(asset);
                        resolve(asset);
                    },
                    function error(err) {
                        console.log("error", err);
                        reject(err);
                    }
                )
        })
    },

    async getStack() {
        return Stack;
    },
};

export const Stack = theStack;