"use client"
import { useEffect, useState } from "react";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [uploadedImage, setImage] = useState([]);

    const getContent = async () => {
        // const asset = await Stack.getImage('bltc6d770f343361373');
        // console(asset);
        // let result = await fetch('/api/images/foo');

        // const data = await result.json();
        // console.log('result', data.theResult);
        console.log(process.env.CONTENTSTACK_MANAGEMEMENT_TOKEN, process.env.CONTENTSTACK_API_KEY)

        let result = await fetch('https://api.contentstack.io/v3/assets/bltc6d770f343361373', {
            method: "GET",
            headers: {
                "authorization": process.env.CONTENTSTACK_MANAGEMEMENT_TOKEN,
                "api_key": process.env.CONTENTSTACK_API_KEY,
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
    }

    useEffect(() => {
        //getContent();
    }, []);


    async function upload() {
        const data = new FormData();
        console.log('the file', uploadedImage)
        data.append('asset[upload]', uploadedImage, 'test.svg');
        let result = await fetch('https://api.contentstack.io/v3/assets/', {
            method: "POST",
            body: data,
            headers: {
                "authorization": process.env.CONTENTSTACK_MANAGEMEMENT_TOKEN,
                "api_key": process.env.CONTENTSTACK_API_KEY,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    return (
        <div className="p-12 flex flex-col">
            <input
                type="file"
                onChange={(e) => {
                    console.log(e.target.files);
                    let selectedFiles = e.target.files;
                    if (selectedFiles && selectedFiles[0]) {
                        let blobUrl = URL.createObjectURL(selectedFiles[0]);
                        let temp = [...files, blobUrl]
                        setFiles(temp);
                        setImage(e.target.files[0]);
                    }
                }}
            />

            <div>
                <button className="border py-1 px-3 mt-3" onClick={upload}>
                    Upload
                </button>
            </div>


            {files.map((file, index) => (
                <img key={index} src={file} />
            ))}

        </div>
    );
}
