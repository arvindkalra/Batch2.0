import React from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import * as farmerFunctions from './dbController/farmerRole';

String.prototype.captialize = function(){
    let str = this.valueOf();

    let newstr = str.substr(0,1).toUpperCase() + str.slice(1);
    return newstr;
};


export const setBreadcrumb = url => {
    let arr = url.split('/');

    arr.shift();
    arr = arr.map(x => x.captialize());

    let count = arr.length;
    return(
        <Breadcrumb>
            {arr.map((urlItem, index)=>{

                    return(

                <Breadcrumb.Item  key={index} active={count === index+1} > {urlItem }</Breadcrumb.Item>
                    );

            })}
        </Breadcrumb>
    )

};

// TODO set seed progress for discarded
export const getSeedProgress = status => {
    switch (status) {
        case 'sown':
            return 20;
        case 'harvested':
            return 50;
        case 'Lab Test Approved':
            return 80;
        case 'sent':
            return 100;

    }
};

