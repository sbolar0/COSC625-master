import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import Dropdown from "./Dropdown";
import styles from '../Styles/Components/Chart.module.css';


export default function Chart() {

    //set states and refs as consants
    const chartContainerRef = useRef()
    const chart = useRef()
    const socket = useRef()
    const candleSeries = useRef()
    const resizeObserver = useRef()
    const [selectedCoin, setCoin] = useState("BTCUSD")
    const [timeInt, setTimeInt] = useState("1m")
    const [chartCreated, setChartCreated] = useState(false)
    
    // handle change of values
    const handleTime = (e) => {
        console.log(e)
        setTimeInt(e.target.value)
    }
    const handleCoin = (e) => {
        console.log(e)
        setCoin(e.target.value)
    }

    // set options
    var coin_options = [
        {value:"BTCUSD" , label:"BTC/USD"},
        {value:"ETHUSD", label: "ETH/USD"},
        {value:"ADAUSD", label:"ADA/USD"},
        {value:"MANAUSD", label:"MANA/USD"},
        {value:"LTCUSD", label:"LTC/USD"},
        {value:"BNBUSD", label:"BNB/USD"},
        {value:"VETUSD", label:"VET/USD"},
    ]

    // set time interval options
    var timeOptions = [
        {value:"1m" , label:"1 Minute"},
        {value:"3m" , label:"3 Minute"},
        {value:"5m" , label:"5 Minute"},
        {value:"15m", label:"15 Minute"},
        {value:"30m", label:"30 Minute"},
        {value:"1h" , label:"1 Hour"},
        {value:"4h" , label:"4 Hour"},
        {value:"6h" , label:"6 Hour"},
        {value:"12h", label:"12 Hour"},
        {value:"1d" , label:"1 Day"},
        {value:"1w" , label: "1 Week"},
        {value:"1M" , label: "1 Month"}
    ]

    // update chart and socket on select change
    useEffect(() => {
        if(chartCreated){
            var raw = JSON.stringify({
                coin: String(selectedCoin),
                time_int: String(timeInt)
            })

            var myHeaders = new Headers()
            myHeaders.append("x-api-key", "2fQzbCxpF9Eh3YGW3GZa")
            myHeaders.append("Content-Type", "application/json")

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            } 

            fetch("https://api.cameronzuziak.dev/crypto/candles", requestOptions)
            .then(response => response.json())
            .then(response => candleSeries.current.setData(response))
            .catch(error => console.log("Fetch error: " + error))
            
            var coinLower = String(selectedCoin).toLowerCase();
            var timeLower = String(timeInt).toLowerCase();
            var url = "wss://stream.binance.us:9443/ws/"  + coinLower + "@kline_" + timeLower;
            console.log(url)
            socket.current.close()
            socket.current = new WebSocket(url)
            socket.current.onmessage = function(event){
                var message = JSON.parse(event.data)
                var candlestick = message.k
                candleSeries.current.update({
                    time: candlestick.t/1000,
                    open: candlestick.o,
                    high: candlestick.h,
                    low: candlestick.l,
                    close: candlestick.c
                })
            }
        }

    }, [selectedCoin, timeInt])

    // Create and set chart on load
    useEffect(() => {
        chart.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                //height: 600,
                layout: {
                    backgroundColor: "transparent",
                    textColor: "rgba(255, 255, 255, 0.9)"
                },
                grid: {
                    vertLines: {
                        color: "transparent"
                    },
                    horzLines: {
                        color: "transparent"
                    }
                },
                crosshair: {
                    mode: CrosshairMode.Normal
                },
                priceScale: {
                    borderColor: "#485c7b"
                },
                timeScale: {
                    timeVisible: true,
                    borderColor: 'rgba(197, 203, 206, 0.8)'
                }
        });
        candleSeries.current = chart.current.addCandlestickSeries({
                upColor: '#70FFFF',
                downColor: '#FFFF0A',
                borderDownColor: '#FFFF0A',
                borderUpColor: '#70FFFF',
                wickDownColor: '#FFFFFF',
                wickUpColor: '#FFFFFF',
        });
        function setChart(){
            var raw = JSON.stringify({
                coin: selectedCoin,
                time_int: timeInt
            })
            var myHeaders = new Headers()
            myHeaders.append("x-api-key", "2fQzbCxpF9Eh3YGW3GZa")
            myHeaders.append("Content-Type", "application/json")
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
            
            fetch("https://api.cameronzuziak.dev/crypto/candles", requestOptions)
            .then(response => response.json())
            .then(response => candleSeries.current.setData(response))
            .catch(error => console.log("Fetch error: " + error))

            var coinLower = String(selectedCoin).toLowerCase();
            var timeLower = String(timeInt).toLowerCase();
            var url = "wss://stream.binance.us:9443/ws/"  + coinLower + "@kline_" + timeLower;
            console.log(url)
            socket.current = new WebSocket(url)
            socket.current.onmessage = function(event){
                var message = JSON.parse(event.data)
                var candlestick = message.k
                candleSeries.current.update({
                    time: candlestick.t/1000,
                    open: candlestick.o,
                    high: candlestick.h,
                    low: candlestick.l,
                    close: candlestick.c
                })
            }
        } 

        if(chartCreated){document.getElementById("chartMain").innerHTML = ""}
        if(!chartCreated){ 
            setChart()
            setChartCreated(true)
        }

    }, []);
  
    // Resize chart container on page resize.
    useEffect(() => {
      resizeObserver.current = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect;
        chart.current.applyOptions({ width, height });
        setTimeout(() => {
          chart.current.timeScale().fitContent();
        }, 0);
      });
      resizeObserver.current.observe(chartContainerRef.current);
  
      return () => resizeObserver.current.disconnect();
    }, []);
  
    return (
        <div className={styles.candleStick}>
            <div ref={chartContainerRef} id="chartMain" className={styles.chartSize}>
            </div>
            <div id="loading"></div>
            <div className={styles.chrtSettings}>      
                <Dropdown options={coin_options} onChange={(e)=>handleCoin(e)} selectedOption={selectedCoin}/>
                <Dropdown options={timeOptions} onChange={(e)=>handleTime(e)} selectedOption={timeInt}/>
            </div> 
        </div>
    );
}


