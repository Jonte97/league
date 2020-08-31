import { useState, useEffect } from 'react';
import React from "react";
import Header from "./champions/Header";
import Body from "./champions/Body";

const Champions = () => {

    return (
        <React.Fragment>
            <Header />
            <Body />
        </React.Fragment>
    );
};

export default Champions;