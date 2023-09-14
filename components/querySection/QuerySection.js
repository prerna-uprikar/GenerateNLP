"use client"
import React, { useState, useEffect, useRef } from "react";
import CrossIcon from "../../assets/svg/CrossIcon";
import Download from "../../assets/svg/Download";
import ShareIcon from "../../assets/svg/Share";
import PlusIcon from "../../assets/svg/PlusIcon";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Run from "../../assets/svg/Run";
import ColumnChart from "../../assets/chart-svg/ColumnChart";
import BarChart from "../../assets/chart-svg/BarChart";
import { Chart } from 'react-google-charts';
import Copy from "../../assets/svg/Copy";
import RightTick from "../../assets/svg/RightTick";
import Table from "../../assets/chart-svg/Table";
import LineChart from "../../assets/chart-svg/LineChart";
import PieChart from "../../assets/chart-svg/PieChart";
import Save from "../../assets/svg/Save";
import Edit from "../../assets/svg/Edit";
import Delete from "../../assets/svg/Delete";

export default function QuerySection(props) {

    const [tabs, setTabs] = useState([{ id: 1, query: "" }]);
    const [isCopied, setIsCopied] = useState(false);
    const copyBtnRef = useRef();
    const [selectedChartType, setSelectedChartType] = useState(null);

    const currentActiveTab = props.activeTab;

    const addTab = () => {
        const newTabId = tabs.length + 1;
        setTabs([...tabs, { id: newTabId, query: "" }]);
        props.setActiveTab(newTabId);
    };

    const closeTab = (tabId) => {
        const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
        setTabs(updatedTabs);
        props.setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : null);
    };

    const switchTab = (tabId) => {
        props.setActiveTab(tabId);
        props.setSaveQuery(false);
    };

    const handleChangeQuery = (value) => {

        const updatedTabs = tabs.map((tab) =>
            tab.id === props.activeTab ? { ...tab, query: value } : tab
        );
        setTabs(updatedTabs);

        props.setGeneratedQuery({ ...props.generatedQuery, [props.activeTab]: value })
    };

    const handleExecuteQuery = () => {

        const executeUrl = 'http://127.0.0.1:5000/queries/execute';

        const data = {
            query: props.generatedQuery[currentActiveTab],
        };

        const headers = {
            'Content-Type': 'application/json'
        };

        fetch(executeUrl, {
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
            .then(queryOutput => {
                props.setQueryOutput({ ...props.getQueryOutput, [currentActiveTab]: queryOutput });
                setSelectedChartType("Table");
            })
            .catch(error => {
                console.error('Error:', error);
            });
        props.setShowSavedQuery(true);
    }

    const queryOutputResult = props.getQueryOutput[currentActiveTab];

    const downloadChart = () => {
        const chartData = queryOutputResult ? JSON.parse(queryOutputResult) : null;
        if (chartData) {
            const chartDataUri = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chartData));
            const a = document.createElement("a");
            a.href = chartDataUri;
            a.download = "chart.json";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleCopyToClipboard = () => {
        const queryToCopy = props.generatedQuery[currentActiveTab];

        const textarea = document.createElement('textarea');
        textarea.value = queryToCopy;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';

        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    useEffect(() => {
        if (!copyBtnRef.current) return
        copyBtnRef.current.addEventListener('click', handleCopyToClipboard)
    }, [copyBtnRef.current]);

    const chartTypes = [
        { label: <Table />, type: "Table" },
        { label: <BarChart />, type: "BarChart" },
        { label: <ColumnChart />, type: "ColumnChart" },
        { label: <LineChart />, type: "LineChart" },
        { label: <PieChart />, type: "PieChart" },
    ];


    const handleChartButtonClick = (chartType) => {
        setSelectedChartType(chartType);
    };

    const options = {
        backgroundColor: 'transparent',
        hAxis: {
            textStyle: {
                color: 'white',
            },
        },
        vAxis: {
            textStyle: {
                color: 'white',
            },
        },
        legendTextStyle: {
            color: 'white',
        },
        titleTextStyle: {
            color: 'white',
        },
        showRowNumber: true,
    };

    const [savedQuery, setGetSavedQuery] = useState([]);

    const handleSaveQuery = () => {

        const fetchSaveQueryUrl = 'http://127.0.0.1:5000/queries';

        const headers = {
            'Content-Type': 'application/json'
        };

        fetch(fetchSaveQueryUrl, {
            method: 'GET',
            headers: headers,
        })
            .then(response => {

                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Request failed');
                }
            })
            .then(res => {

                setGetSavedQuery(JSON.parse(res));
                props.setSaveQuery(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleDelete = (q) => {

        const deleteUrl = `http://127.0.0.1:5000/queries/${q.id}`

        const headers = {
            'Content-Type': 'application/json'
        };

        fetch(deleteUrl, {
            method: 'DELETE',
            headers: headers,
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                   handleSaveQuery();
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    console.log(savedQuery)

    return (
        <>
            <div className="bg-[#25242d80] mx-[32px] min-h-[740px]">
                <div className="px-[25px] py-[10px] flex rounded-[12px] ">
                    <div className="flex items-center gap-[22px]">
                        <button onClick={handleSaveQuery} className="bg-[#d4cbff4d] text-white text-[12px] px-[12px] py-[8px] rounded-[44px] flex items-center">
                            <Save />
                            <span className="ml-[4px]">Saved Queries</span>
                        </button>
                        <div className="flex gap-[22px]">
                            {tabs.slice(0, 12).map((tab) => (
                                <div
                                    key={tab.id}
                                    className={`bg-[#d4cbff4d] px-[12px] py-[8px] rounded-[44px] flex items-center ${tab.id === props.activeTab ? "border border-white" : ""
                                        }`}
                                >
                                    <p
                                        className="text-white text-[12px] mr-[5px] cursor-pointer"
                                        onClick={() => switchTab(tab.id)}
                                    >
                                        {`Query ${tab.id}`}
                                    </p>
                                    <button onClick={() => closeTab(tab.id)}>
                                        <CrossIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addTab} className="bg-[#d4cbff4d] px-[8px] text-[18px] py-[8px] rounded-[10px] flex items-center">
                            <PlusIcon />
                        </button>
                    </div>
                    <div className="flex gap-[28px] ml-auto">
                        <button onClick={downloadChart} className="flex items-center">
                            <Download />
                            <span className="text-white text-[12px] ml-[4px]">Download</span>
                        </button>
                    </div>
                </div>

                <div className="flex">
                    {!props.isSaveQuery &&
                        <div className="px-[25px] relative">
                            <AceEditor
                                mode="mysql"
                                theme="twilight"
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                                highlightActiveLine={false}
                                value={tabs.find((tab) => tab.id === props.activeTab) ? props.generatedQuery[props.activeTab] || "" : ""}
                                onChange={handleChangeQuery}
                                style={{ borderBottomLeftRadius: "12px", borderTopLeftRadius: "12px", minHeight: "660px", minWidth: "600px", }}
                            />
                            <button onClick={() => {
                                handleExecuteQuery();
                            }}
                                className="bg-[#232129] text-white px-4 py-2 rounded-md absolute top-[10px] left-[85%]">
                                <Run />
                            </button>
                            <button ref={copyBtnRef} className="bg-[#232129] text-white px-5 py-3 rounded-md absolute top-[60px] left-[85%]">
                                {isCopied ? <RightTick /> : <Copy />}
                            </button>
                        </div>
                    }

                    {(props.isSaveQuery && savedQuery.length > 0) ? (<div className="bg-[#100E12] mx-[32px] min-h-[660px] min-w-[600px]" style={{ borderBottomLeftRadius: "12px", borderTopLeftRadius: "12px" }}>{
                        savedQuery.map(q =>
                            <div className="flex justify-between cursor-pointer items-center border border-[#874BD4] rounded-[8px] m-[10px]">
                                <p className="text-white text-[14px] p-[14px]">{q.name}</p>
                                <div className="flex gap-[14px] mr-[14px]">
                                    <span><Edit /></span>
                                    <span onClick={ () => handleDelete(q)}><Delete /></span>
                                </div>
                            </div>)
                    }
                    </div>) : null
                    }

                    {props.showSavedQuery && (
                        <div className="bg-[#100E12] min-h-[660px]">
                            <p className="text-white px-[12px] py-[8px] bg-[#232129] text-center font-normal text-[10px]">Select Graph</p>
                            {chartTypes.map((chart) => (
                                <div className={`flex m-[10px] p-[10px] justify-center my-[30px] ${selectedChartType === chart.type ? 'border-grey border rounded-[4px]' : ''}`} key={chart.type} onClick={() => handleChartButtonClick(chart.type)}>
                                    {chart.label}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="ml-[50px]">
                        {selectedChartType && (
                            <Chart
                                chartType={selectedChartType}
                                data={queryOutputResult ? JSON.parse(queryOutputResult) : ""}
                                width="600px"
                                height="600px"
                                legendToggle
                                options={options}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
