import React from "react";

import OutterWrapper from "../components/wrapper";
import Header from '../components/header';
import Row from "../components/row";
import Button from '../components/button';

import { homeContent } from '../international';

export default function Home() {
    return (
        <OutterWrapper >               
            <Row><Header title="Village Surgery" description="something something"/></Row>
            <Row/>
            <Row>
                <Button title={homeContent.bookAppointment}/>
                <Button title={homeContent.showBookings} />
            </Row>
        </OutterWrapper>
    );    
}
