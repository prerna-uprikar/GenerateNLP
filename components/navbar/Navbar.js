"use client"
import React, { useState } from "react";
import GenerateNlLogo from "../../assets/svg/GenerateNlLogo";
import Sparkle from "../../assets/svg/Sparkle";
import Modal from 'react-modal';
import CrossIcon from "../../assets/svg/CrossIcon";

export default function Navbar(props) {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isSaved, setIsSaved] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    const [userQuestion, setUserQuestion] = useState("");
    const [savedName, isSavedName] = useState("");

    const handleInputChange = (e) => {
        setUserQuestion(e.target.value);
    };

    const handleSaveInputChange = (e) => {
        isSavedName(e.target.value);
    };

    const handleGenerateClick = () => {
        const generateUrl = 'http://127.0.0.1:5000/queries/generate';

        const data = {
            question: userQuestion,
        };
        const headers = {
            'Content-Type': 'application/json'
        };

        fetch(generateUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Request failed');
                }
            })
            .then(responseText => {
                props.setGeneratedQuery({ ...props.generatedQuery, [props.activeTab]: responseText });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        props.setShowSavedQuery(true);
        props.setSaveQuery(false);
    };

    const handleSave = () => {
      
        const saveQueryUrl = 'http://127.0.0.1:5000/queries';

        const savedQuerydata = {
            query: props.generatedQuery[props.activeTab],
            name: savedName,
        };
        const headers = {
            'Content-Type': 'application/json'
        };

        fetch(saveQueryUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(savedQuerydata),
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if(!response.ok) {
                    alert(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            setIsOpen(false);
        }, 2000);
    }

    

    return (
        <div className="navbar-wrapper mx-[25px] my-[32px] flex items-center justify-between">
            <div className="flex items-center">
                <div className="mr-[24px] bg-[#25242D] h-[54px] w-[54px] flex justify-center items-center rounded-[8px]">
                    <GenerateNlLogo />
                </div>
                <div className="bg-[#25242D] rounded-[12px] h-[54px] p-[8px] flex items-center">
                    <Sparkle />
                    <div>
                        <input type="text" placeholder="Start searching with natural language" value={userQuestion} onChange={handleInputChange} className="bg-[#100E12] min-w-[578px] ml-[8px] pl-[8px] py-[8px] rounded-[8px] text-[14px] text-white outline-none" />
                    </div>
                </div>
                <div>
                    <button className="text-white text-[16px] bg-[#874BD4] rounded-[8px] px-[18px] py-[8px] ml-[10px]" onClick={handleGenerateClick}>Generate</button>
                </div>
            </div>
            <div>
                <button  onClick={openModal} className="text-[#874BD4] text-[16px] rounded-[8px] px-[18px] py-[8px] border border-[#874BD4]">Save</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className="flex justify-end" onClick={closeModal}><CrossIcon /></span>
                <div>
                    <p className="text-[18px] text-[500] text-[#333] pb-[12px]">Save Queries</p>
                    <input type="text" placeholder="Query name" value={savedName} onChange={handleSaveInputChange}  className="border border-[#999] rounded-[8px] mb-[24px] py-[8px] px-[5px] outline-none w-full" />
                    <div>
                        <button onClick={closeModal} className="text-[#874BD4] border border-[#874BD4] text-[16px] rounded-[8px] px-[18px] py-[8px]">Cancel</button>
                        <button onClick={handleSave} className="text-white text-[16px] bg-[#874BD4] rounded-[8px] px-[18px] py-[8px] ml-[12px]">
                        {isSaved ? 'Saving..' : 'Save'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>

    )
}
