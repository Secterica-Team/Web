import React from 'react';
import {NavLink} from 'react-router-dom';
import LocationContext from '../../context/location-context';
import './MainNavigation.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class MainNavigation extends React.Component {
    static contextType = LocationContext;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            location: localStorage.getItem("currentLocationId"),
            error: null,
            isLoaded: false,
            temperature: null,
            humidity: null,
            dust: null,
            smoke: null,
            co: null,
            co2: null,
            lpg: null
        }
    }

    componentDidMount() {
        this._isMounted = true;

        fetch(`http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/last_day?location=${encodeURIComponent(this.state.location)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (this._isMounted) {
                        this.setState({
                            isLoaded: true,
                            temperature: result[result.length - 1].tmp,
                            humidity: result[result.length - 1].hum,
                            dust: result[result.length - 1].dus,
                            smoke: result[result.length - 1].smk,
                            co: result[result.length - 1].co,
                            co2: result[result.length - 1].co2,
                            lpg: result[result.length - 1].lpg
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {error, isLoaded, temperature, humidity, dust, smoke, co, co2, lpg} = this.state;
        const multiDataSet = [
            {
                columns: [
                    {
                        title: "PROPERTY",
                        width: {wch: 30},
                        style: {fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}}
                    },
                    {
                        title: "VALUE",
                        width: {wch: 20},
                        style: {fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}}
                    },
                ],
                data: [
                    [
                        {
                            value: "Temperature",
                            style: {font: {sz: "10.5", bold: true}},
                            fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}
                        },
                        {value: temperature ? temperature.toString() : "0", style: {font: {bold: true}}},
                    ],
                    [
                        {
                            value: "Humidity",
                            style: {font: {sz: "10.5", bold: true}},
                            fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}
                        },
                        {value: humidity ? humidity.toString() : "0", style: {font: {bold: true}}}
                    ],
                    [
                        {
                            value: "Dust",
                            style: {font: {sz: "10.5", bold: true}},
                            fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}
                        },
                        {value: dust ? dust.toString() : "0", style: {font: {bold: true}}}
                    ],
                    [
                        {
                            value: "Smoke",
                            style: {font: {sz: "10.5", bold: true}},
                            fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}
                        },
                        {value: smoke ? smoke.toString() : "0", style: {font: {bold: true}}}
                    ],
                    [
                        {
                            value: "CO",
                            style: {font: {sz: "10.5", bold: true}},
                            fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}
                        },
                        {value: co ? co.toString() : "0", style: {font: {bold: true}}}
                    ],
                    [
                        {
                            value: "CO2",
                            style: {font: {sz: "10.5", bold: true}},
                            fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}
                        },
                        {value: co2 ? co2.toString() : "0", style: {font: {bold: true}}}
                    ],
                    [
                        {
                            value: "LPG",
                            style: {font: {sz: "10.5", bold: true}},
                            fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}
                        },
                        {value: lpg ? lpg.toString() : "0",  style: {font: {bold: true}}}
                    ]
                ]
            }
        ];
        if (error) {
            return <div>Oops..something went wrong: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <LocationContext.Consumer>
                    {(context) => {
                        return (
                            <header className="main-navigation">
                                <div className="main-navigation__logo">
                                    <NavLink to="/main">
                                        <img src={require('../../Logo.svg')} alt="Logo"/>
                                    </NavLink>
                                </div>
                                <nav className="main-navigation__item">
                                    <ul>
                                        {!context.currentLocation && <li>
                                            <button type="button">Choose your station</button>
                                        </li>}
                                        {context.currentLocation && <li>
                                            <button id="buttonId" type="button" onClick={() => {
                                                const input = document.getElementById("root");

                                                html2canvas(input)
                                                    .then((canvas) => {
                                                        const imgData = canvas.toDataURL('image/png');
                                                        let pdf;
                                                        pdf = jsPDF({
                                                            orientation: 'landscape'
                                                        });
                                                        const imgProps = pdf.getImageProperties(imgData);
                                                        const pdfWidth = pdf.internal.pageSize.getWidth();
                                                        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                                                        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
                                                        pdf.save(`location_info.pdf`);
                                                    });
                                            }}>Convert to PDF
                                            </button>
                                        </li>}
                                        {context.currentLocation && <li>
                                            <ExcelFile filename="metadata"
                                                       element={<button type="button" onClick={() => {
                                                           this.setState({
                                                               location: localStorage.getItem("currentLocationId")
                                                           })
                                                       }}>Convert To Excel</button>}>
                                                <ExcelSheet dataSet={multiDataSet} name="Metadata"/>
                                            </ExcelFile>
                                        </li>}
                                    </ul>
                                </nav>
                            </header>
                        );
                    }}
                </LocationContext.Consumer>
            );
        }
    }
}

export default MainNavigation;