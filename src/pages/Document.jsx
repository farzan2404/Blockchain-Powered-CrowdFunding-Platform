import React, { useCallback, useState } from 'react';
import { useStorageUpload, MediaRenderer, useAddress } from "@thirdweb-dev/react";
import { useDropzone } from "react-dropzone";
import { useStateContext } from "../context";
import "./index.css";

const UploadDoc = () => {
    const [uris, setUris] = useState([]);
    const { mutateAsync: upload } = useStorageUpload();
    const { uploadUserDocument } = useStateContext();

    const address = useAddress();
    const onDrop = useCallback(
        async (acceptedFiles) => {

            try {
            const uploadedUris = await upload({ data: acceptedFiles });
            const success = await uploadUserDocument(address, uploadedUris);            

            if(success)
            {
            setUris(uploadedUris);
            console.log(uploadedUris);
            alert("Documents successfully uploaded");
            }
            
            }

            catch (error) {
                console.error("Error uploading documents", error);
            }
        },
        [upload]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <h2 style={{ color: 'red', fontSize:'18px' }}>Required Documents* </h2>
            <h2 style={{ color: 'white', fontSize:'17px' }}>1). Aadhaar Card</h2>
            <h2 style={{ color: 'white', fontSize:'17px' }}>2). Pan Card</h2>
            <h2 style={{ color: 'white', fontSize:'17px', marginBottom: '20px' }}> 3). Medical bill, Budget Breakdown, Testimonials or any other relevant document</h2>
            <div {...getRootProps()} className="dropzone-container">
                <input {...getInputProps()} />
                <p className="dropzone-text">Choose the files</p>
            </div>
            <div>
                {uris.map((uri) => (
                    <MediaRenderer key={uri} src={uri} alt="Image" width = "400px"/>
                ))}
            </div>
            <h2 style={{ color: 'white', fontSize:'15px'}}>Note: Minimum 3 documents mandatory</h2>
        </div>
    );
};

export default UploadDoc;
