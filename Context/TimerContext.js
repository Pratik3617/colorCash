import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [period1, setPeriod1] = useState('');
  const [period2, setPeriod2] = useState('');
  const [timer1, setTimer1] = useState(0); 
  const [timer2, setTimer2] = useState(0); 
  const [emerdResult, setEmerdResult] = useState([]);
  const [bconeResult, setBconeResult] = useState([]);

  

  // Function to fetch results from the API
  const fetchResults = async () => {
    try {
      const [emerdResponse, bconeResponse] = await Promise.all([
        axios.get("https://www.backend.colour-cash.com/api/v1/result/emerd"),
        axios.get("https://www.backend.colour-cash.com/api/v1/result/bcone")
      ]);
      setEmerdResult(emerdResponse.data.data);
      setBconeResult(bconeResponse.data.data);
    } catch (error) {
      console.log("Error fetching results:", error);
    }
  };

  useEffect(() => {
    // Fetch results initially and then every 30 seconds
    fetchResults();
    const intervalId = setInterval(fetchResults, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const generateTimestamp = () => {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
    return `${month}${day}${hours}${minutes}`;
  };

  // when app is running change period
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentMinutes = currentTime.getMinutes();
      if(currentMinutes%2==0){
        setPeriod2(generateTimestamp());
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentMinutes = currentTime.getMinutes();
      if(currentMinutes%3==0){
        setPeriod1(generateTimestamp());
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); 


  useEffect(() => {
    const updateTimers = () => {
        const currentTime = new Date();
        const currentMinutes = currentTime.getMinutes();
        const currentSeconds = currentTime.getSeconds();

        // Calculate the remaining seconds until the next multiple of 3 minutes for Timer 1
        const remainingSecondsTimer1 = (3 - (currentMinutes % 3)) * 60 - currentSeconds;

        // Calculate the remaining seconds until the next multiple of 2 minutes for Timer 2
        const remainingSecondsTimer2 = (2 - (currentMinutes % 2)) * 60 - currentSeconds;

        // Check if current time is a multiple of 3 minutes for updating period1
        if (currentMinutes % 3 === 0 && currentSeconds === 0) {
          setPeriod1(generateTimestamp());
        }

        // Check if current time is a multiple of 2 minutes for updating period2
        if (currentMinutes % 2 === 0 && currentSeconds === 0) {
            setPeriod2(generateTimestamp());
        }

        setTimer1(remainingSecondsTimer1 > 0 ? remainingSecondsTimer1 : remainingSecondsTimer1 + 180);
        setTimer2(remainingSecondsTimer2 > 0 ? remainingSecondsTimer2 : remainingSecondsTimer2 + 120);
    };

    // Update timers immediately
    updateTimers();

    // Start interval for updating timers every second
    const intervalId = setInterval(updateTimers, 1000);

    // Clean up interval on component unmount
    return () => {
        clearInterval(intervalId);
    };
}, []);
  

  
// user open app first time

  //period1
useEffect(() => {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const currentMinutes = currentTime.getMinutes();

    if (Number(currentMinutes) % 3 === 0) {
      const timestamp = generateTimestamp();
      setPeriod1(timestamp);
    } else if (Number(currentMinutes) % 3 === 1) {
      const timestamp = generateTimestamp();
      const minutes = timestamp.slice(-2);
      const newminutes = Number(minutes) - 1;
      const newtimestamp =
        String(timestamp).slice(0, -2) + String(newminutes).padStart(2, '0');
      setPeriod1(newtimestamp);
    } else {
      const timestamp = generateTimestamp();
      const minutes = timestamp.slice(-2);
      const newminutes = Number(minutes) - 2;
      const newtimestamp =
        String(timestamp).slice(0, -2) + String(newminutes).padStart(2, '0');
      setPeriod1(newtimestamp);
    }
  }, 1000); // Run every second

  // Clean up the interval on unmount or when the dependency array changes
  return () => clearInterval(intervalId);
}, []);


//period2
useEffect(() => {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const currentMinutes = currentTime.getMinutes();

    if (Number(currentMinutes) % 2 === 0) {
      const timestamp = generateTimestamp();
      setPeriod2(timestamp);
    } else {
      const timestamp = generateTimestamp();
      const minutes = timestamp.slice(-2);
      const newminutes = Number(minutes) - 1;
      const newtimestamp =
        String(timestamp).slice(0, -2) + String(newminutes).padStart(2, '0');
      setPeriod2(newtimestamp);
    }
  }, 1000); // Run every second

  return () => clearInterval(intervalId);
}, []);


  return (
    <TimerContext.Provider value={{ timer1, timer2, emerdResult, bconeResult, period1, period2, setPeriod1, setPeriod2, generateTimestamp }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
