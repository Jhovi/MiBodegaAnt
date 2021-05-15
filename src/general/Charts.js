import React from 'react';
import Axios from "axios";
import { Bar, Pie } from 'react-chartjs-2';

const { useState, useEffect } = React;

export const Charts = () => {
    const [data, setData] = useState([])

    const [usuarios, setUsuarios] = useState([
        { nombre: "", total: 0 }
    ]);
    useEffect(() => {
        Axios.get('Boleta/FetchTop5Customers').then(
             res => {
                 setData(res.data)
             }
         ).catch(
             err => {
                 console.log(err)
             }
         )
    }, [])


    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            })
    }

    var config = {
        data: data,
        yField: 'nombre',
        xField: 'total',
        yAxis: { label: { autoRotate: false } },
        scrollbar: { type: 'vertical' },
      };

    return <Bar {...config} />;
}