import React from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";


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
    console.log(arr);
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

