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
            <h2 className='styleIt' style={{ color: 'lightBlue', fontSize:'60px', fontFamily:'sans-serif'}}>Upload document for verification</h2>
            <h2 className='styleIt' style={{ color: 'white', fontSize:'25px', marginBottom: '60px', fontFamily:'ui-serif' }}> Medical bill, Budget Breakdown, Testimonials or any other relevant document</h2>
            <div {...getRootProps()} className="dropzone-container styleIt">
                <input {...getInputProps()} />
                <p className="dropzone-text styleIt" style={{ fontSize: '17px' }}>Choose a Document</p>
            </div>
            <div>
                {uris.map((uri) => (
                    <MediaRenderer key={uri} src={uri} alt="Image" width = "400px"/>
                ))}
            </div>
        </div>
    );
};

export default UploadDoc;
