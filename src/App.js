import React, { useEffect, useState } from 'react';
import './App.css';  

const App = () => {
    const machines = [
        { id: 'OP1', status: 'IN_CYCLE', colorClass: 'in_cycle' },
        { id: 'OP2', status: 'BLOCKED', colorClass: 'blocked' },
        { id: 'OP3', status: 'ELECTRICAL_FAULT', colorClass: 'electrical_fault' },
    ];

    const recentIssues = [
      { description: 'Machine OP1 has been starved', startTime: '06:07 AM', endTime: '07:15 AM', machineID: 'OP1' },
      { description: 'Machine OP2 is blocked', startTime: '10:32 AM', endTime: '10:50 AM', machineID: 'OP2' },
      { description: 'Machine OP3 stopped due to electrical fault', startTime: '10:03 AM', endTime: '10:08 AM', machineID: 'OP3' }, 
    ];

    const currentShift = "Morning";
    
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    const [highlightedIssue, setHighlightedIssue] = useState(null); 

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
        }, 1000);
        
        return () => clearInterval(timerId);
    }, []);

    const handleMachineClick = (machineID) => {
        setHighlightedIssue(machineID); 
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Assembly Line Status Dashboard</h1>
                <p>Current Shift: {currentShift}</p>
                <p>Date/Time: {currentDateTime}</p>
            </header>
'
'
            <section className="machine-status">
                <h2>Machine Status</h2>
                <div className="machines-container">
                    {machines.map(machine => (
                        <div key={machine.id} className={`machine-card ${machine.colorClass}`} onClick={() => handleMachineClick(machine.id)}>
                            <h3>{machine.id}</h3>
                            <p>Status: <span className={machine.colorClass}>{machine.status}</span></p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="recent-issues">
                <h2>Recent Issues</h2>
                <ul>
                    {recentIssues.map((issue, index) => (
                        <li key={index} className={highlightedIssue === issue.machineID ? issue.machineID.toLowerCase() : ''}>
                            <p>{issue.description}</p>
                            <p>Start Time: {issue.startTime} - End Time: {issue.endTime}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default App;
