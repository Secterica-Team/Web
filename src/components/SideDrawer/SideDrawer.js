import React from 'react';
import './SideDrawer.css';
import {NavLink} from 'react-router-dom';
import LocationContext from '../../context/location-context';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class SideDrawer extends React.Component{
    render() {
        let drawerClasses = 'side-drawer';
        if (this.props.show) {
            drawerClasses = 'side-drawer open';
        }
        return (
            <nav className={drawerClasses}>
                <ul>
                    <li><a>Convert to PDF</a></li>
                    <li><a>Convert to Excel</a></li>
                </ul>
            </nav>
        );
    };
}
export default SideDrawer;