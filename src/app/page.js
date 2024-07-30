"use client"
import { useEffect, useState } from "react";
import {XMarkIcon, ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/solid"

export default function Home() {
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [deleteIds, setDeleteIds] = useState("");

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


    async function upload() {
        const data = new FormData();
        for(let x = 0; x < images.length; x++)
            data.append('fileUpload', images[x], images[x].name);
        let result = await fetch('/api/images', {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    function deleteImage(index){
        let temp = [...files.slice(0, index), ...files.slice(index + 1)];
        setFiles(temp);
    }

    function moveLeft(index){
        let temp = [...files];
        let a = temp[index - 1];
        temp[index - 1] = temp[index];
        temp[index] = a;
        setFiles(temp);

    }

    function moveRight(index){
        let temp = [...files];
        let a = temp[index + 1];
        temp[index + 1] = temp[index];
        temp[index] = a;
        setFiles(temp);
    }

    async function deleteImages(){
        let ids = deleteIds.split(" ")
        let body = {"assets" : []}
        for(let x = 0; x < ids.length; x++){
            body.assets.push({"uid":ids[x]})
        }
        console.log('body', body);
        
        let result = await fetch('/api/images', {
            method: "DELETE",
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }

    return (
        <div className="p-12 flex flex-col">
            <input
                type="file"
                onChange={async (e) => {
                    let selectedFiles = e.target.files;
                    if (selectedFiles && selectedFiles[0]) {
                        let blobUrl = URL.createObjectURL(selectedFiles[0]);
                        let temp = [...files, blobUrl]
                        setFiles(temp);
                        setImages([...images, e.target.files[0]]);
                    }
                }}
            />

            <div>
                <button className="border py-1 px-3 mt-3" onClick={upload}>
                    Upload
                </button>
            </div>


            <div className="flex">
                {files.map((file, index) => {
                    let size;
                    if (index === 0)
                        size = "w-64 h-64";    
                    else
                        size="w-36 h-36";

                    return(
                        <div 
                            key={index} 
                            className={"group relative border bg-cover bg-center " + size} 
                            style={{backgroundImage: `url(${file})`}}>
                                <div 
                                    className="absolute top-0 right-0 p-1 w-6 bg-white hidden group-hover:block group-hover:cursor-pointer"
                                    onClick={() => deleteImage(index)}    
                                >
                                    <XMarkIcon className="w-5 h-5 text-[#757575]"  />
                                </div>

                                <div 
                                    className="absolute bottom-0 left-0 p-1 w-6 bg-white hidden group-hover:block group-hover:cursor-pointer"
                                    onClick={() => moveLeft(index)}    
                                >
                                    {index !== 0 &&
                                        <ArrowLeftIcon className="w-5 h-5 text-[#757575]"  />
                                    }
                                </div>

                                <div 
                                    className="absolute bottom-0 right-0 p-1 w-6 bg-white hidden group-hover:block group-hover:cursor-pointer"
                                    onClick={() => moveRight(index)}    
                                >
                                    {index !== (files.length - 1) &&
                                        <ArrowRightIcon className="w-5 h-5 text-[#757575]"  />
                                    }
                                </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex mt-36">
                <input 
                    className="p-2 border border-gray-500 rounded w-96 "
                    onChange={(e) => setDeleteIds(e.target.value)}
                ></input>
                <button className="border p-2 ml-2 border-gray-500" onClick={deleteImages}>
                    Delete
                </button>
            </div>
        </div>
    );
}
