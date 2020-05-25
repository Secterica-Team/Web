import React from 'react';
import {NavLink} from 'react-router-dom';
import LocationContext from '../../context/location-context';
import './MainNavigation.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactExport from 'react-data-export';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class MainNavigation extends React.Component {
    static contextType = LocationContext;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            temperature: null,
            humidity: null,
            dust: null,
            smoke: null,
            co: null,
            co2: null,
            lpg: null
        };
    }

    componentWillMount() {
        this._isMounted = true;
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    exportToExcelHandler = () => {
        fetch(`http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/last_day?location=${encodeURIComponent(localStorage.getItem("currentLocationId"))}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        temperature: result[result.length - 1].tmp,
                        humidity: result[result.length - 1].hum,
                        dust: result[result.length - 1].dus,
                        smoke: result[result.length - 1].smk,
                        co: result[result.length - 1].co,
                        co2: result[result.length - 1].co2,
                        lpg: result[result.length - 1].lpg,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    render() {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        };
        let multiDataSet=[
            {
                columns: [
                    {
                        title: "PROPERTY",
                        width: {wch: 13},
                        style: {
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            },
                            border: {
                                top: {
                                    style: 'thin',
                                    color: "#000000"
                                },
                                bottom: {
                                    style: 'thin',
                                    color: "#000000"
                                },
                                left: {
                                    style: 'thin',
                                    color: "#000000"
                                },
                                right: {
                                    style: 'thin',
                                    color: "#000000"
                                }
                            }
                        }
                    },
                    {
                        title: "VALUE",
                        width: {wch: 13},
                        style: {
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            },
                            border: {
                                top: {
                                    style: 'thin',
                                    color: "#000000"
                                },
                                bottom: {
                                    style: 'thin',
                                    color: "#000000"
                                },
                                left: {
                                    style: 'thin',
                                    color: "#000000"
                                },
                                right: {
                                    style: 'thin',
                                    color: "#000000"
                                }
                            }
                        }
                    },
                ],
                data: [
                    [
                        {
                            value: "Temperature",
                            style: {
                                font: {
                                    sz: "10.5",
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                }
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            }
                        },
                        {
                            value: this.state.temperature,
                            style: {
                                font: {
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                },
                                numFmt: "0.0 °С"
                            }
                        },
                    ],
                    [
                        {
                            value: "Humidity",
                            style: {
                                font: {
                                    sz: "10.5",
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                }
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            }
                        },
                        {
                            value: this.state.humidity,
                            style: {
                                font: {
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                },
                                numFmt: "0.00\\%"
                            }
                        }
                    ],
                    [
                        {
                            value: "Dust",
                            style: {
                                font: {
                                    sz: "10.5",
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                }
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            }
                        },
                        {
                            value: this.state.dust,
                            style: {
                                font: {
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                },
                                numFmt: "0.00 \\ μ\\g\\/\\m3"
                            }
                        }
                    ],
                    [
                        {
                            value: "Smoke",
                            style: {
                                font: {
                                    sz: "10.5",
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                }
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            }
                        },
                        {
                            value: this.state.smoke,
                            style: {
                                font: {
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                },
                                numFmt: "0.00 \\ μ\\g\\/\\m3"
                            }
                        }
                    ],
                    [
                        {
                            value: "CO",
                            style: {
                                font: {
                                    sz: "10.5",
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                }
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            }
                        },
                        {
                            value: this.state.co,
                            style: {
                                font: {
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                },
                                numFmt: "0.00 \\ μ\\g\\/\\m3"
                            }
                        }
                    ],
                    [
                        {
                            value: "CO2",
                            style: {
                                font: {
                                    sz: "10.5",
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                }
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            }
                        },
                        {
                            value: this.state.co2,
                            style: {
                                font: {
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                },
                                numFmt: "0.00 \\ μ\\g\\/\\m3"
                            }
                        }
                    ],
                    [
                        {
                            value: "LPG",
                            style: {
                                font: {
                                    sz: "10.5",
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                }
                            },
                            fill: {
                                patternType: "solid",
                                fgColor: {rgb: "FFF86B00"}
                            }
                        },
                        {
                            value: this.state.lpg,
                            style: {
                                font: {
                                    bold: false
                                },
                                border: {
                                    top: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    left: {
                                        style: 'thin',
                                        color: "#000000"
                                    },
                                    right: {
                                        style: 'thin',
                                        color: "#000000"
                                    }
                                },
                                numFmt: "0.00 \\ μ\\g\\/\\m3"
                            }
                        }
                    ]
                ]
            }
        ];
        return (
            <LocationContext.Consumer>
                {(context) => {
                    return (
                        <header className="main-navigation">
                            <div className="toolbar__toggle-button">
                                <DrawerToggleButton click={this.props.drawerClickHandler}/>
                            </div>
                            <div className="main-navigation__logo">
                                <NavLink to="/main">
                                    <img src={require('../../Logo.svg')} alt="Logo"/>
                                </NavLink>
                            </div>
                            <nav className="main-navigation__item">
                                <ul>
                                    {!context.locationId && <li>
                                        <button type="button">Choose your station</button>
                                    </li>}
                                    {context.locationId && <li>
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
                                    {context.locationId && <li>
                                        {!this.state.isLoaded && this.exportToExcelHandler()}
                                        <ExcelFile filename="metadata"
                                                   element={<button type="button" onClick={() => {
                                                       this.setState({
                                                           isLoaded: false
                                                       })
                                                   }}
                                                   >Convert To Excel</button>}>
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

export default MainNavigation;