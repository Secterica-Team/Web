import React from 'react';
import {NavLink} from 'react-router-dom';
import LocationContext from '../../context/location-context';
import './MainNavigation.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Workbook from 'react-xlsx-workbook'


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
                                            <Workbook filename="metadata.xlsx"
                                                      element={<button type="button" onClick={() => {
                                                          this.setState({
                                                              location: localStorage.getItem("currentLocationId")
                                                          })
                                                      }}>Convert To Excel</button>}>
                                                <Workbook.Sheet data={[
                                                    {
                                                        name: "temperature",
                                                        value: temperature ? temperature : "0"
                                                    },
                                                    {
                                                        name: "humidity",
                                                        value: humidity ? humidity : "0"
                                                    },
                                                    {
                                                        name: "dust",
                                                        value: dust ? dust : "0"
                                                    },
                                                    {
                                                        name: "smoke",
                                                        value: smoke ? smoke: "0"
                                                    },
                                                    {
                                                        name: "co",
                                                        value: co ? co: "0"
                                                    },
                                                    {
                                                        name: "co2",
                                                        value: co2 ? co2: "0"
                                                    },
                                                    {
                                                        name: "lpg",
                                                        value: lpg ? lpg: "0"
                                                    }
                                                ]} name="Sheet A">
                                                    <Workbook.Column label="Name" value="name"/>
                                                    <Workbook.Column label="Value" value="value"/>
                                                </Workbook.Sheet>
                                            </Workbook>
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