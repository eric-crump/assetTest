import { NextResponse } from "next/server";

export async function POST(request) {
    const form = await request.formData();
    const files = form.getAll("fileUpload");

    const uploadResult = [];
    for (let x = 0; x < files.length; x++) {
        const data = new FormData();
        data.append('asset[upload]', files[x], files[x].name);
        let result = await fetch('https://api.contentstack.io/v3/assets/', {
            method: "POST",
            body: data,
            headers: {
                "authorization": process.env.CONTENTSTACK_MANAGEMEMENT_TOKEN,
                "api_key": process.env.CONTENTSTACK_API_KEY,
            }
        })
            .then((response) =>
                response.json()
            )
            .then((result) => {
                console.log(result)
                uploadResult.push(result);
            })
            .catch((error) => {
                console.error(error);
                return NextResponse.json({ "error": error });
            });
    }

    return NextResponse.json({ "result": uploadResult })

}

export async function DELETE(request) {
    let data = await request.json();
    let res = "";
    let response = await fetch('https://api.contentstack.io/v3/bulk/delete', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "authorization": process.env.CONTENTSTACK_MANAGEMEMENT_TOKEN,
            "api_key": process.env.CONTENTSTACK_API_KEY,
            "Content-Type": "application/json"
        }
    })
    .then((response) =>
        response.json()
    )
    .then((result) => {
        console.log(result);
        res = result;
    })
    .catch((error) => {
        console.error(error);
        res = error;
        return NextResponse.json({ "error": error });
    });

    return NextResponse.json({ "result": res });
}